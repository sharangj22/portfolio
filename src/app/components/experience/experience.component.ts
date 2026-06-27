import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('experienceSection', { static: true }) experienceSection!: ElementRef<HTMLElement>;
  @ViewChild('timelineLine', { static: true }) timelineLine!: ElementRef<HTMLElement>;

  private scrollTriggers: ScrollTrigger[] = [];

  experiences: Experience[] = [
    {
      role: 'Software Developer - Full Stack, ERP & AI Automation',
      company: 'Clarium Technologies Private Limited',
      period: '2023 - Present',
      location: 'Chennai, India',
      bullets: [
        'Developed enterprise applications across .NET, SQL Server, Angular, React, Python FastAPI, JD Edwards, Boomi, and Manhattan WMS.',
        'Built JDE Orchestrations including data requests, form requests, and integration logic for ERP transactions.',
        'Created and optimized SQL Server stored procedures, views, and validation scripts for business reporting.',
        'Supported Boomi integration flows by analyzing payloads, field mappings, and API failures.',
        'Investigated and resolved production issues related to ASN, PO, inventory, shipment, and warehouse processing.',
        'Collaborated with functional and technical teams for requirement mapping, UAT, and demo validations.'
      ],
      tags: ['.NET', 'Angular', 'SQL Server', 'Python', 'JDE', 'Boomi', 'Manhattan WMS', 'React']
    }
  ];

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
      this.animateHeader();
      this.animateTimelineLine();
      this.animateTimelineCards();
      this.animateTimelineDots();
      ScrollTrigger.refresh();
    }, 100);
  }

  private animateHeader(): void {
    const header = this.experienceSection.nativeElement.querySelector('.section-header');
    if (!header) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    this.scrollTriggers.push(tl.scrollTrigger as ScrollTrigger);

    tl.from(header, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  private animateTimelineLine(): void {
    const line = this.timelineLine.nativeElement;

    gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });

    const tween = gsap.to(line, {
      scrollTrigger: {
        trigger: this.experienceSection.nativeElement.querySelector('.timeline'),
        start: 'top 75%',
        end: 'bottom 50%',
        toggleActions: 'play none none none'
      },
      scaleY: 1,
      duration: 1.5,
      ease: 'power2.inOut'
    });

    if (tween.scrollTrigger) {
      this.scrollTriggers.push(tween.scrollTrigger);
    }
  }

  private animateTimelineCards(): void {
    const cards = Array.from(this.experienceSection.nativeElement.querySelectorAll('.timeline-card'));

    cards.forEach((card, index) => {
      const el = card as HTMLElement;
      const isEven = index % 2 === 0;

      const tween = gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: isEven ? -80 : 80,
        duration: 0.9,
        ease: 'power3.out',
        delay: index * 0.15
      });

      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    });
  }

  private animateTimelineDots(): void {
    const dots = Array.from(this.experienceSection.nativeElement.querySelectorAll('.timeline-dot'));

    dots.forEach((dot, index) => {
      const el = dot as HTMLElement;

      const tween = gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        scale: 0,
        duration: 0.6,
        ease: 'back.out(2)',
        delay: index * 0.15 + 0.3
      });

      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    });
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
  }
}
