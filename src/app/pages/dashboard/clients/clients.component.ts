import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  customers!: any;
  selectedCustomer!: any;
  isVisible?: boolean = false

  constructor(private fs: Firestore, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCustomers()
  }

  async getCustomers() {
    this.spinner.show();
    const snapshot = await getDocs(query(collection(this.fs, 'clients')))
    this.customers = snapshot.docs.map(doc => doc.data());
    this.spinner.hide();
  }

  async showDetails(id: string) {
    this.spinner.show();
    this.isVisible = true;
    const snapshot = await getDocs(query(collection(this.fs, 'clients'), where("id_client", "==", id)))
    this.selectedCustomer = snapshot.docs[0].data();
    this.spinner.hide();
  }

  handleOk() {
    this.isVisible = false;
  }
}
