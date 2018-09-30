import { Component, OnInit } from '@angular/core';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css']
})
export class ExportButtonComponent implements OnInit {

  constructor(private exportService: ExportService) { }

  ngOnInit() {
  }

  click(): void {
    this.exportService.exportData();
  }

}
