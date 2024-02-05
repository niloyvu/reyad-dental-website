import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSwiper]',
  standalone: false,
})
export class SwiperDirective implements AfterViewInit {


  @Input() config?: SwiperOptions;

  constructor(private el: ElementRef<SwiperContainer>) { }

  ngAfterViewInit(): void {
    Object.assign(this.el.nativeElement, this.config);

    this.el?.nativeElement?.initialize;
  }

}
