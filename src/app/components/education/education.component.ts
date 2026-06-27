import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('educationSection', { static: true }) educationSection!: ElementRef<HTMLElement>;
  @ViewChild('educationCard', { static: true }) educationCard!: ElementRef<HTMLElement>;
  @ViewChild('sectionHeader', { static: true }) sectionHeader!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
      this.initAnimations();
      ScrollTrigger.refresh();
    }, 100);
  }

  private initAnimations(): void {
    const section = this.educationSection.nativeElement;
    const card = this.educationCard.nativeElement;
    const header = this.sectionHeader.nativeElement;

    // Header fade in
    gsap.from(header, {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Card scale-up entrance
    gsap.from(card, {
      scale: 0.85,
      opacity: 0,
      y: 60,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (this.educationSection?.nativeElement?.contains(trigger.trigger as Element)) {
        trigger.kill();
      }
    });
  }
}
