import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoPlaceholderComponent } from './photo-placeholder.component';
import type { PhotoPlaceholder } from './public-content.models';

describe('PhotoPlaceholderComponent', () => {
  const photo: PhotoPlaceholder = {
    id: 'box-overview',
    status: 'pending-validation',
    title: 'Vista general del box',
    description: 'Fotografía oficial pendiente de entrega y autorización de uso.',
  };

  let fixture: ComponentFixture<PhotoPlaceholderComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoPlaceholderComponent],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoPlaceholderComponent);
    fixture.componentRef.setInput('photo', photo);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza un marcador accesible con el estado pendiente', () => {
    const placeholder = nativeElement.querySelector('[role="img"]') as HTMLElement;
    expect(placeholder).toBeTruthy();
    expect(placeholder.getAttribute('aria-label')).toContain(photo.title);
    expect(nativeElement.textContent).toContain('Fotografía pendiente');
    expect(nativeElement.textContent).toContain(photo.description);
  });

  it('no renderiza una imagen externa mientras la fotografía no esté aprobada', () => {
    expect(nativeElement.querySelectorAll('img').length).toBe(0);
  });
});
