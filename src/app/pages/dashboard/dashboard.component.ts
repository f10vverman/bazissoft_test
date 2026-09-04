import {
  Component,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  TuiButton,
  TuiDialogService,
  TuiNotificationService,
} from '@taiga-ui/core';
import { TuiConfirmService } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { LayoutComponent } from '../../layout/layout.component';
import { StorageService } from '../../services/storage.service';
import { Product } from '../../models/models';
import { ProductDialogComponent } from '../../components/product-dialog/product-modul.component';

type ProductFormData = Omit<Product, 'id'>;

@Component({
  selector: 'app-dashboard',
  imports: [
    LayoutComponent,
    CurrencyPipe,
    TuiButton,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private storage = inject(StorageService);
  private dialogs = inject(TuiDialogService);
  private confirm = inject(TuiConfirmService);
  private notifications = inject(TuiNotificationService);

  private dialog = new PolymorpheusComponent(ProductDialogComponent);
  readonly products = this.storage.products;

  addProduct(): void {
    this.dialogs
      .open<ProductFormData>(this.dialog, {
        label: 'Добавить товар',
        size: 'm',
      })
      .subscribe(data => {
        if (data) {
          this.storage.addProduct(data);
          this.notify('Товар добавлен');
        }
      });
  }

  editProduct(product: Product): void {
    this.dialogs
      .open<ProductFormData>(this.dialog, {
        label: 'Редактировать товар',
        size: 'm',
        data: { name: product.name, price: product.price, vat: product.vat },
      })
      .subscribe(data => {
        if (data) {
          this.storage.updateProduct({ id: product.id, ...data });
          this.notify('Товар обновлён');
        }
      });
  }

  deleteProduct(product: Product): void {
    this.confirm.markAsDirty();
    this.confirm
      .withConfirm({
        label: 'Удаление товара',
        data: { content: `Удалить товар «${product.name}»?` },
      })
      .subscribe(confirmed => {
        if (confirmed) {
          this.storage.deleteProduct(product.id);
          this.notify('Товар удалён');
        }
      });
  }

  private notify(label: string): void {
    this.notifications
      .open(label, { appearance: 'success', label: 'Успех' })
      .subscribe();
  }
}
