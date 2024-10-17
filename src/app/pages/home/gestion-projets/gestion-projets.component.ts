import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterPageComponent } from '../footer-page/footer-page.component';

@Component({
  selector: 'app-gestion-projets',
  standalone: true,
  imports: [RouterModule, CommonModule,FooterPageComponent],
  templateUrl: './gestion-projets.component.html',
  styleUrls: ['./gestion-projets.component.scss']
})
export class GestionProjetsComponent {
  ngOnInit(): void {}
  @ViewChild('DisplayEmploi', { static: true }) DisplayEmploi!: TemplateRef<any>;
  DisplayStart: boolean = true;
  // ...
  DisplayForm: boolean = false
  // ...
  DisplayBulletin: boolean = false;
  // ...
  DisplayNote: boolean = false;
  //...
  DisplayProfil: boolean = false;
  //...
  //DisplayEmploi: boolean = true;
  //...
  DisplayPayement: boolean = false;
  //...
  DisplayAbsence: boolean = false;
  //...
  DisplayReclation: boolean = false;
  //...
  DisplaySupport: boolean = false;
  DisplayCloturer: boolean = false;
 
  //...
  noteImg = "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTE2Ni1wLWwxZGJ1cTN2LnBuZw.png";
  bulletinImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7Ruc3aDfDuCbY_FFQ-23U1on7qndeh-dNw&s';
  payementImg = 'https://cdn.pixabay.com/photo/2017/09/01/00/15/png-2702691_640.png';
  absenceImg = 'https://img.freepik.com/premium-psd/color-wing-png-isolated-transparent-background_1034016-9965.jpg';
  reclationImg = 'https://w7.pngwing.com/...';
  supportImg = 'https://images.creativefabrica.com/...';
  profilImg = 'https://cdn.pixabay.com/...';
  defaultImg = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp';
  DisplayOrHiddenBulletin(): void {
    this.DisplayBulletin = !this.DisplayBulletin;
    this.DisplayStart = false;
    this.DisplayNote = false;
    //this.DisplayEmploi = false;
    this.DisplayPayement = false;
    this.DisplayAbsence = false;
    this.DisplayReclation = false;
    this.DisplaySupport = false;
    this.DisplayProfil = false;

  }

 
  DisplayOrHiddenNote():void{
    this.DisplayNote = !this.DisplayNote;
    this.DisplayStart = false;
    this.DisplayBulletin = false;
   // this.DisplayEmploi = false;
    this.DisplayPayement = false;
    this.DisplayAbsence = false;
    this.DisplayReclation = false;
    this.DisplaySupport = false;
    this.DisplayProfil = false;
    this.DisplayForm = false
  }
  DisplayOrHiddenSupports():void{
    this.DisplayCloturer = !this.DisplayCloturer;
    this.DisplayStart = false;
    this.DisplayBulletin = false;
    this.DisplayNote = false;
    this.DisplaySupport =false;
  //  this.DisplayEmploi = false;
    this.DisplayAbsence = false;
    this.DisplayReclation = false;
    this.DisplayPayement = false;
    this.DisplayProfil = false;
    this.DisplayForm = false
  }
  DisplayOrHiddenEmploi():void{
   // this.DisplayEmploi = !this.DisplayEmploi;
   this.DisplayStart = false;
    this.DisplayBulletin = false;
    this.DisplayNote = false;
    this.DisplayPayement = false;
    this.DisplayAbsence = false;
    this.DisplayReclation = false;
    this.DisplaySupport = false;
    this.DisplayProfil = false;
    this.DisplayForm = false
  }
  DisplayOrHiddenForm():void{
    this.DisplayForm = !this.DisplayForm;
    this.DisplayStart = false;
    this.DisplayPayement = false;
    this.DisplayBulletin = false;
    this.DisplayNote = false;
   // this.DisplayEmploi = false;
    this.DisplayAbsence = false;
    this.DisplayReclation = false;
    this.DisplaySupport = false;
    this.DisplayProfil = false;
    if (this.DisplayForm === false) {
      this.DisplayStart = true;
    }
  
  }
  DisplayOrHiddenPayement():void{
    this.DisplayPayement = !this.DisplayPayement;
    this.DisplayStart = false;
    this.DisplayBulletin = false;
    this.DisplayNote = false;
   // this.DisplayEmploi = false;
    this.DisplayAbsence = false;
    this.DisplayReclation = false;
    this.DisplaySupport = false;
    this.DisplayProfil = false;
    this.DisplayForm = false
  }
  DisplayOrHiddenAbsence():void{
    this.DisplayAbsence = !this.DisplayAbsence
    this.DisplayStart = false;
    this.DisplayBulletin = false;
    this.DisplayNote = false;
    //this.DisplayEmploi = false;
    this.DisplayReclation = false;
    this.DisplaySupport = false;
    this.DisplayPayement = false;
    this.DisplayProfil = false;
    this.DisplayForm = false
    if (this.DisplayAbsence === false) {
      this.DisplayStart = true;
    }
  }
  DisplayOrHiddenReclation():void{
    this.DisplayReclation = !this.DisplayReclation
    this.DisplayStart = false;
    this.DisplayBulletin = false;
    this.DisplayNote = false;
    //this.DisplayEmploi = false;
    this.DisplaySupport = false;
    this.DisplayAbsence = false;
    this.DisplayPayement = false;
    this.DisplayProfil = false;
    this.DisplayForm = false
    if (this.DisplayReclation === false) {
      this.DisplayStart = true;
    }
  }
  DisplayOrHiddenSupport():void{
    this.DisplaySupport = !this.DisplaySupport;
    this.DisplayStart = false;
    this.DisplayBulletin = false;
    this.DisplayNote = false;
    this.DisplayCloturer = false;
  //  this.DisplayEmploi = false;
    this.DisplayAbsence = false;
    this.DisplayReclation = false;
    this.DisplayPayement = false;
    this.DisplayProfil = false;
    this.DisplayForm = false
    if (this.DisplaySupport === false) {
      this.DisplayStart = true;
    }
  }
  DisplayOrHiddenProfil():void{
    this.DisplayProfil = !this.DisplayProfil
    this.DisplayStart = false;
    this.DisplaySupport = false;
    this.DisplayBulletin = false;
    this.DisplayNote = false;
   // this.DisplayEmploi = false;
    this.DisplayAbsence = false;
    this.DisplayReclation = false;
    this.DisplayPayement = false;
    this.DisplayForm = false

  }
  // public onOpenModals( mode: string): void{
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
  //   if (mode === 'bulletinDisplay') {
  //     button.setAttribute('data-target', '#BulletinDisplayModal');
  //   }
  //   if (mode === 'noteDisplay') {
  //     button.setAttribute('data-target', '#NoteDisplayModal');
  //   }
  //   container?.appendChild(button);
  //   button.click()  ;
  // }
}
