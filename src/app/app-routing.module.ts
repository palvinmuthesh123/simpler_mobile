import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'chat',
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatPageModule),
  },
  {
    path: 'alerts',
    loadChildren: () =>
      import('./pages/alerts/alerts.module').then((m) => m.AlertsPageModule),
  },
  {
    path: 'alert-details',
    loadChildren: () =>
      import('./pages/alert-details/alert-details.module').then(
        (m) => m.AlertDetailsPageModule
      ),
  },
  {
    path: 'classes',
    loadChildren: () =>
      import('./pages/classes/classes.module').then((m) => m.ClassesPageModule),
  },
  {
    path: 'files',
    loadChildren: () =>
      import('./pages/files/files.module').then((m) => m.FilesPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'news-details',
    loadChildren: () =>
      import('./pages/news-details/news-details.module').then(
        (m) => m.NewsDetailsPageModule
      ),
  },
  {
    path: 'push-notification-settings',
    loadChildren: () =>
      import(
        './pages/push-notification-settings/push-notification-settings.module'
      ).then((m) => m.PushNotificationSettingsPageModule),
  },
  {
    path: 'room-alerts',
    loadChildren: () =>
      import('./pages/room-alerts/room-alerts.module').then(
        (m) => m.RoomAlertsPageModule
      ),
  },
  {
    path: 'room-login',
    loadChildren: () =>
      import('./pages/room-login/room-login.module').then(
        (m) => m.RoomLoginPageModule
      ),
  },
  {
    path: 'room-tabs',
    loadChildren: () =>
      import('./pages/room-tabs/room-tabs.module').then(
        (m) => m.RoomTabsPageModule
      ),
  },
  {
    path: 'screens',
    loadChildren: () =>
      import('./pages/screens/screens.module').then((m) => m.ScreensPageModule),
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./pages/schedule/schedule.module').then(
        (m) => m.SchedulePageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./pages/rooms/rooms.module').then((m) => m.RoomsPageModule),
  },
  {
    path: 'user-info',
    loadChildren: () =>
      import('./pages/user-info/user-info.module').then(
        (m) => m.UserInfoPageModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersPageModule),
  },
  {
    path: 'home-tabs',
    loadChildren: () =>
      import('./pages/home-tabs/home-tabs.module').then(
        (m) => m.HomeTabsPageModule
      ),
  },
  {
    path: 'room-alerts-detail',
    loadChildren: () => import('./pages/room-alerts-detail/room-alerts-detail.module').then( m => m.RoomAlertsDetailPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
