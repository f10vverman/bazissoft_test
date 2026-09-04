import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LayoutComponent } from '../../layout/layout.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-history',
  imports: [LayoutComponent, CurrencyPipe, DatePipe],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {
  purchases = this.storage.purchases;

  constructor(private storage: StorageService) {}
}
