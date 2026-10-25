import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './info-page.component.html',
  styleUrl: './info-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly routeData = this.route.snapshot.data as {
    title: string;
    description: string;
  };

  protected readonly title = this.routeData.title;
  protected readonly description = this.routeData.description;
}
