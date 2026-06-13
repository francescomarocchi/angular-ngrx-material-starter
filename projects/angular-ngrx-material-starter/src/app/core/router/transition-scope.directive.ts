import {
  ContentChild,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AnimationsService } from '../core.module';

@Directive({
  selector: '[anmsViewTransitionScope]',
  exportAs: 'viewTransitionScope'
})
export class ViewTransitionScopeDirective implements OnDestroy {
  private static readonly transitionNameProperty = 'view-transition-name';

  @Input('anmsViewTransitionScope') scopeName!: string;

  @ContentChild(RouterOutlet) outlet?: RouterOutlet;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private animationsService = inject(AnimationsService);

  ngOnDestroy() {
    this.renderer.removeStyle(
      this.el.nativeElement,
      ViewTransitionScopeDirective.transitionNameProperty
    );
  }

  public addViewTransitionName(): void {
    if (this.animationsService.page() === false) {
      return;
    }

    this.renderer.setStyle(
      this.el.nativeElement,
      ViewTransitionScopeDirective.transitionNameProperty,
      this.scopeName
    );

    const transition = document.getAnimations().map((a) => a.finished);

    Promise.all(transition)
      .then(() => {
        this.removeViewTransitionName();
      })
      .catch((error) => {
        this.removeViewTransitionName();
      });
  }

  private removeViewTransitionName(): void {
    this.renderer.removeStyle(
      this.el.nativeElement,
      ViewTransitionScopeDirective.transitionNameProperty
    );
  }
}
