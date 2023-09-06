import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  authenticated = false;
  isUser = false;
  isAdmin = false;

  constructor(private readonly keycloak: KeycloakService, private http: HttpClient) {
    this.keycloak.isLoggedIn().then((authenticated) => {
      this.authenticated = authenticated;
      if (authenticated) {
        const roles = this.keycloak.getUserRoles();
        this.isUser = roles.includes('USER');
        this.isAdmin = roles.includes('ADMIN');
      }
    });
  }

  ngOnInit() {
    this.http.get('https://localhost:7102/WeatherForecast').subscribe({
      next: (response) =>{
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
     });
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}
