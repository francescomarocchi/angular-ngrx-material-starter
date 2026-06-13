import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'anms-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  imports: [TranslatePipe]
})
export class ChildComponent {}
