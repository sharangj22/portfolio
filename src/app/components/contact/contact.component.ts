import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef<HTMLElement>;
  @ViewChild('sectionHeader', { static: true }) sectionHeader!: ElementRef<HTMLElement>;
  @ViewChild('ctaArea', { static: true }) ctaArea!: ElementRef<HTMLElement>;
  @ViewChildren('contactCard') contactCards!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
      this.initAnimations();
      ScrollTrigger.refresh();
    }, 100);
  }

  private initAnimations(): void {
    const section = this.contactSection.nativeElement;
    const header = this.sectionHeader.nativeElement;
    const cta = this.ctaArea.nativeElement;
    const cards = this.contactCards.map((c) => c.nativeElement);

    // Header fade-in
    gsap.from(header, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Staggered slide-up for contact cards
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    // CTA area fade-in
    gsap.from(cta, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        toggleActions: 'play none none none',
      },
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (this.contactSection?.nativeElement?.contains(trigger.trigger as Element)) {
        trigger.kill();
      }
    });
  }
}
