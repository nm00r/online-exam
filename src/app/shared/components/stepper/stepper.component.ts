import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
})
export class StepperComponent {
  @Input() total = 4;
  @Input() current = 0;

  get steps(): number[] {
    return Array.from({ length: this.total }, (_, i) => i);
  }
}
