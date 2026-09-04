import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, TuiButton],
  template: `
    <header class="app-header">
      <div class="header-content">
        <span class="logo">Дашборд</span>
        <nav class="nav-links">
          <a
            routerLink="/dashboard"
            routerLinkActive="active"
            class="nav-link"
          >
            Каталог товаров
          </a>
          <a
            routerLink="/history"
            routerLinkActive="active"
            class="nav-link"
          >
            История покупок
          </a>
        </nav>
        <button tuiButton size="s" appearance="flat" (click)="auth.logout()">
          Выйти
        </button>
      </div>
    </header>
    <main class="main-content">
      <ng-content />
    </main>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .app-header {
      background: var(--tui-background-elevation-1);
      border-bottom: 1px solid var(--tui-background-modifier-border);
      padding: 0 16px;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 24px;
      height: 56px;
    }

    .logo {
      font-weight: 700;
      font-size: 18px;
      color: var(--tui-text-primary);
      white-space: nowrap;
    }

    .nav-links {
      display: flex;
      gap: 4px;
      flex: 1;
    }

    .nav-link {
      padding: 8px 16px;
      border-radius: 8px;
      text-decoration: none;
      color: var(--tui-text-secondary);
      font-size: 14px;
      transition: background 0.2s, color 0.2s;
      white-space: nowrap;

      &:hover {
        background: var(--tui-background-hover);
        color: var(--tui-text-primary);
      }

      &.active {
        background: var(--tui-background-accent-1);
        color: var(--tui-text-primary-on-accent-1);
        font-weight: 600;
      }
    }

    .main-content {
      flex: 1;
      padding: 24px 16px;

      @media (min-width: 768px) {
        padding: 32px 24px;
      }
    }

    @media (max-width: 560px) {
      .header-content {
        flex-wrap: wrap;
        height: auto;
        padding: 8px 0;
        gap: 8px;
      }

      .nav-links {
        order: 3;
        width: 100%;
      }

      .nav-link {
        flex: 1;
        text-align: center;
        padding: 8px 8px;
        font-size: 13px;
      }
    }
  `,
})
export class LayoutComponent {
  readonly auth = inject(AuthService);
}
