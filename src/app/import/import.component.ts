import { Component, OnInit, ViewChild, HostListener, ApplicationRef } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { WaypointService } from '../services/waypoint.service';
import { ExportService } from '../services/export.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  @ViewChild('file', { static: true }) file;

  constructor(private storageService: StorageService, private waypointService: WaypointService,
    private exportService: ExportService, private snackBar: MatSnackBar, private applicationRef: ApplicationRef) { }

  ngOnInit() {
  }

  @HostListener('drag', ['$event']) ondrag(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('dragstart', ['$event']) ondragstart(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('dragend', ['$event']) ondragend(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('is-dragover');
  }

  @HostListener('dragover', ['$event']) ondragover(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add('is-dragover');
  }

  @HostListener('dragenter', ['$event']) ondragenter(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add('is-dragover');
  }

  @HostListener('dragleave', ['$event']) ondragleave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('is-dragover');
  }

  @HostListener('drop', ['$event']) ondrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('is-dragover');
    this.import(e.dataTransfer.files);
  }

  onFilesAdded() {
    this.import(this.file.nativeElement.files);
    this.file.nativeElement.value = '';
  }

  private message(message: string) {
      this.snackBar.open(message, undefined, {
        duration: 3000
      });
  }

  private import(files: File[]) {
    const fileReader = new FileReader();
    fileReader.onerror = error => {
      console.log(error);
      this.message(error.toString());
    };
    fileReader.onload = () => this.importData(JSON.parse(fileReader.result as string));
    fileReader.readAsText(files[0]);
  }

  private importData(data: any) {
    if (!this.exportService.isValid(data)) {
      console.log('invalid', data);
      this.message('Daten sind ungültig');
      this.applicationRef.tick();
      return;
    }
    this.storageService.data = data;
    this.waypointService.load();
    this.message('Daten wurden importiert');
    this.applicationRef.tick();
  }

  onClick() {
    this.file.nativeElement.click();
  }

}
