import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { NavigationItem } from './navigation-items';

@Component({
  selector: 'app-mobile-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-navigation.component.html',
  styleUrl: './mobile-navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigationComponent implements AfterViewInit, OnChanges {
  private readonly document = inject(DOCUMENT);
  @Input({ required: true }) open = false;
  @Input({ required: true }) navigationItems: readonly NavigationItem[] = [];
  @Output() closeRequested = new EventEmitter<void>();

  @ViewChild('closeButton', { static: false })
  private readonly closeButton?: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    this.focusCloseButtonIfNeeded();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true && !changes['open']?.firstChange) {
      this.focusCloseButtonIfNeeded();
    }
  }

  private focusCloseButtonIfNeeded(): void {
    if (this.open) {
      queueMicrotask(() => this.closeButton?.nativeElement.focus());
    }
  }

  protected close(): void {
    this.closeRequested.emit();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.close();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const container = event.currentTarget as HTMLElement;
    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = this.document.activeElement as HTMLElement | null;

    if (!activeElement || !container.contains(activeElement)) {
      event.preventDefault();
      firstElement.focus();
      return;
    }

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}
