import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Task } from "../model/task.entity";

@Injectable({
  providedIn: 'root'
})
export class TasksService extends BaseService<Task>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/tasks';
  }
}


