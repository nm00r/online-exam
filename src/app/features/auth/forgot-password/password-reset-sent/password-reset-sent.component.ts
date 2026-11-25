import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-password-reset-sent',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './password-reset-sent.component.html',
})
export class PasswordResetSentComponent {
  readonly ArrowLeft = ArrowLeft;
  email: string;

  constructor(private route: ActivatedRoute) {
    this.email = this.route.snapshot.queryParamMap.get('email') || 'user@example.com';
  }
}
