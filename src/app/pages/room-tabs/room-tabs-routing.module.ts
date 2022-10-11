import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomTabsPage } from './room-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: RoomTabsPage,
    children: [
      {
        path: 'screens',
        loadChildren: () =>
          import('../screens/screens.module').then((m) => m.ScreensPageModule),
      },
      {
        path: 'room-alerts',
        loadChildren: () =>
          import('../room-alerts/room-alerts.module').then(
            (m) => m.RoomAlertsPageModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersPageModule),
      },
      {
        path: 'files',
        loadChildren: () =>
          import('../files/files.module').then((m) => m.FilesPageModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('../chat/chat.module').then((m) => m.ChatPageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('../schedule/schedule.module').then(
            (m) => m.SchedulePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomTabsPageRoutingModule {}
