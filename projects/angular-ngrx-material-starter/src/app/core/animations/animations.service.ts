import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  stagger = signal<'stagger' | null>(null);
  page = signal<boolean>(false);

  updateRouteAnimationType(
    pageAnimations: boolean,
    elementsAnimations: boolean
  ) {
    this.stagger.set(elementsAnimations ? 'stagger' : null);
    this.page.set(pageAnimations);
  }
}
