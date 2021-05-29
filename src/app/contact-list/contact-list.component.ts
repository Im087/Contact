import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contact: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.http.get('http://localhost:3000/contacts')
      .subscribe({
        next: (data: any) => {
          this.contact = data;
        },
        error: error => {
          console.log('error');
        }
      });
  }

  deleteContact(id, e): void {
    e.preventDefault();
    this.http.delete(`http://localhost:3000/contacts/${id}`).subscribe({
      next: (data) => {
        this.getContact();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
