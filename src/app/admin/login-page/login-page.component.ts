import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { User } from 'src/app/shared/interfaces'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  form: FormGroup
  submitted = false
  message: string

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Log in admin panel'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.submitted = false
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
    }, () => { // handle error
      this.submitted = false
    })
  }
}
