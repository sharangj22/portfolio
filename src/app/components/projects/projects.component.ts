import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  number: string;
  title: string;
  techLine: string;
  bullets: string[];
  tags: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projectsSection', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  projects: Project[] = [
    {
      number: '01',
      title: 'BenefitMall – Application Enhancement',
      techLine: 'C#, ASP.NET, Entity Framework, AngularJS, SSRS, SQL Server',
      bullets: [
        'Enhanced business application using ASP.NET, Entity Framework, AngularJS, and SSRS',
        'Created SQL Server stored procedures, queries, and views for business logic',
        'Developed ASP.NET Web APIs for data processing and front-end integration'
      ],
      tags: ['C#', 'ASP.NET', 'Entity Framework', 'AngularJS', 'SSRS', 'SQL Server']
    },
    {
      number: '02',
      title: 'Email Payslip / Form16 Utility',
      techLine: 'C#, Windows Forms, .NET, Excel, PDF, SMTP',
      bullets: [
        'Built desktop utility to send payslips and Form16 documents with validation',
        'Implemented Excel column validation, duplicate checks, and template-based emails'
      ],
      tags: ['C#', 'Windows Forms', '.NET', 'Excel', 'PDF', 'SMTP']
    },
    {
      number: '03',
      title: 'JD Edwards ERP Integration & Warehouse Support',
      techLine: 'JDE, Boomi, Manhattan WMS, REST APIs, SQL',
      bullets: [
        'Supported end-to-end ERP and WMS integration flows for orders and inventory',
        'Analyzed orchestration errors, HTTP failures, and mapping mismatches',
        'Improved issue resolution with root-cause analysis and reprocessing steps'
      ],
      tags: ['JDE', 'Boomi', 'Manhattan WMS', 'REST APIs', 'SQL']
    },
    {
      number: '04',
      title: 'Multi-System Integration Error Handling & Fixing Agent',
      techLine: 'Python, FastAPI, AI Agents, REST APIs, SQL Server',
      bullets: [
        'Designed AI-assisted troubleshooting agent for enterprise integration errors',
        'Built FastAPI backend services for error diagnosis across multiple systems',
        'Implemented rule-based and agent-driven analysis for root cause identification'
      ],
      tags: ['Python', 'FastAPI', 'AI Agents', 'REST APIs', 'SQL Server']
    }
  ];

  private scrollTriggers: ScrollTrigger[] = [];

  trackByNumber(index: number, project: Project): string {
    return project.number;
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
      this.initAnimations();
      this.initTiltEffect();
      ScrollTrigger.refresh();
    }, 100);
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
  }

  private initAnimations(): void {
    const section = this.sectionRef.nativeElement;

    // Section header animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    if (headerTl.scrollTrigger) {
      this.scrollTriggers.push(headerTl.scrollTrigger);
    }

    headerTl
      .from(section.querySelector('.section-label')!, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power3.out'
      })
      .from(section.querySelector('.section-title')!, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3');

    // Staggered card entrance
    const cards = Array.from(section.querySelectorAll('.project-card'));

    cards.forEach((card, i) => {
      const numberEl = card.querySelector('.project-number');

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      if (cardTl.scrollTrigger) {
        this.scrollTriggers.push(cardTl.scrollTrigger);
      }

      cardTl
        .from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out'
        })
        .from(numberEl!, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }, '-=0.4');
    });

    // Decorative orb float
    gsap.to(section.querySelector('.bg-gradient-orb'), {
      y: -30,
      x: 20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  private initTiltEffect(): void {
    const section = this.sectionRef.nativeElement;
    const cards = Array.from(section.querySelectorAll('.project-card'));

    cards.forEach(card => {
      const el = card as HTMLElement;
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }
}
