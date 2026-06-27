import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
})
export class IntroductionComponent implements AfterViewInit, OnDestroy {
  nameChars: string[] = [];
  private ctx!: gsap.Context;

  constructor(private el: ElementRef) {
    const name = 'Sharan Gonsalous J';
    this.nameChars = name.split('');
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Greeting fade up
      tl.from('.intro-greeting', {
        y: 40,
        opacity: 0,
        duration: 0.8,
      });

      // Character-by-character name reveal
      tl.from(
        '.char',
        {
          y: 80,
          opacity: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      // Subtitle fade up
      tl.from(
        '.intro-subtitle',
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
        },
        '-=0.3'
      );

      // Location badge
      tl.from(
        '.intro-location',
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.3'
      );

      // CTA buttons stagger
      tl.from(
        '.intro-cta .btn',
        {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
        },
        '-=0.3'
      );

      // Social links
      tl.from(
        '.social-link',
        {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
        },
        '-=0.3'
      );

      // Floating decorative elements
      gsap.utils.toArray<HTMLElement>('.float-particle').forEach((particle, i) => {
        gsap.to(particle, {
          y: `random(-20, 20)`,
          x: `random(-15, 15)`,
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

      // Gradient orbs subtle pulsing
      gsap.utils.toArray<HTMLElement>('.hero-orb').forEach((orb, i) => {
        gsap.to(orb, {
          scale: gsap.utils.random(1.05, 1.2),
          opacity: gsap.utils.random(0.08, 0.2),
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 1.5,
        });
      });
    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  scrollToContact(): void {
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  }

  isSpace(char: string): boolean {
    return char === ' ';
  }
}
