import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState; // Observing the authentication state
  }

  logout() {
    return this.afAuth.signOut();
  }

  isLoggedIn(): boolean {
    return !!this.afAuth.currentUser;
  }
  // public register(email: string, password: string, userData: any) {
  //   return this.afAuth.createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       if (user) {
  //         return this.firestore.collection('users').doc(user.uid).set(userData);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Erreur d'inscription", error);
  //     });
  // }
//   public async register(email: string, password: string, userData: any): Promise<FirebaseUser> {
//     try {
//         // Créez l'utilisateur avec l'email et le mot de passe
//         const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
//         const user = userCredential.user;

//         // Vérifiez si l'utilisateur a bien été créé
//         if (user) {
//             // Ajoutez les données de l'utilisateur dans Firestore
//             await this.firestore.collection('users').doc(user.uid).set(userData);
//             return user; // Retournez l'utilisateur créé
//         } else {
//             throw new Error("Utilisateur non créé");
//         }
//     } catch (error) {
//         console.error("Erreur d'inscription", error);
//         throw error; // Renvoie l'erreur pour qu'elle soit traitée plus haut
//     }
// }

}
