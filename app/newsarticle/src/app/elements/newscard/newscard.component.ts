import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-newscard',
  templateUrl: './newscard.component.html',
  styleUrls: ['./newscard.component.sass']
})
export class NewscardComponent implements OnInit {
  @Input() newsItem: any;
  constructor() { }

  ngOnInit(): void {
  }

}
