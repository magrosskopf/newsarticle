import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import {Storage} from 'src/app/interfaces/storage';
@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.sass']
})
export class NewsfeedComponent implements OnInit {
  headerText: any;
  newsArray: Array<any>;
  msg: string;

  constructor(private api: ApiService, private ls: LocalStorageServiceService) {
    this.newsArray = [];
    this.setInitialStorage();
   }

  ngOnInit(): void {
    const name = localStorage.getItem('username_benny') != null ? localStorage.getItem('username_benny') : 'Investor!';
    this.headerText = {
      main: 'Guten Morgen, ' + name,
      sub: 'Deine Daily Dose Motivation: Es ist nicht von Bedeutung, wie langsam du gehst, solange du nicht stehen bleibst.'
    };
    let array = this.ls.getItemFromLocalStorage('companyList');
    if (array.data.length === 0) {
      localStorage.removeItem('companyList');
      array = {data: [{wkn: 'TSLA', companyName: 'Tesla', altName: 'TSLA'}]};
    }

    if (array.data.length === 0) {
      this.msg = 'Du hast noch keine Unternehmen ausgewählt. Gehe dazu in den Settings-Tab';
    }

    if (array != null) {
      this.api.getNews(array).subscribe(data => {
        data.forEach(element => {
          let temp = [];
          temp = Object.values(element);
          const keys = Object.keys(element);
          console.log(temp);
          if (temp[0].length > 0) {
            temp[0].forEach(item => {
              item.key = keys[0];
              this.newsArray.push(item);
            });
          }
          this.newsArray.sort((a, b) => {
            return b.published_timestamp - a.published_timestamp;
          });
        });
        if (this.newsArray.length === 0) {
          this.msg = 'Aktuell gibt es zu deinen gewählten Unternehmen keine Neuigkeiten.';
        }
      });
    }

  }

  setInitialStorage() {
    const initialStorage = localStorage.getItem('companyList');

    if (initialStorage == null) {

      this.ls.setfieldToLocalStorage('companyList', JSON.stringify({data: []}));
    }
  }

}
