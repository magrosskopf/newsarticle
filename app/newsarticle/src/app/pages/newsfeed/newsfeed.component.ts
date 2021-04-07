import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.sass']
})
export class NewsfeedComponent implements OnInit {
  headerText: any;
  newsArray: Array<any>;

  constructor(private api: ApiService, private ls: LocalStorageServiceService) {
    this.newsArray = [];
    this.setInitialStorage();
   }

  ngOnInit(): void {
    let name = localStorage.getItem('username_benny') != null? localStorage.getItem('username_benny'): "Investor!";
    this.headerText = {
      main: 'Guten Morgen, ' + name,
      sub: 'Deine Daily Dose Motivation: Es ist nicht von Bedeutung, wie langsam du gehst, solange du nicht stehen bleibst.'
    };
    let array = this.ls.getItemFromLocalStorage('companyList');
    if (array != null) {
      this.api.getNews(array).subscribe(data => {
        data.forEach(element => {
          let temp = [];
          temp = Object.values(element);
          let keys = Object.keys(element);
          console.log(temp);
          if (temp[0].length > 0) {
            temp[0].forEach(item => {
              item.key = keys[0]
              this.newsArray.push(item);
            });
          }
          this.newsArray.sort((a, b) => {
            return b.published_timestamp - a.published_timestamp;
          });
        });

      });
    }

  }

  setInitialStorage() {
    const initialStorage = localStorage.getItem('companyList');
    if (initialStorage == null) {
      this.ls.setfieldToLocalStorage("companyList", JSON.stringify({data: []}))
    }
  }

}
