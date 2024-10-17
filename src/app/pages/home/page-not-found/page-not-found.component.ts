import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  standalone:true,
  imports:[RouterOutlet],
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

}
