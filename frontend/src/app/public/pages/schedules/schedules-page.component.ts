import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScheduleSlotCardComponent } from '../content/schedule-slot-card.component';
import { schedulesPageContent } from '../content/public-content';
import type { ClassLevel, ContentStatus, ScheduleDay, ScheduleSlot } from '../content/public-content.models';

@Component({
  selector: 'app-schedules-page',
  standalone: true,
  imports: [RouterLink, ScheduleSlotCardComponent],
  templateUrl: './schedules-page.component.html',
  styleUrl: './schedules-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulesPageComponent {
  protected readonly page = schedulesPageContent;
  protected readonly selectedDay = signal('all');
  protected readonly selectedLevel = signal('all');

  protected readonly publishedDays = computed<ScheduleDay[]>(() => {
    if (this.page.status !== 'approved') {
      return [];
    }

    return this.page.days
      .map((day) => ({
        ...day,
        slots: day.slots.filter((slot) => slot.status === 'approved'),
      }))
      .filter((day) => day.slots.length > 0);
  });
  protected readonly availableDays = computed(() => this.publishedDays().map((day) => day.id));
  protected readonly availableLevels = computed(() => {
    const levels = new Map<string, ClassLevel>();

    for (const day of this.publishedDays()) {
      for (const slot of day.slots) {
        if (slot.level) {
          levels.set(slot.level.id, slot.level);
        }
      }
    }

    return Array.from(levels.values());
  });
  protected readonly visibleDays = computed<ScheduleDay[]>(() => {
    const dayFilter = this.selectedDay();
    const levelFilter = this.selectedLevel();

    return this.publishedDays()
      .filter((day) => dayFilter === 'all' || day.id === dayFilter)
      .map((day) => ({
        ...day,
        slots: day.slots.filter(
          (slot) => levelFilter === 'all' || slot.level?.id === levelFilter,
        ),
      }))
      .filter((day) => day.slots.length > 0);
  });
  protected readonly hasPublishedSchedule = computed(() => this.publishedDays().length > 0);
  protected readonly hasVisibleSchedule = computed(() => this.visibleDays().length > 0);

  protected readonly statusLabel = (status: ContentStatus): string =>
    status === 'pending-validation' ? 'Pendiente de validación' : 'Aprobado';

  protected readonly timezoneLabel = 'America/Asuncion';

  protected onDayChange(event: Event): void {
    this.selectedDay.set((event.target as HTMLSelectElement).value);
  }

  protected onLevelChange(event: Event): void {
    this.selectedLevel.set((event.target as HTMLSelectElement).value);
  }

  protected resetFilters(): void {
    this.selectedDay.set('all');
    this.selectedLevel.set('all');
  }
}
