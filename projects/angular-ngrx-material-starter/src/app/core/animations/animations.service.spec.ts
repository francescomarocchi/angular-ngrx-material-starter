import { AnimationsService } from './animations.service';

describe('AnimationsService', () => {
  let service: AnimationsService;

  beforeEach(() => {
    service = new AnimationsService();
  });

  it('should initialize with stagger and page set to null/false', () => {
    expect(service.stagger()).toBe(null);
    expect(service.page()).toBe(false);
  });

  it('should set both stagger and page when both animations are enabled', () => {
    service.updateRouteAnimationType(true, true);
    expect(service.stagger()).toBe('stagger');
    expect(service.page()).toBe(true);
  });

  it('should set only page when only page animations are enabled', () => {
    service.updateRouteAnimationType(true, false);
    expect(service.stagger()).toBe(null);
    expect(service.page()).toBe(true);
  });

  it('should set only stagger when only element animations are enabled', () => {
    service.updateRouteAnimationType(false, true);
    expect(service.stagger()).toBe('stagger');
    expect(service.page()).toBe(false);
  });

  it('should set both to null/false when no animations are enabled', () => {
    service.updateRouteAnimationType(false, false);
    expect(service.stagger()).toBe(null);
    expect(service.page()).toBe(false);
  });
});
