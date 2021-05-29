import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  signup(): void {
    const formData = this.signupForm; //save the sign up form submitted by the user
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.post('http://localhost:3000/users', formData, httpOptions)
      .subscribe({
        next: (data: any) => {
          this.errorMessage = '';
          window.sessionStorage.setItem('token', data.token);
          window.sessionStorage.setItem('user', JSON.stringify(data.user));
          this.router.navigate(['/']);
        },
        error: error => {
          if (error.status === 409) {
            this.errorMessage = 'This Email has been used.'
          }
        }
      });
  }

  deleteMessage(): void {
    if (this.signupForm.email == '') {
      this.errorMessage = '';
    }
  }

}
