import {Component, Input} from '@angular/core';
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-black-button',
  standalone: true,
  imports: [],
  templateUrl: './black-button.component.html',
  styleUrl: './black-button.component.scss'
})
export class BlackButtonComponent {
  constructor(private taskService: TasksService) {
  }

  @Input({required: true}) buttonText!: string
  @Input({required: true}) type!: string
}
