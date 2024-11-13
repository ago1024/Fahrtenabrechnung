import { ApplicationRef, Component, HostListener, ViewChild, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportService } from '../services/export.service';
import { StorageService } from '../services/storage.service';
import { WaypointService } from '../services/waypoint.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
  standalone: true,
  imports: [MatButton, MatIcon]
})
export class ImportComponent {
  private storageService = inject(StorageService);
  private waypointService = inject(WaypointService);
  private exportService = inject(ExportService);
  private snackBar = inject(MatSnackBar);
  private applicationRef = inject(ApplicationRef);


  @ViewChild('file', { static: true }) file;

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
