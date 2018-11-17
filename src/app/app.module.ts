import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
// @ngrx
import { EffectsModule } from "@ngrx/effects";
import { RouterStoreModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Layout
import { LayoutComponent } from './layout/layout.component';
import { PreloaderDirective } from './layout/preloader.directive';
// Header
import { AppHeaderComponent } from './layout/header/header.component';
// Sidenav
import { AppSidenavComponent } from './layout/sidenav/sidenav.component';
import { ToggleOffcanvasNavDirective } from './layout/sidenav/toggle-offcanvas-nav.directive';
import { AutoCloseMobileNavDirective } from './layout/sidenav/auto-close-mobile-nav.directive';
import { AppSidenavMenuComponent } from './layout/sidenav/sidenav-menu/sidenav-menu.component';
import { AccordionNavDirective } from './layout/sidenav/sidenav-menu/accordion-nav.directive';
import { AppendSubmenuIconDirective } from './layout/sidenav/sidenav-menu/append-submenu-icon.directive';
import { HighlightActiveItemsDirective } from './layout/sidenav/sidenav-menu/highlight-active-items.directive';
// Customizer
import { AppCustomizerComponent } from './layout/customizer/customizer.component';
import { ColumnfilterComponent } from './layout/columnfilter/columnfilter.component';
import { ToggleQuickviewDirective } from './layout/customizer/toggle-quickview.directive';
// Footer
import { AppFooterComponent } from './layout/footer/footer.component';
// Search Overaly
import { AppSearchOverlayComponent } from './layout/search-overlay/search-overlay.component';
import { SearchOverlayDirective } from './layout/search-overlay/search-overlay.directive';
import { OpenSearchOverlaylDirective } from './layout/search-overlay/open-search-overlay.directive';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { AddPlayerShortlistDialogComponent } from './dashboard/add-player-shortlist/add-player-shortlist-dialog.component';
import { AddPlayerShortlistByProfileDialogComponent } from './player-profile/add-player-shortlist/add-player-shortlist-by-profile-dialog.component';
import { AddOtherPlayerDialogComponent } from './dashboard/add-player-shortlist/add-other-player/add-other-player-dialog.component';

import { AddViewDialogComponent } from './dashboard/add-view-dialog/add-view-dialog.component';

import { AddShortlistDialogComponent } from './shortlist/add-shortlist/add-shortlist-dialog.component';
import { EditShortlistDialogComponent } from './shortlist/edit-shortlist/edit-shortlist-dialog.component';

import { HomeComponent } from './home/home.component';
import { PageLayoutFullscreenComponent } from './page-layouts/fullscreen/fullscreen.component';

// Short List page
import { ShortlistComponent } from './shortlist/shortlist.component';

import { TargetComponent } from './target/target.component';
import { AddPlayerTargetDialogComponent } from './dashboard/add-player-target/add-player-target-dialog.component';
import { AddTargetDialogComponent } from './target/add-target/add-target-dialog.component';
import { EditTargetDialogComponent } from './target/edit-target/edit-target-dialog.component';
import { PdfprofileComponent } from './player-profile/pdf-profile/pdfprofile.component';
import { LoadingDialogComponent } from './player-profile/loading-dialog/loading-dialog.component';

// Sub modules
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

// hmr
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

// Not found
import { NotFoundComponent } from "./not-found/not-found.component";


// effects
import { UserEffects } from "./users/users.effects";

// guards
import { AuthenticatedGuard} from "./shared/authenticated.guard";

// reducers
import { reducer } from "./app.reducers";

// services
import { UserauthService } from "./core/services/userauth.service";

// import {DataTableModule} from "angular2-datatable";
// import { DataFilterPipe }   from './shared/data-filter.pipe';
import { FormatPlayerKey }   from './shared/pipe/formatPlayerKey.pipe';
import { FormatDateKey }   from './shared/pipe/formatDateKey.pipe';
import { KeyarrayPipe } from './shared/pipe/keyarray.pipe';
import { FormatNumberKey } from './shared/pipe/formatNumberKey.pipe';
import { FormatMarketValueKey } from './shared/pipe/formatMarketValueKey.pipe';
import { ClassProfileKey } from './shared/pipe/classProfileKey.pipe';
import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RoundProgressModule,
    // DataTableModule,
    // Sub modules
    LayoutModule,
    SharedModule,
    EffectsModule.run(UserEffects),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(reducer, {
      router: window.location.pathname + window.location.search
    })
  ],
  declarations: [
    AppComponent,
    // Layout
    LayoutComponent,
    PreloaderDirective,
    // Header
    AppHeaderComponent,
    // Sidenav
    AppSidenavComponent,
    ToggleOffcanvasNavDirective,
    AutoCloseMobileNavDirective,
    AppSidenavMenuComponent,
    AccordionNavDirective,
    AppendSubmenuIconDirective,
    HighlightActiveItemsDirective,
    // Customizer
    AppCustomizerComponent,
    ColumnfilterComponent,
    ToggleQuickviewDirective,
    // Footer
    AppFooterComponent,
    // Search overlay
    AppSearchOverlayComponent,
    SearchOverlayDirective,
    OpenSearchOverlaylDirective,
    PdfprofileComponent,
    LoadingDialogComponent,
    //
    DashboardComponent,
    PlayerProfileComponent,
    AddPlayerShortlistDialogComponent,
    AddPlayerShortlistByProfileDialogComponent,
	AddViewDialogComponent,
    AddOtherPlayerDialogComponent,
    HomeComponent,
    ShortlistComponent,
    AddShortlistDialogComponent,
    EditShortlistDialogComponent, 
    UserManagmentComponent,
    AddPlayerTargetDialogComponent,
    TargetComponent,
    AddTargetDialogComponent,
    EditTargetDialogComponent,
    // Pages
    PageLayoutFullscreenComponent,
    NotFoundComponent,
    FormatPlayerKey,
	KeyarrayPipe,
    FormatDateKey,
    FormatNumberKey,
    FormatMarketValueKey,
    ClassProfileKey,
    // DataFilterPipe,
  ],
  providers: [
    AuthenticatedGuard,
    UserauthService,
  ],
  bootstrap: [AppComponent],
   entryComponents: [
    AddShortlistDialogComponent,
    EditShortlistDialogComponent,
    AddPlayerShortlistDialogComponent,
    AddPlayerShortlistByProfileDialogComponent,
	AddViewDialogComponent,
    AddOtherPlayerDialogComponent,
    AddTargetDialogComponent,
    EditTargetDialogComponent,
   AddPlayerTargetDialogComponent,
     LoadingDialogComponent,
  ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
