import { Routes } from '@angular/router';
import { TzComponent } from '@pages/tz/tz.component';
import { MainPageComponent } from '@pages/main-page/main-page.component';

export const routes: Routes = [
  {
    path: 'tz',
    component: TzComponent,
  },
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full',
  },
];
