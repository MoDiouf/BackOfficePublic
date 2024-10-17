import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { RecaptchaVerifier, getAuth, provideAuth, signInWithPhoneNumber } from "@angular/fire/auth"
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  otp!: string;
  customer?: any;
  isVisible: boolean = false;
  validateForm!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private fs: Firestore,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onCaptchVerify() {
    const auth = getAuth()
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.isVisible = true;
          console.log("response recaptcha###", response);
          // const appVerifier = window.recaptchaVerifier;
          // const tel = "+221" + this.validateForm.get("userName")?.value;
          // signInWithPhoneNumber(auth, tel, appVerifier)
          //   .then((confirmationResult: any) => {
          //     this.spinner.hide();
          //     if (confirmationResult) {
          //       window.confirmationResult = confirmationResult;
          //     }
          //   })
          //   .catch((error) => {
          //     this.spinner.hide();
          //     this.toast.info(error, "CONNEXION")
          //   });
        },
        'expired-callback': () => {
        }
      });
    }
  }

  onOtpChange(event: any) {
    if (6 == event.length) {
      this.otp = event;
      this.onOTPVerify()
    }
  }

  onCancel() {
    this.isVisible = false;
  }

  onOTPVerify() {
    this.spinner.show();
    window.confirmationResult
      .confirm(this.otp)
      .then((res: any) => {
        this.spinner.hide();
        if (res) {
          this.router.navigate(["dashboard"]);
        }
      }).catch((err: any) => {
        this.spinner.hide();
        console.log("Erreur OTP verification", err);
      });
  }

  show() { }

  async submitForm() {
    this.spinner.show();
    if (this.validateForm.valid) {
      this.onCaptchVerify();
      var pwd = this.validateForm.get("password")?.value;
      const tel = "+221" + this.validateForm.get("userName")?.value;
      const snapshot = await getDocs(query(collection(this.fs, 'clients'), where("numero_telephone", "==", tel), where("password", "==", sha256(pwd))))
      this.customer = snapshot?.docs[0]?.data();
      if (this.customer) {
        this.router.navigate(["dashboard"]);
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toast.info("Username ou mot de passe incorrect", "CONNEXION")
      }
    } else {
      this.spinner.hide();
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: any
  }
}
