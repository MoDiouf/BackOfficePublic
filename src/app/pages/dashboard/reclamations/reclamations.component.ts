import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import  emailjs  from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss']
})
export class ReclamationsComponent implements OnInit {

  order?: any;
  delivery?: any;
  customer?: any;
  reclamations!: any;
  selectedReclamation?: any;
  isVisible?: boolean = false;
  isMessageVisible?: boolean = false;
  message: string = '';
  idClient: string = '';
  idDelivery: string = '';
  constructor(private fs: Firestore, private spinner: NgxSpinnerService,private toast: ToastrService) {
    emailjs.init("LQhpIJwcWW8XjrYkA");
   }

  ngOnInit(): void {
    this.getReclamations();
  }


  async getReclamations() {
    this.spinner.show();
    const snapshot = await getDocs(query(collection(this.fs, 'reclamations')))
    this.reclamations = snapshot.docs.map(doc => doc.data());

    this.spinner.hide();
  }

  async handleMessage() {
    this.spinner.show();
    this.isMessageVisible = true;
    this.spinner.hide();
  }
  async showDetails(reclamation: any) {
    this.spinner.show();
    this.isVisible = true;
    this.getOrderById(reclamation?.id_order)
    this.getCustomerById(reclamation?.id_client)
    const snapshot = await getDocs(query(collection(this.fs, 'reclamations'), where("id", "==", reclamation?.id)))
    this.selectedReclamation = snapshot.docs[0].data();
    this.idClient = reclamation?.id_client;
    this.idDelivery = reclamation?.id_livreurs;
    this.getCustomerById(this.idClient);
    this.getDeliveryById(this.idDelivery );
    // this.getOrderById(reclamation?.id)
    this.spinner.hide();
  }

  async getCustomerById(id: string) {
    const snapshot = await getDocs(query(collection(this.fs, 'clients'), where("id_client", "==", id)))
    this.customer = snapshot.docs[0].data();
    
  }

  async getDeliveryById(id: string) {
    const snapshot = await getDocs(query(collection(this.fs, 'livreurs'), where("id_livreur", "==", id)))
    this.delivery = snapshot.docs[0].data();
  }

  async getOrderById(id: string) {
    const snapshot = await getDocs(query(collection(this.fs, 'orders'), where("id_order", "==", id)))
    this.order = snapshot.docs[0].data();
    this.getDeliveryById(this.order?.id_livreur);
  }

  handleOk() {
    this.isVisible = false;
  }


  async handleOkMessage() {
    
    if (this.message) {

      try {
          await this.sendMail(this.customer.email,this.message);
          this.toast.info("Message envoie avec success","CONFIRMATION D'ENVOIE");
          this.isMessageVisible = false; 
      } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email', error);
      }
  } else {
      console.warn('Le message ne peut pas être vide');
  }

}
sendMail = async (email: string, message: string) => {
  try {
    this.toast.info("Message envoie avec success","CONFIRMATION D'ENVOIE");
      await emailjs.send("service_7zg3lwp","template_s5u5loq",{
        from_name: "IIBS",
        to_name: this.customer?.nom + ' ' + this.customer?.prenom,
        message: message,
        to_Email: email,
        })
     
  } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email', error);
  }
}



}