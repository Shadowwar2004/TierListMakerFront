import { Routes } from '@angular/router';
import {LoginComponent} from './component/login-component/login-component';
import {HomeComponent} from './component/home-component/home-component';
import {TierListDetailComponent} from './component/tier-list-detail-component/tier-list-detail-component';
import {CreateElementComponent} from './component/create-element-component/create-element-component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path : 'home', component: HomeComponent },
  { path: 'tierlist/:id', component: TierListDetailComponent },
  { path: 'create-element', component: CreateElementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
