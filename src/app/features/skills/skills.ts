import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements AfterViewInit{

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const bars =
              this.el.nativeElement.querySelectorAll('.skill-fill');

            bars.forEach((bar: HTMLElement) => {

              const width = bar.getAttribute('data-width');

              if (width) {
                bar.style.setProperty('--target-width', width);
                bar.classList.add('show');
              }

            });

            observer.disconnect(); // Run once
          }

        });

      },
      { threshold: 0.3 }
    );

    observer.observe(this.el.nativeElement);

  }
}
