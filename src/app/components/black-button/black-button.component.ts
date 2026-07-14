import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-black-button',
  standalone: true,
  imports: [],
  templateUrl: './black-button.component.html',
  styleUrl: './black-button.component.scss'
})
export class BlackButtonComponent {
  @Input({required: true}) buttonText!: string
}
