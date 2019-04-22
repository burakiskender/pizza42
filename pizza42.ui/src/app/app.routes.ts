import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { CallbackComponent} from './callback/callback.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const AppRoutes: Routes = [
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [
          AuthGuard
        ]
      },
      {
        path: 'order',
        component: OrderComponent,
        canActivate: [
          AuthGuard
        ]
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
