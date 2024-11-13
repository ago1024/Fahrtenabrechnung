import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {MonthEditComponent} from './month/month-edit/month-edit.component';
import {DayEditComponent} from './day/day-edit/day-edit.component';
import {IdHelperService} from './services/id-helper.service';
import {LocationService} from './services/location.service';
import {DayViewComponent, DistanceEditComponent} from './day/day-view/day-view.component';
import {DayDateComponent} from './day/day-date/day-date.component';
import {MapsService} from './services/maps.service';
import {StorageService} from './services/storage.service';
import {WaypointService} from './services/waypoint.service';

import {registerLocaleData, DatePipe} from '@angular/common';
import localeDE from '@angular/common/locales/de';
registerLocaleData(localeDE);

import {CdkTableModule} from '@angular/cdk/table';
import { MonthReportComponent } from './month/month-report/month-report.component';
import { MonthDaysComponent } from './month/month-days/month-days.component';
import { MonthLocationsComponent } from './month/month-locations/month-locations.component';
import { ReportService } from './services/report.service';
import { ExportButtonComponent } from './export-button/export-button.component';
import { ExportService } from './services/export.service';
import { ImportComponent } from './import/import.component';

@NgModule({
    declarations: [
        AppComponent,
        MonthEditComponent,
        DayEditComponent,
        DayViewComponent,
        DayDateComponent,
        DistanceEditComponent,
        MonthReportComponent,
        MonthDaysComponent,
        MonthLocationsComponent,
        ExportButtonComponent,
        ImportComponent,
    ],
    exports: [
        CdkTableModule,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatListModule,
        MatTableModule,
        MatSelectModule,
        MatExpansionModule,
        MatTabsModule,
        MatSnackBarModule,
        MatIconModule,
    ],
    providers: [
        IdHelperService,
        LocationService,
        WaypointService,
        MapsService,
        StorageService,
        DatePipe,
        ReportService,
        ExportService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
