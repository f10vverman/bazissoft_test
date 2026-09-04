import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { injectContext } from '@taiga-ui/polymorpheus';
import type { TuiDialogContext } from '@taiga-ui/core';
import {
  TuiButton,
  TuiTextfield,
  TuiInput,
  TuiError,
} from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';
import { Product } from '../../models/models';

type ProductFormData = Omit<Product, 'id'>;

@Component({
  selector: 'app-product-dialog',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiInput,
    TuiInputNumber,
    TuiError,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDialogComponent {
  private readonly context =
    injectContext<TuiDialogContext<ProductFormData, ProductFormData | undefined>>();

  readonly form = new FormGroup({
    name: new FormControl(this.context.data?.name ?? '', [Validators.required]),
    price: new FormControl<number | null>(this.context.data?.price ?? null, [
      Validators.required,
      Validators.min(0),
    ]),
    vat: new FormControl<number | null>(this.context.data?.vat ?? null, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const { name, price, vat } = this.form.getRawValue();
    this.context.completeWith({
      name: name ?? '',
      price: price ?? 0,
      vat: vat ?? 0,
    });
  }
}
