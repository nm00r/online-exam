import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthPanelComponent } from '../auth-panel/auth-panel.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, AuthPanelComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
