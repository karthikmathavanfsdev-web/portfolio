import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Home } from '../../features/home/home';
import { About } from '../../features/about/about';
import { Contact } from '../../features/contact/contact';
import { Projects } from '../../features/projects/projects';
import { Footer } from '../../shared/footer/footer';
import { Skills } from '../../features/skills/skills';
import { Services } from '../../features/services/services';
import { Experience } from '../../features/experience/experience';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

    Home,
    About,
    Contact,
    Projects,
    Footer,
    Skills,
    Services,
    Experience
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {

  isScrolled = false;
  isDark = false;

  /* Navbar scroll effect */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 60;
  }

  /* Load saved theme */
  ngOnInit(): void {

    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      this.enableDark();
    }

  }

  /* Toggle Theme */
  toggleTheme() {

    this.isDark = !this.isDark;

    if (this.isDark) {
      this.enableDark();
    } else {
      this.disableDark();
    }

  }

  /* Enable Dark */
  private enableDark() {

    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    this.isDark = true;

  }

  /* Disable Dark */
  private disableDark() {

    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    this.isDark = false;

  }

  goToSection(id: string) {

    // Scroll to section
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });

    // Close navbar (mobile)
    const navbar = document.getElementById('mainNavbar');

    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }


}
