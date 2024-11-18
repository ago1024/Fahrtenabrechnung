import { ApplicationRef, Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportService } from '../services/export.service';
import { StorageService } from '../services/storage.service';
import { WaypointService } from '../services/waypoint.service';

function isValidTarget(target: EventTarget | null): target is HTMLElement {
  return target instanceof HTMLElement;
}

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


  @ViewChild('file', { static: true }) file?: ElementRef<HTMLInputElement>;

  @HostListener('drag', ['$event']) ondrag(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('dragstart', ['$event']) ondragstart(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('dragend', ['$event']) ondragend(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isValidTarget(e.target)) {
      return;
    }
    e.target.classList.remove('is-dragover');
  }

  @HostListener('dragover', ['$event']) ondragover(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isValidTarget(e.target)) {
      return;
    }
    e.target.classList.add('is-dragover');
  }

  @HostListener('dragenter', ['$event']) ondragenter(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isValidTarget(e.target)) {
      return;
    }
    e.target.classList.add('is-dragover');
  }

  @HostListener('dragleave', ['$event']) ondragleave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isValidTarget(e.target)) {
      return;
    }
    e.target.classList.remove('is-dragover');
  }

  @HostListener('drop', ['$event']) ondrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isValidTarget(e.target)) {
      return;
    }
    e.target.classList.remove('is-dragover');
    if (!e.dataTransfer?.files) {
      return;
    }
    this.import(Array.from(e.dataTransfer.files));
  }

  onFilesAdded() {
    if (!this.file?.nativeElement.files) {
      return;
    }
    this.import(Array.from(this.file.nativeElement.files));
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

  private importData(data: unknown) {
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
    this.file?.nativeElement.click();
  }

}
