import { Component } from '@angular/core';
import { LucideAngularModule, FolderCode, Brain, BookOpenCheck, RectangleEllipsis } from 'lucide-angular';

@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './auth-panel.component.html',
})
export class AuthPanelComponent {
  readonly FolderCode = FolderCode;
  readonly Brain = Brain;
  readonly BookOpenCheck = BookOpenCheck;
  readonly RectangleEllipsis = RectangleEllipsis;
}
