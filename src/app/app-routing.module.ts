import { RouterModule, Routes } from '@angular/router';

// guards
import { AuthenticatedGuard } from "./shared/authenticated.guard";

// components
import { NotFoundComponent } from "./not-found/not-found.component";



import { LayoutComponent } from './layout/layout.component';



// Page Layouts
import { PageLayoutFullscreenComponent } from './page-layouts/fullscreen/fullscreen.component';

const AppRoutes: Routes = [

  {
    path: "users",
    loadChildren: "./users/users.module#UsersModule"
  },
  {
    path: "404",
    component: NotFoundComponent
  },
  { path: '', redirectTo: '/users/sign-in', pathMatch: 'full' },
  { path: 'app', component: LayoutComponent },
  { path: 'extra', loadChildren: './extra-pages/extra-pages.module#ExtraPagesModule' },
  { path: 'fullscreen', component: PageLayoutFullscreenComponent },
  { path: '**', redirectTo: '/app/home', pathMatch: 'full' },
];


export const AppRoutingModule = RouterModule.forRoot(AppRoutes, {useHash: true});
