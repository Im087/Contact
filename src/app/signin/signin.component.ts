import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  signin(): void {
    const formData = this.signinForm;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.post('http://localhost:3000/session', formData, httpOptions).
      subscribe({
        next: (data: any) => {
          this.errorMessage = '';
          window.sessionStorage.setItem('token', data.token);
          window.sessionStorage.setItem('user', JSON.stringify(data.user));
          this.router.navigate(['/']);
        },
        error: error => {
          if (error.status === 401) {
            this.errorMessage = "The email or the password is incorrect."
          }
        }
      });

  }

  deleteMessage(): void {
    if (this.signinForm.password == '') {
      this.errorMessage = '';
    }
  }


}
