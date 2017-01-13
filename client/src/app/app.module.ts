import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RoutingComponent } from './routing/routing.component';
import { DirectoryComponent } from './directory/directory.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './filter.pipe';
import { PersonComponent } from './directory/person/person.component';
import { FamilyComponent } from './directory/family/family.component';
import { LoginComponent } from './login/login.component';
import { ApplicationsComponent } from './applications/applications.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutingComponent,
    DirectoryComponent,
    NewsComponent,
    HomeComponent,
    FilterPipe,
    PersonComponent,
    FamilyComponent,
    LoginComponent,
    ApplicationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
