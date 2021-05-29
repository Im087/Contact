import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactListComponent  } from "./contact-list/contact-list.component";
import { ContactNewComponent } from "./contact-new/contact-new.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { TagEditComponent } from "./tag-edit/tag-edit.component";
import { TagListComponent } from "./tag-list/tag-list.component";
import { TagNewComponent } from "./tag-new/tag-new.component";
import { LayoutComponent } from "./layout/layout.component";

import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/contact',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContactListComponent
      },
      {
        path: 'new',
        component: ContactNewComponent
      },
      {
        path: 'edit/:id',
        component: ContactEditComponent
      }
    ]
  },
  {
    path: 'tag',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TagListComponent
      },
      {
        path: 'new',
        component: TagNewComponent
      },
      {
        path: 'edit',
        component: TagEditComponent
      }
    ]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
