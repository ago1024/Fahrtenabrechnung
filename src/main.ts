import { enableProdMode, importProvidersFrom } from '@angular/core';


import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { ExportService } from './app/services/export.service';
import { IdHelperService } from './app/services/id-helper.service';
import { LocationService } from './app/services/location.service';
import { MapsService } from './app/services/maps.service';
import { ReportService } from './app/services/report.service';
import { StorageService } from './app/services/storage.service';
import { WaypointService } from './app/services/waypoint.service';
import { environment } from './environments/environment';

import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
registerLocaleData(localeDE);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        IdHelperService,
        LocationService,
        WaypointService,
        MapsService,
        StorageService,
        ReportService,
        ExportService,
        provideAnimations()
    ]
})
  .catch(err => console.log(err));
