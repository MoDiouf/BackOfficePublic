import { Component, OnInit } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;

  constructor(private router: Router, private toast: ToastrService) { }

  ngOnInit(): void { }

  onCustomers() {
    this.router.navigate(["dashboard/clients"])
  }
  onDeliveries() {
    this.router.navigate(["dashboard/livreurs"])
  }
  onOrders() {
    this.router.navigate(["dashboard/commandes"])
  }
  onReclamations() {
    this.router.navigate(["dashboard/reclamations"])
  }
  onReports() {
    this.router.navigate(["dashboard"])
  }

  onLogout() {
    const confirMsg = confirm("Voulez-vous quitter ?")
    if (confirMsg) {
      console.log("confrimer#")
      const auth = getAuth();
      signOut(auth).then(() => {
        this.router.navigate(["/login"])
      }).catch((error) => {
        this.toast.info(error, "DECOONEXION")
      });
    } else {
      console.log("not confrimer#")
    }
  }
}
