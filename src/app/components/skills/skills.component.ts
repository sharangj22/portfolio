import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

interface SkillCategory {
  icon: string;
  title: string;
  color: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('skillsSection', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;

  categories: SkillCategory[] = [
    {
      icon: '💻',
      title: 'Programming Languages',
      color: '#4f6df5',
      skills: ['C#', 'SQL', 'Python', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3']
    },
    {
      icon: '⚙️',
      title: '.NET Technologies',
      color: '#00d4ff',
      skills: ['ASP.NET Core', 'ASP.NET MVC', 'Web API', 'Entity Framework Core', 'LINQ', 'ADO.NET', 'Windows Forms']
    },
    {
      icon: '🎨',
      title: 'Frontend',
      color: '#f56df5',
      skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'RxJS', 'HTML', 'CSS', 'Bootstrap', 'Responsive UI']
    },
    {
      icon: '🗄️',
      title: 'Database',
      color: '#6df5a0',
      skills: ['SQL Server', 'Stored Procedures', 'Views', 'Functions', 'Joins', 'Indexes', 'Query Optimization']
    },
    {
      icon: '🔗',
      title: 'ERP & Integration',
      color: '#f5a04f',
      skills: ['JD Edwards EnterpriseOne', 'JDE Orchestrator', 'Data Requests', 'Boomi', 'REST APIs', 'Business Views']
    },
    {
      icon: '🤖',
      title: 'Backend & AI',
      color: '#f54f6d',
      skills: ['Python FastAPI', 'Express.js', 'REST APIs', 'AI Agents', 'Error Diagnosis Automation', 'Log Analysis']
    }
  ];

  ngAfterViewInit(): void {
    const section = this.sectionRef.nativeElement;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(section);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
