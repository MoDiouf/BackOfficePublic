import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

//  import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { FooterPageComponent } from '../pages/home/footer-page/footer-page.component';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,

  imports: [RouterModule,FormsModule,FooterPageComponent],
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit{
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  subjet: string = "";
  message: string = "";

  constructor(private fs: Firestore, private fb: NonNullableFormBuilder,
    private router: Router, private toast: ToastrService,
    private spinner: NgxSpinnerService) {}


  ngOnInit(): void {
    emailjs.init('LQhpIJwcWW8XjrYkA');
  }


  submitForm() {
    if (this.firstName === "" || this.email === "" || this.subjet === "" || this.message === "") {
      this.toast.info("Veuillez remplir tous les champs", "Contact");
    } else {
      this.sendEmail();
    }
  }

  sendEmail() {
    emailjs.send("service_7zg3lwp", "template_vx8c2jd", {
      to_name: "IIBS",
      message: this.message,
      from_name: this.firstName + ' ' + this.lastName,
      from_email:this.email,
      to: 'contact@iibs-sn.com',
      subject: this.subjet
    }).then(
      () => {
        this.toast.success('E-mail envoyé avec succès !', 'Contact');

      },
      (error) => {
        this.toast.error('Échec de l\'envoi de l\'e-mail...', (error as EmailJSResponseStatus).text);
      }
    );
  }

}