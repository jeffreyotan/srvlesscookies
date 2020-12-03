import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService, CookieText } from './cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fortune Cookie Frontend';

  form: FormGroup;
  cookies: CookieText[];

  constructor(private fb: FormBuilder, private cookieSvc: CookieService) {}

  ngOnInit() {
    this.form = this.fb.group({
      cookieCount: this.fb.control(1, [ Validators.required ])
    });
  }

  async onClickGetCookie() {
    const cookieCount = parseInt(this.form.get('cookieCount').value);
    console.info('=> cookieCount: ', cookieCount);

    this.cookies = await this.cookieSvc.getCookies(cookieCount);
    console.info('=> this.cookie: ', this.cookies);
  }
}
