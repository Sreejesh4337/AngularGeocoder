import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatesListComponent } from './states-list/states-list.component';

const routes: Routes = [
  { path: '', component: StatesListComponent },
  { path: 'states', component: StatesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ StatesListComponent ]
