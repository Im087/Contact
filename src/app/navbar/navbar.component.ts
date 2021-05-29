import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = JSON.parse(window.sessionStorage.getItem('user'));

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  signout(e) {
    e.preventDefault();
    this.http.delete('http://localhost:3000/session')
      .subscribe({
        next: (data: any) => {
          window.localStorage.removeItem('token');
          this.router.navigate(['/signin']);
        },
        error: error => {
          alert('Failed to log out');
        }
      });
  }

}
