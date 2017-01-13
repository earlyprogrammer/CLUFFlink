import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { DirectoryComponent } from '../directory/directory.component';
import { NewsComponent } from '../news/news.component';
import { PersonComponent } from '../directory/person/person.component';
import { FamilyComponent } from '../directory/family/family.component';
import { LoginComponent } from '../login/login.component';
import { ApplicationsComponent } from '../applications/applications.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'directory', component: DirectoryComponent },
	{ path: 'news', component: NewsComponent },
	{ path: 'person/:id', component: PersonComponent },
	{ path: 'family/:id', component: FamilyComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'applications', component: ApplicationsComponent }
];

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forRoot(routes)
  ],
  exports: [
	RouterModule
  ],
  declarations: []
})

export class RoutingModule { }
