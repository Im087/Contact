import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {

  contactForm = {
    name: '',
    email: '',
    phone: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  addContact() {
    const formData = this.contactForm
    this.http.post('http://localhost:3000/contacts', formData).subscribe({
      next: (data) => {
        this.router.navigate(['/contact']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
