import { Component } from '@angular/core';

import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { TasksService } from "../../services/tasks.service";
import { Task } from "../../model/task.entity";
import { TaskCreateAndEditComponent } from "../../components/task-create-and-edit/task-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";


import {inject} from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";



@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, TaskCreateAndEditComponent, MatTableModule, NgClass, TranslateModule, MatButtonModule],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent implements OnInit, AfterViewInit {
  // Attributes
  taskData: Task;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'status', 'description', 'assigned_to', 'priority', 'story_points', 'sprint', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  private tasksService: TasksService = inject(TasksService);
  private matDialog: MatDialog = inject(MatDialog);

  // Constructor
  constructor() {
    this.isEditMode = false;
    this.taskData = {} as Task;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.taskData = {} as Task;
  }

  // CRUD Actions

  private getAllResources(): void {
    this.tasksService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createResource(): void {
    this.tasksService.create(this.taskData)
      .subscribe(response => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los resources actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map(resource => resource);
      });
  };

  private updateResource(): void {
    let resourceToUpdate: Task = this.taskData;
    this.tasksService.update(this.taskData.id, resourceToUpdate)
      .subscribe(response => {
        this.dataSource.data = this.dataSource.data
          .map(resource => {
            if (resource.id === response.id) {
              return response;
            }
            return resource;
          });
      });
  };

  private deleteResource(id: number): void {
    this.tasksService.delete(id)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter(country => {
            return country.id !== id ? country : false;
          });
      });
  };

  // UI Event Handlers

  onEditItem(element: Task) {
    this.isEditMode = true;
    this.taskData = element;
    this.onOpenDialog()
  }

  onAddItem() {
    this.isEditMode = false;
    this.taskData = {} as Task;
    this.onOpenDialog()
  }

  onDeleteItem(element: Task) {
    this.deleteResource(element.id);
  }

  onOpenDialog() {
    let _matdialog = this.matDialog.open(TaskCreateAndEditComponent,
      { width: '500px',
        height: '400px',
        data: { task: this.taskData, editMode: this.isEditMode } });
    _matdialog.afterClosed().subscribe(() => {
      this.getAllResources();
    });
  }

  // Lifecycle Hooks
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllResources();
  }
}
