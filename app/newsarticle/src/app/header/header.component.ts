import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  todayDate: number;
  @Input() headerText: any;
  constructor() {
    this.todayDate = Date.now();
   }

  ngOnInit(): void {
  }

}
