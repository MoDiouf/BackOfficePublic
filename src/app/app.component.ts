import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isCollapsed = false;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
