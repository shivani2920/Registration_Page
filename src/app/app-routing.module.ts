import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/components/register/register.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: 'registeration', pathMatch: 'full' },
    {path: 'registeration', component: RegisterComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
