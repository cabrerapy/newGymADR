import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { Facility } from './public-content.models';

@Component({
  selector: 'app-facility-card',
  standalone: true,
  templateUrl: './facility-card.component.html',
  styleUrl: './facility-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilityCardComponent {
  @Input({ required: true }) facility!: Facility;

  protected readonly categoryLabel: Record<Facility['category'], string> = {
    space: 'Espacio',
    equipment: 'Equipamiento',
    support: 'Zona de apoyo',
  };
}
