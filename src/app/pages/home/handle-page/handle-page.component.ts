import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'app-handle-page',
  templateUrl: './handle-page.component.html',
  standalone: true,
  imports: [RouterModule],
  styleUrls: ['./handle-page.component.scss']
})
export class HandlePageComponent implements OnInit{
  isLoggedIn = false;
  storedEmail: string | null = null;
  constructor(private storageService: StorageService) {}
  ngOnInit(): void {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {

      console.log("Email récupéré:", rememberedEmail);
      this.storedEmail = rememberedEmail;
      this.isLoggedIn = true; 
    }
  }

  logout() {
    this.storageService.removeItem('rememberedEmail');
    this.isLoggedIn = false; 
    this.storedEmail = null; 
  }

}
