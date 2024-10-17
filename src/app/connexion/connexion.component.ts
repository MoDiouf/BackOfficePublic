import { Component, OnInit } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { getDocs, query, where } from '@angular/fire/firestore';
import { sha256 } from 'js-sha256';
import { FooterPageComponent } from '../pages/home/footer-page/footer-page.component';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  standalone: true,
  imports: [RouterModule,FormsModule,FooterPageComponent],
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  email:string ="";
  password:string = "";
  customer?: any;
  isVisible: boolean = false;
  validateForm!: FormGroup;
  constructor (  private fs: Firestore,private fb: NonNullableFormBuilder,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService){}
    rememberMe: boolean = false;
    ngOnInit() {
      this.validateForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
    }
    async submitForm() {
      this.spinner.show();
      try {

        this.toast.info("Remember "+this.rememberMe,"RRRRR");

        if (!this.email || !this.password) {
          this.spinner.hide();
          this.toast.error("Veuillez remplir tous les champs....");
          return;
        }
        
        const data = {
          email: this.email,
          password: sha256(this.password)
        };
        const snapshot = await getDocs(query(
          collection(this.fs, 'users'),
          where("email", "==", data.email),
          where("password", "==", data.password)
        ));
    
        if (snapshot.empty) {
          this.spinner.hide();
          this.toast.info("Username ou mot de passe incorrect", "CONNEXION");
        } else {
          this.customer = snapshot.docs[0].data();
          localStorage.setItem('rememberedEmail', this.customer.email);
          // if (this.rememberMe) {
          //   localStorage.setItem('rememberedEmail', data.email);
          // } else {
          //   localStorage.removeItem('rememberedEmail');
          // }
          this.router.navigate(["dashboard"]);
        }
      } catch (error) {
        this.spinner.hide();
        this.toast.error("Une erreur s'est produite : ");
      }
    }
    
}
