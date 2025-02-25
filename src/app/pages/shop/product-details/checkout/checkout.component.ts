import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../../services/data.service';
import { SharedModule } from '../../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent implements OnInit {

  isSubmitted: boolean = false;
  checkoutForm!: FormGroup;

  @Input() product: any;
  @Input() quantity: number = 0;
  @Output() handleProductLink = new EventEmitter();

  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private dataService = inject(DataService);

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.checkoutForm = this.formBuilder.group({
      total_amount: [null],
      delivery_charge: [60],
      quantity: [this.quantity],
      product_id: [this.product.id],
      product_price: [this.product.price],
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
      district: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      thana: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      address: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      payment_method: [1, [Validators.required]],
      check: [false, [Validators.requiredTrue]],
    });

    this.subscribeToDistrictChanges();
  }

  subscribeToDistrictChanges() {
    this.checkoutForm
      .get('district')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        const deliveryCharge = (value?.toLowerCase() === 'dhaka') ? 60 : 150;
        this.checkoutForm.get('delivery_charge')?.setValue(deliveryCharge);
        this.checkoutForm.get('total_amount')?.setValue(this.product.price * this.quantity + deliveryCharge);
      });
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;
    this.dataService
      .postData(this.checkoutForm.value, 'website/order-product')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          this.isSubmitted = false;
          if (response.code == 200) {
            this.checkoutForm.reset();
            this.handleProductLink.emit(true);
            this.toastr.success(response.message);
          } else {
            this.toastr.error('Form Submission Failed!');
          }
        },
        error: error => {
          console.error(error);
          this.isSubmitted = false;
          this.toastr.error('Form Submission Failed!');
        }
      });

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
