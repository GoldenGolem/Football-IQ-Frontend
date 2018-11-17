import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';
import { ShortlistComponent } from '../shortlist/shortlist.component';
import { TargetComponent } from '../target/target.component';
import { UserManagmentComponent } from '../user-managment/user-managment.component';
import { PlayerProfileComponent } from '../player-profile/player-profile.component';

const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'search', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'watchlist', component: DashboardComponent },
      { path: 'shortlist', component: ShortlistComponent },
      { path: 'user-managment', component: UserManagmentComponent },
      { path: 'target', component: TargetComponent },
      { path: 'shortlistplayers', component: DashboardComponent },
      { path: 'targetplayers', component: DashboardComponent },
      { path: 'playerdetail', component: PlayerProfileComponent },
      { path: 'chart', loadChildren: '../charts/charts.module#ChartsModule' },
      { path: 'ecommerce', loadChildren: '../ecommerce/ecommerce.module#ECommerceModule' },
      { path: 'form', loadChildren: '../forms/forms.module#MyFormsModule' },
      { path: 'page', loadChildren: '../pages/pages.module#PagesModule' },
      { path: 'pglayout', loadChildren: '../page-layouts/page-layouts.module#PageLayoutsModule' },
      { path: 'table', loadChildren: '../tables/tables.module#MyTablesModule' },
      { path: 'ui', loadChildren: '../ui/ui.module#UIModule' },
      { path: 'users', loadChildren: '../users/users.module#UsersModule' }
    ]
  }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
