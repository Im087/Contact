import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contactForm = {
    name: '',
    email: '',
    phone: '',
    id: ''
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const contactId: number = +this.route.snapshot.params.id;
    this.getContactById(contactId);

  }

  getContactById(id: number): void {
    this.http.get(`http://localhost:3000/contacts/${id}`).subscribe({
      next: (data: any) => {
        this.contactForm = data;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  editContact(): void {
    const id = this.contactForm.id;
    this.http.patch(`http://localhost:3000/contacts/${id}`, this.contactForm).subscribe({
      next: (data: any) => {
        this.router.navigate(['/contact']);
      },
      error: error => {
        console.log(error);
      }
    })

  }

}
