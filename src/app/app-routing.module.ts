import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {InfoResolverService} from './services/info-resolver.service';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'event/:id',
        resolve: {
            special: InfoResolverService
        },
        loadChildren: './event/event.module#EventPageModule'
    },
    {
        path: 'give/:id',
        resolve: {
            special: InfoResolverService
        },
        loadChildren: './give/give.module#GivePageModule'
    },
    {
        path: 'wofbi',
        loadChildren: () => import('./wofbi/wofbi.module').then(m => m.WofbiPageModule)
    },
    {
        path: 'wincare',
        loadChildren: () => import('./wincare/wincare.module').then(m => m.WincarePageModule)
    },
    {
        path: 'socials',
        loadChildren: () => import('./socials/socials.module').then(m => m.SocialsPageModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
    },
    {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
    },
    {
        path: 'notes',
        loadChildren: () => import('./notes/notes.module').then(m => m.NotesPageModule)
    },
    {
        path: 'prayer',
        loadChildren: () => import('./prayer/prayer.module').then(m => m.PrayerPageModule)
    },
    {
        path: 'testimony',
        loadChildren: () => import('./testimony/testimony.module').then(m => m.TestimonyPageModule)
    },
    {
        path: 'covenant',
        loadChildren: () => import('./covenant/covenant.module').then(m => m.CovenantPageModule)
    },
    {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackPageModule)
    },
    {
        path: 'service',
        loadChildren: () => import('./service/service.module').then(m => m.ServicePageModule)
    },
    {
        path: 'pastor',
        loadChildren: () => import('./pastor/pastor.module').then(m => m.PastorPageModule)
    },
    {
        path: 'wsf',
        loadChildren: () => import('./wsf/wsf.module').then(m => m.WsfPageModule)
    },
    {
        path: 'join',
        loadChildren: () => import('./join/join.module').then(m => m.JoinPageModule)
    },
    {
        path: 'live',
        loadChildren: () => import('./live/live.module').then(m => m.LivePageModule)
    },
    {
        path: 'new',
        loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
    },
  {
    path: 'salvation',
    loadChildren: () => import('./salvation/salvation.module').then( m => m.SalvationPageModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./reservation/reservation.module').then( m => m.ReservationPageModule)
  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
