import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;
  private countersStarted = false;

  stats = [
    { target: 3, suffix: '+', label: 'Years Experience' },
    { target: 5, suffix: '+', label: 'Key Projects' },
    { target: 10, suffix: '+', label: 'Technologies' }
  ];

  ngAfterViewInit(): void {
    const section = this.aboutSection.nativeElement;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('revealed');
            if (!this.countersStarted) {
              this.countersStarted = true;
              this.animateCounters();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observer.observe(section);
  }

  private animateCounters(): void {
    const counterElements = Array.from(
      this.aboutSection.nativeElement.querySelectorAll('.stat-number')
    );

    this.stats.forEach((stat, index) => {
      const el = counterElements[index] as HTMLElement;
      if (!el) return;

      const duration = 2000;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * stat.target) + stat.suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
