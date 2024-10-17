import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, or, query, where } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  orders!: any[];
  delivery?: any;
  customer?: any;
  selectedOrder?: any;
  isVisible?: boolean = false;
  isSecondVisible?: boolean = false;
  noTakes: any[] = [];
  newDeliverie: string = '';
  ordersToDelivery: any[] = [];
  orderId: string = '';
  deliveries!: any;
  NoTake: any[] = [];
  constructor(private fs: Firestore, private spinner: NgxSpinnerService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getOrders();
    this.getDeliveries();
  }

  async handleUpdateDelivery(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.newDeliverie = selectElement.value;
    this.ordersToDelivery = await this.getOrders();
  }
  async getDeliveries() {
    this.spinner.show();
    const snapshot = await getDocs(query(collection(this.fs, 'livreurs')));
    this.deliveries = snapshot.docs.map((doc) => doc.data());
    
    
    for (const deliverie of this.deliveries) {
      if (deliverie.isActive == true) {
        this.noTakes.push(deliverie.id_livreur);
      }
    }
    this.sharedService.noTake = this.NoTake;


    this.spinner.hide();
  }

  sendDeliverie = async () => {
    this.spinner.show();
    console.log(this.newDeliverie);
    
    try {
      const snapshot = await getDocs(query(collection(this.fs, 'orders')));
      this.orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      for (let order of this.orders) {
        if (order.id_order === this.orderId) {
          order.id_livreur = [this.newDeliverie];
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
    } finally {
      this.isSecondVisible = false;
      this.spinner.hide();
    }
  }


  async getOrders(): Promise<any[]> {
    this.spinner.show();
    const snapshot = await getDocs(query(collection(this.fs, 'orders')));
    this.orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    this.noTakes = this.sharedService.noTake;
    this.spinner.hide();
    return this.orders;
  }



  async showDetails(order: any) {
    this.spinner.show();
    this.isVisible = true;
    this.getDeliveryById(order?.id_livreur[0]);
    this.getCustomerById(order?.id_client);
    const snapshot = await getDocs(query(collection(this.fs, 'orders'), where("id_order", "==", order?.id_order)))
    this.selectedOrder = snapshot.docs[0].data();
    this.orderId = this.selectedOrder.id_order
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

  handleOk() {
    this.isVisible = false;
  }
  handleUpdate() {
    this.isSecondVisible = true;
  }

}