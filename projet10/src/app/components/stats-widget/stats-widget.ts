import { Component } from '@angular/core';
import { computed } from '@angular/core';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-stats-widget',
  imports: [],
  templateUrl: './stats-widget.html',
  styleUrl: './stats-widget.scss'
})
export class StatsWidget {
  totalTasks = computed(() => 
    this.taskService.tasks().length
  )

  constructor(public taskService: TaskService){}
}
