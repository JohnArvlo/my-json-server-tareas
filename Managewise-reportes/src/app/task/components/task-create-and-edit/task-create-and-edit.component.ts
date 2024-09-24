import {Component, EventEmitter, inject, Inject, OnInit, ViewChild} from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import {MatOption, MatSelect} from "@angular/material/select";
import {Task} from "../../model/task.entity";
import {TasksService} from "../../services/tasks.service";


@Component({
  selector: 'app-task-create-and-edit',
  standalone: true,
  imports: [ MatButtonModule,
    MatIcon,
    MatDialogContent,
    MatInputModule, MatFormField, FormsModule, TranslateModule, MatDialogActions, MatDialogClose, MatSelect, MatOption],
  templateUrl: './task-create-and-edit.component.html',
  styleUrl: './task-create-and-edit.component.css'
})


export class TaskCreateAndEditComponent implements OnInit{
  // Attributes
  task: Task;
  editMode!: boolean;
  inputData: any;
  @ViewChild('resourceForm', {static: false}) resourceForm!: NgForm;

  private tasksService: TasksService = inject(TasksService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<TaskCreateAndEditComponent>) {
    this.task = data.task;
    this.editMode = data.editMode;
  }

  // CRUD Actions
  private createResource(): void {
    this.tasksService.create(this.task)
      .subscribe(response => {
        this.task = response;
      });
  };

  private updateResource(): void {
    let resourceToUpdate: Task = this.task;
    this.tasksService.update(this.task.id, resourceToUpdate)
      .subscribe(response => {
        this.task = response;
      });
  };

  // UI Event Handlers
  onSubmit(): void {
    if (this.resourceForm.form.valid) {
      if (this.editMode) {
        this.updateResource();
      } else {
        this.createResource();
      }
      this.onClose();
    } else {
      console.error('Invalid data in form');
    }
  }
  onCancel(): void {
    console.log('Submit');
  }
  onClose(): void {
    this.dialogRef.close()
  }
  ngOnInit(): void {
    this.inputData = this.data;
  }

}





