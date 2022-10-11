import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTabsPage } from './home-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTabsPage,
    children: [
      {
        path: 'alerts',
        loadChildren: () =>
          import('../alerts/alerts.module').then((m) => m.AlertsPageModule),
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('../rooms/rooms.module').then((m) => m.RoomsPageModule),
      },
      {
        path: 'classes',
        loadChildren: () =>
          import('../classes/classes.module').then((m) => m.ClassesPageModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('../menu/menu.module').then((m) => m.MenuPageModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTabsPageRoutingModule {}
