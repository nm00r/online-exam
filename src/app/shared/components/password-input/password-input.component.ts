import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
  templateUrl: './password-input.component.html',
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() label = 'Password';
  @Input() placeholder = '••••••••';
  @Input() inputId = 'password';
  @Input() required = false;
  @Input() hasError = false;
  @Input() errorMsg = '';
  @Input() autocomplete = 'current-password';

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  value = '';
  show = false;
  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  toggle(): void {
    this.show = !this.show;
  }

  writeValue(val: string): void {
    this.value = val ?? '';
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }
}
