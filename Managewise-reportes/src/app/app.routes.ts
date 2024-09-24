import { Routes } from '@angular/router';

import { LiderComponent } from "./report/components/lider/lider.component";
import { DesarrolladorComponent } from "./report/components/desarrollador/desarrollador.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { ReportManagementComponent } from "./report/pages/report-management/report-management.component";

//componentes para parte de tareas o tasks
import { TaskManagementComponent } from "./task/pages/task-management/task-management.component";

export const routes: Routes = [
  { path: 'reports/:projectId/lider', component: LiderComponent },
  { path: 'reports/:projectId/desarrollador', component: DesarrolladorComponent },
  { path: 'reports', component: ReportManagementComponent },
  { path: 'tasks', component: TaskManagementComponent},
  { path: '', redirectTo: 'reports', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
