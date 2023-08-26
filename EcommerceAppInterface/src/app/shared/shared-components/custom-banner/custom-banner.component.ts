import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-banner',
  templateUrl: './custom-banner.component.html',
  styleUrls: ['./custom-banner.component.scss']
})
export class CustomBannerComponent {
  @Input() class!: string;
  @Input() bannerTitle!: string;
}
