import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryGridComponent } from './gallery-grid.component';

describe('GalleryGridComponent', () => {
  let fixture: ComponentFixture<GalleryGridComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryGridComponent],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryGridComponent);
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('emptyTitle', 'Galería oficial pendiente');
    fixture.componentRef.setInput('emptyDescription', 'No hay fotografías aprobadas.');
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza un estado vacío accesible cuando no hay fotografías', () => {
    expect(nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(nativeElement.textContent).toContain('Galería oficial pendiente');
    expect(nativeElement.textContent).toContain('No hay fotografías aprobadas.');
  });

  it('no renderiza imágenes cuando la galería está vacía', () => {
    expect(nativeElement.querySelectorAll('img').length).toBe(0);
  });
});
