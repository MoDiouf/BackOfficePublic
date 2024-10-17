import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { sha256 } from 'js-sha256';
import { AuthService } from '../../services/auth.service';
import { FooterPageComponent } from '../../home/footer-page/footer-page.component';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  standalone: true,
  imports: [RouterModule,FormsModule,FooterPageComponent],
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  firstName:string = "";
  lastName:string = "";
  addresse:string = "";
  genre:string = "";
  pays:string = "";
  ville:string = "";
  poste:string = "";
  codeNumber:string = "";
  numberPhone : string ="";
  email:string ="";
  password :string ="";
  passwordConfirm:string ="";
  constructor (  private fs: Firestore,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService){}
   
  // public SubmitData (){
  //   if(this.password !== this.passwordConfirm){
  //     this.toast.info("Le mot de passe et mot de passe confirme doivent etre egaux","Errer")
  //     return;
  //   }else if(this.firstName === "" && this.lastName === "" && this.addresse === "" && this.email ==="" && this.password ===""
  //     && this.passwordConfirm ==="" && this.numberPhone === ""
  //   ){
  //      this.toast.info("Veuillez remplir tous les champs...");
  //      return;
  //   }else{
  //      const data = {
  //      firstName :this.firstName,
  //      lastName: this.lastName,
  //      addresse:this.addresse,
  //      genre:this.genre,
  //      ville:this.ville,
  //      poste:this.poste,
  //      pays:this.pays,
  //      email:this.email,
  //      password:sha256(this.password),
  //      passwordConfirm:sha256(this.passwordConfirm),
  //      numberPhone:this.codeNumber + this.numberPhone,
  //      }
  //      this.authService.register(this.email, this.password, data)
  //      .then(() => {
  //       const usersCollection = collection(this.fs, 'users'); 
  //       addDoc(usersCollection, data)
  //           .then(() => {
  //               this.toast.success("Données insérées avec succès !");
  //               this.router.navigate(['/Connexion']);
  //           })
  //           .catch((error) => {
  //               console.error("Erreur lors de l'ajout des données : ", error);
  //               this.toast.error("Erreur lors de l'ajout des données.");
  //           });
  //      })
  //      .catch((error) => {
  //             this.toast.error("Erreur lors de l'inscription");
  //      });
       
  //   }
  // }
  public SubmitData() {
    // Vérifiez que les mots de passe correspondent
    if (this.password !== this.passwordConfirm) {
        this.toast.info("Le mot de passe et le mot de passe de confirmation doivent être égaux", "Erreur");
        return;
    }
    
    // Vérifiez que tous les champs sont remplis
    if (!this.firstName || !this.lastName || !this.addresse || !this.email || !this.password || !this.passwordConfirm || !this.numberPhone) {
        this.toast.info("Veuillez remplir tous les champs...");
        return;
    }

    // Préparer les données de l'utilisateur
    const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        addresse: this.addresse,
        genre: this.genre,
        ville: this.ville,
        poste: this.poste,
        pays: this.pays,
        email: this.email,
        password: sha256(this.password), 
        passwordConfirm: sha256(this.passwordConfirm), 
        numberPhone: this.codeNumber + this.numberPhone,
    };
    const usersCollection = collection(this.fs, 'users'); 
            addDoc(usersCollection, data)
                .then(() => {
                    this.toast.success("Données insérées avec succès !");
                    this.router.navigate(['/Connexion']);
                })
                .catch((error) => {
                    this.toast.error("Erreur lors de l'ajout des données.");
                });
//     this.authService.register(this.email, this.password, data)
//         .then(() => {
            
//         })
//         .catch((error) => {
//             this.toast.error("Erreur lors de l'inscription : " + error.message); // Afficher un message d'erreur convivial
//         });
 }

}
