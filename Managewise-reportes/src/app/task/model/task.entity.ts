export class Task {
  id: number;
  title: string;
  status: string;
  description: string;
  assigned_to: string;
  priority: string;
  story_points: number;
  sprint: number;

  constructor() {
    this.id = 0;
    this.title = "";
    this.status = "";
    this.description = "";
    this.assigned_to = "";
    this.priority = "";
    this.story_points = 0;
    this.sprint = 0;
  }
}
