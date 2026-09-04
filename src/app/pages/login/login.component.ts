import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiButton,
  TuiTextfield,
  TuiInput,
  TuiError,
  TuiNotificationService,
} from '@taiga-ui/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiInput,
    TuiError,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
  });

  constructor(
    private auth: AuthService,
    private notifications: TuiNotificationService,
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const { username, password } = this.form.getRawValue();
    const success = this.auth.login(username ?? '', password ?? '');

    if (!success) {
      this.notifications
        .open('Неверный логин или пароль', {
          appearance: 'error',
          label: 'Ошибка авторизации',
        })
        .subscribe();
    }
  }
}
