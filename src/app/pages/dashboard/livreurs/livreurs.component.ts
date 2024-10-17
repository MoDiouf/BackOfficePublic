import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import  emailjs  from '@emailjs/browser';
@Component({
  selector: 'app-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss'],
})
export class LivreursComponent implements OnInit {
  deliveries!: any;
  selectedDelivery?: any;
  isVisible?: boolean = false;
  isModal?: boolean = false;
  isPermis?: boolean = false;
  isCarteGrise?: boolean = false;
  isCarteIdentite?: boolean = false;
  isAssurance?: boolean = false;
  carteGriseBase64Img?: string | any;
  permisBase64Img?: string | any;
  assuranceBase64Img?: string | any;
  carteIdentiteBase64Img?: string | any;

  constructor(
    private fs: Firestore,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private sharedService: SharedService
  ) {
    emailjs.init("LQhpIJwcWW8XjrYkA");
   }

  ngOnInit(): void {
    this.getDeliveries();
  }

  async getDeliveries() {
    this.spinner.show();
    const snapshot = await getDocs(query(collection(this.fs, 'livreurs')));
    this.deliveries = snapshot.docs.map((doc) => doc.data());
    const NoTake: any[] = [];
    for (const deliverie of this.deliveries) {
      if (deliverie.isActive == true) {
        NoTake.push(deliverie.id_livreur);
      }

    }
    this.sharedService.noTake = NoTake;
    
    
    this.spinner.hide();
  }

  async showDetails(id: string) {
    this.spinner.show();
    this.isVisible = true;
    const snapshot = await getDocs(
      query(collection(this.fs, 'livreurs'), where('id_livreur', '==', id))
    );
    this.selectedDelivery = snapshot.docs[0].data();
    this.spinner.hide();
  }

  async onCarteIdentite(idDelivery: string) {
    let img = await this.getBase64ImageByIdDelivery(
      idDelivery,
      'imagesCarteIdentite'
    );
    this.carteIdentiteBase64Img = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${img}`
    );
    this.isModal = true;
    this.isCarteIdentite = true;
  }
  async onCarteGrise(idDelivery: string) {
    let img = await this.getBase64ImageByIdDelivery(
      idDelivery,
      'imagesCarteGris'
    );
    this.carteGriseBase64Img = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${img}`
    );
    this.isModal = true;
    this.isCarteGrise = true;
  }
  async onAssurance(idDelivery: string) {
    let img = await this.getBase64ImageByIdDelivery(
      idDelivery,
      'imagesAssurances'
    );
    this.assuranceBase64Img = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${img}`
    );
    this.isModal = true;
    this.isAssurance = true;
  }
  async onPermis(idDelivery: string) {
    this.spinner.show();
    let img = await this.getBase64ImageByIdDelivery(idDelivery, 'imagesPermis');
    this.permisBase64Img = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${img}`
    );
    this.isModal = true;
    this.isPermis = true;
    this.spinner.hide();
  }

  onClose() {
    this.isModal = false;
    this.isPermis = false;
    this.isAssurance = false;
    this.isCarteGrise = false;
    this.isCarteIdentite = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  async onChangeStatus(doc1: any, ref: any) {
    await updateDoc(ref, {
      activeCompte: !doc1.data()['activeCompte'],
    })
      .then((docRef) => {
        this.spinner.hide();
        if (doc1.data()['activeCompte']) {
          this.getDeliveries();
          this.toastr.success('Compte désactivé avec succès');
        } else {
          this.getDeliveries();
          this.toastr.success('Compte activé avec succès');
        }
      })
      .catch((error) => {
        this.spinner.hide();
        this.toastr.warning(
          'Un problème est survenu lors de la modification du status compte,veuillez réessayer ulterieurement'
        );
      });
  }

  async updateStatusAccount(idDelivery: string,email: string,prenom: string) {
    this.spinner.show();
    const snapshot = await getDocs(
      query(
        collection(this.fs, 'livreurs'),
        where('id_livreur', '==', idDelivery)
      )
    );
    //this.selectedDelivery = snapshot.docs[0].data();
    snapshot.forEach(async (doc1) => {
      if (doc1.exists()) {
        const ref = doc(this.fs, 'livreurs', doc1.id);
        if (doc1.data()['activeCompte']) {
          if (window.confirm('Voulez-vous désactivé ce compte?')) {
            const Message = "Bonjour cher utilisteur votre compte est désactivé par l'administrateur";
            emailjs.send("service_7zg3lwp","template_vx8c2jd",{
              from_name: "Drop it service",
              to_name: prenom,
              message: Message,
              to: email,
              }).then();
            await this.onChangeStatus(doc1, ref);
          } else {
            this.spinner.hide();
          }
        } else {
          if (window.confirm('Voulez-vous activé ce compte?')) {
            const Message = "Bonjour cher utilisteur votre compte est activé.Bienvenue sur Dropit";
            emailjs.send("service_7zg3lwp","template_vx8c2jd",{
              from_name: "Drop it service",
              to_name: prenom,
              message: Message,
              to: email,
              });
            await this.onChangeStatus(doc1, ref);
          } else {
            this.spinner.hide();
          }
        }
      }
    });
  }

  async getBase64ImageByIdDelivery(idDelivery: string, collectionName: string) {
    const snapshot = await getDocs(
      query(collection(this.fs, collectionName), where('id', '==', idDelivery))
    );
    return snapshot.docs[0].data()['images'];
  }
}