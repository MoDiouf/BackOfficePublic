import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getCountFromServer, onSnapshot, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {

  customersNumber?: number = 0;
  deliveriesNumber?: number = 0;
  reclamationsNumber?: number = 0;
  ordersNumber?: number = 0;
  ClosedOrdersNumber?: number = 0
  supportedOrdersNumber?: number = 0
  inProgressOrdersNumber?: number = 0
  receivedOrdersNumber?: number = 0


  constructor(private fs: Firestore) { }

  ngOnInit(): void {
    this.getOrdersNumber();
    this.getCustomersNumber();
    this.getDeliveriesNumber();
    this.getClosedOrdersNumber();
    this.getReclamationsNumber();
  }


  async getCustomersNumber() {
    const q = collection(this.fs, "clients");
    onSnapshot(q, async () => {
      const snapshot = await getCountFromServer(q);
      this.customersNumber = snapshot.data().count;
    });
  }

  async getDeliveriesNumber() {
    const q = collection(this.fs, "livreurs");
    onSnapshot(q, async () => {
      const snapshot = await getCountFromServer(q);
      this.deliveriesNumber = snapshot.data().count;
    });
  }

  async getOrdersNumber() {
    const q = collection(this.fs, "orders");
    onSnapshot(q, async () => {
      const snapshot = await getCountFromServer(q);
      this.ordersNumber = snapshot.data().count;
    });
  }

  async getClosedOrdersNumber() {
    const q = query(collection(this.fs, "orders"), where("statut", "==", "Livrer"));
    onSnapshot(q, async () => {
      const snapshot = await getCountFromServer(q);
      this.ClosedOrdersNumber = snapshot.data().count;
    });
  }

  async getSupportedOrdersNumber() {
    const q = query(collection(this.fs, "orders"), where("statut", "==", "Prise_En_Charge"));
    onSnapshot(q, async () => {
      const snapshot = await getCountFromServer(q);
      this.supportedOrdersNumber = snapshot.data().count;
    });
  }

  async getInProgressOrdersNumber() {
    const q = query(collection(this.fs, "orders"), where("statut", "==", "En_cours"));
    onSnapshot(q, async () => {
      const snapshot = await getCountFromServer(q);
      this.inProgressOrdersNumber = snapshot.data().count;
    });
  }

  async getReceivedOrdersNumber() {
    const q = query(collection(this.fs, "orders"), where("statut", "==", "Colis_Recu"));
    onSnapshot(q, async () => {
      const snapshot = await getCountFromServer(q);
      this.receivedOrdersNumber = snapshot.data().count;
    });
  }

  async getReclamationsNumber() {
    const q = collection(this.fs, "reclamations");
    onSnapshot(q, async () => {
      const snapshot = await getCountFromServer(q);
      this.reclamationsNumber = snapshot.data().count;
    });
  }

}
