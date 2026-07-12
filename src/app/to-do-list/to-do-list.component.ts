import { Component } from '@angular/core';
import {ToDoListFormComponent} from "../to-do-list-form/to-do-list-form.component";


@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    ToDoListFormComponent,
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {

}
