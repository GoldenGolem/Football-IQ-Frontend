import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


// @angular/material
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdProgressSpinnerModule,
  MdMenuModule
} from "@angular/material";

// components
import { MyAccountComponent } from "./my-account/my-account.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignOutComponent } from "./sign-out/sign-out.component";

// routing
import { UsersRoutingModule } from "./users-routing.module";

// components constant
const components = [
  MyAccountComponent,
  SignInComponent,
  SignOutComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdMenuModule,
    ReactiveFormsModule,
    RouterModule,
    UsersRoutingModule
  ],
  declarations: components,
  exports: components,
})
export class UsersModule { }
