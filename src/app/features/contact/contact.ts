import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {

  contactForm!: FormGroup;

  loading = false;
  successMsg = false;
  errorMsg = false;

  // ✅ EmailJS Config
  private readonly PUBLIC_KEY = '5tWjjVXUa1zgFL1-B';
  private readonly SERVICE_ID = 'service_qg2ulee';
  private readonly TEMPLATE_ID = 'template_k96grnk';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    // Init EmailJS
    emailjs.init(this.PUBLIC_KEY);

    this.contactForm = this.fb.group({

      name: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        ]
      ],

      subject: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      message: [
        '',
        [Validators.required, Validators.minLength(10)]
      ]

    });

  }


  // Easy access
  get f() {
    return this.contactForm.controls;
  }


  // ================= SUBMIT =================
  onSubmit(): void {

    if (this.contactForm.invalid) {

      this.contactForm.markAllAsTouched();
      return;

    }

    this.loading = true;
    this.successMsg = false;
    this.errorMsg = false;

    const formData = this.contactForm.value;

    // EmailJS Params
    const params = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      date: new Date().toLocaleString() // For template
    };


    // ▶ Send Email
    emailjs.send(
      this.SERVICE_ID,
      this.TEMPLATE_ID,
      params
    )

    .then(() => {

      // ✅ Success
      this.onSuccess();

    })

    .catch((error) => {

      console.error('EmailJS Error:', error);

      // ❌ Failed
      this.onError();

    });

  }


  // ================= SUCCESS =================
  private onSuccess() {

    this.loading = false;
    this.successMsg = true;
    this.errorMsg = false;

    this.contactForm.reset();

    setTimeout(() => {
      this.successMsg = false;
    }, 4000);

  }


  // ================= ERROR =================
  private onError() {

    this.loading = false;
    this.successMsg = false;
    this.errorMsg = true;

    setTimeout(() => {
      this.errorMsg = false;
    }, 4000);

  }

}
