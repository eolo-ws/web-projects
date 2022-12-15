import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ChartsComponent } from './charts/charts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "table", component: TableComponent },
  { path: "charts", component: ChartsComponent },
  { path: "about", component: AboutComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent },
  { path: "profile", component: ProfileComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }