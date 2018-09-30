import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatButtonModule,
  MatExpansionModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';
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
  ],
  entryComponents: [
    DistanceEditComponent,
    CreateLocationComponent,
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
  ],
  providers: [
    IdHelperService,
    LocationService,
    WaypointService,
    MapsService,
    StorageService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
