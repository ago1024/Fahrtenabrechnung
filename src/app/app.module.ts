import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {MonthEditComponent} from './month/month-edit/month-edit.component';
import {DayEditComponent, CreateLocationComponent} from './day/day-edit/day-edit.component';
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
        CreateLocationComponent,
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
