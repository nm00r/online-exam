import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, XCircle } from 'lucide-angular';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input() message = '';
  readonly XCircle = XCircle;
}
