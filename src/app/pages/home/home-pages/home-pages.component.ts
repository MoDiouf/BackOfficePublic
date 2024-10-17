import { Component,AfterViewInit } from '@angular/core';
import { FooterPageComponent } from '../footer-page/footer-page.component';


@Component({
  selector: 'app-home-pages',
  standalone:true,
  imports:[FooterPageComponent],
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.scss']
})
export class HomePagesComponent  {


}
