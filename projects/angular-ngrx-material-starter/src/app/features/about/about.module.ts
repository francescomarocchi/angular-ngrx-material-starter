import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, AboutRoutingModule]
})
export class AboutModule {}
