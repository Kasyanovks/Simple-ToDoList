import {booleanAttribute, Component, Input} from '@angular/core';
import {BlackButtonComponent} from "../black-button/black-button.component";

@Component({
  selector: 'app-to-do-list-form',
  standalone: true,
  imports: [
    BlackButtonComponent
  ],
  templateUrl: './to-do-list-form.component.html',
  styleUrl: './to-do-list-form.component.scss'
})
export class ToDoListFormComponent {
  @Input({transform: booleanAttribute}) protected showButton = false

  @Input({required: true}) placeHolder!: string

  @Input({required: true}) id!: string
}
