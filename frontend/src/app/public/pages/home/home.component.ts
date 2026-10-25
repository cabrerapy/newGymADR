import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { homePageContent } from '../content/public-content';

type ActionTone = 'primary' | 'secondary';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly page = homePageContent;

  protected readonly actionClasses = (tone: ActionTone): string => {
    if (tone === 'primary') {
      return 'inline-flex min-h-11 items-center justify-center rounded-md bg-adr-gold px-5 py-3 text-sm font-bold text-adr-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-adr-gold';
    }

    return 'inline-flex min-h-11 items-center justify-center rounded-md border border-white/25 px-5 py-3 text-sm font-bold text-adr-white transition hover:border-adr-gold hover:text-adr-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-adr-gold';
  };
}

