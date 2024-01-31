import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { SharedModule } from '../../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent implements OnInit {

  isSubmitted: boolean = false;
  deliveryCharge: number = 60;
  checkoutForm!: FormGroup;

  @Input() product: any;
  @Input() quantity: number = 0;
  @Output() handleProductLink = new EventEmitter();

  toastr = inject(ToastrService);
  dataService = inject(DataService);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.checkoutForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),

      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]+$'),
      ]),

      district: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),

      thana: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),

      address: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
      ]),

      paymentMethod: new FormControl(1, [
        Validators.required
      ]),

      check: new FormControl(false,
        [
          Validators.requiredTrue
        ]),
    });

    this.district?.valueChanges.subscribe((value) => {
      const district = value.toLowerCase();
      if (district === 'dhaka') {
        this.deliveryCharge = 60;
      } else {
        this.deliveryCharge = 150;
      }
    });
  }

  get name() {
    return this.checkoutForm.get('name');
  }

  get phone() {
    return this.checkoutForm.get('phone');
  }

  get district() {
    return this.checkoutForm.get('district');
  }

  get thana() {
    return this.checkoutForm.get('thana');
  }

  get address() {
    return this.checkoutForm.get('address');
  }

  get paymentMethod() {
    return this.checkoutForm.get('paymentMethod');
  }
  get check() {
    return this.checkoutForm.get('check');
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;
    this.dataService.postData(this.checkoutForm.value, 'website/order-product')
      .subscribe({
        next: (response) => {
          this.isSubmitted = false;
          if (response.code == 200) {
            this.checkoutForm.reset();
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

}
