import { Component, AfterViewInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'introduction';
  private lastScrollY = 0;
  private navbarHidden = false;
  private scrollTriggers: ScrollTrigger[] = [];

  navLinks = [
    { label: 'Introduction', target: 'introduction' },
    { label: 'About', target: 'about' },
    { label: 'Experience', target: 'experience' },
    { label: 'Projects', target: 'projects' },
    { label: 'Skills', target: 'skills' },
    { label: 'Contact', target: 'contact' },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.setupScrollTriggers();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach((st) => st.kill());
  }

  private setupScrollTriggers(): void {
    // Active section highlighting
    this.navLinks.forEach((link) => {
      const sectionEl = document.getElementById(link.target);
      if (sectionEl) {
        const st = ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => (this.activeSection = link.target),
          onEnterBack: () => (this.activeSection = link.target),
        });
        this.scrollTriggers.push(st);
      }
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const currentScrollY = window.scrollY;
    const navbar = this.el.nativeElement.querySelector('.navbar');

    // Solid background on scroll
    this.isScrolled = currentScrollY > 50;

    // Hide on scroll down, show on scroll up
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      if (!this.navbarHidden) {
        gsap.to(navbar, { y: -100, duration: 0.35, ease: 'power2.inOut' });
        this.navbarHidden = true;
      }
    } else {
      if (this.navbarHidden) {
        gsap.to(navbar, { y: 0, duration: 0.35, ease: 'power2.inOut' });
        this.navbarHidden = false;
      }
    }

    this.lastScrollY = currentScrollY;
  }

  scrollTo(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
