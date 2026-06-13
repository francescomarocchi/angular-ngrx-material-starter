import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { FeatureListRoutingModule } from './feature-list-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, FeatureListRoutingModule]
})
export class FeatureListModule {}
