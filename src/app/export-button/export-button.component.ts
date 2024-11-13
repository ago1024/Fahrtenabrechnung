import { Component, OnInit } from '@angular/core';
import { ExportService } from '../services/export.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css'],
  standalone: true,
  imports: [MatButton, MatIcon]
})
export class ExportButtonComponent implements OnInit {

  constructor(private exportService: ExportService) { }

  ngOnInit() {
  }

  click(): void {
    this.exportService.exportData();
  }

}
