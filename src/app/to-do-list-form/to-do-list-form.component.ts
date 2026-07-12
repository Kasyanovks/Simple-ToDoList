import {booleanAttribute, Component, Input} from '@angular/core';

@Component({
  selector: 'app-to-do-list-form',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list-form.component.html',
  styleUrl: './to-do-list-form.component.scss'
})
export class ToDoListFormComponent {
  @Input({ transform: booleanAttribute })
  protected button = false
}
