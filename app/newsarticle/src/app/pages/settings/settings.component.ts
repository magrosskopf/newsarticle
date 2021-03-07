import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  headerText: any;
  companiesArray: any;
  username: string;
  constructor(private api: ApiService, private ls: LocalStorageServiceService) {

  }

  ngOnInit(): void {
    this.headerText = {
      main: 'Einstellungen',
      sub: 'Wähle die Unternehmen aus, über die du Informationen erhalten möchtest!'
    };
    this.api.getAllCompanies().subscribe(data => {
      console.log(data);
      this.companiesArray = data;
      if (!this.ls.getItemFromLocalStorage('companyList')) {
        this.ls.setfieldToLocalStorage('companyList', []);
      } else {
        let temp: Storage;
        temp = this.ls.getItemFromLocalStorage('companyList')
        setTimeout(()=> {
          if (temp.data !== undefined) {
            if (temp.data.length > 0) {
              temp.data.forEach(element => {
                  if (element.companyName != null) {
                    console.log(element.companyName);
                    console.log(document.getElementById(element.companyName));
                    document.getElementById(element.companyName)['checked'] = true;
                  }

              });
            }
          }
        }, 200);
      }
    });
  }

  ngAfterViewInit(): void {

  }

  toggleCompany(e, item: Company, ): void {
    if (e.target.checked) {
      this.ls.setItemToLocalStorage('companyList', item);
    } else {
      this.ls.removeItemFromLocalStorage('companyList', item);
    }
    console.log(this.ls.getItemFromLocalStorage('companyList'));

  }

  saveName() {
    console.log(this.username);

    const currentName = localStorage.getItem('username_benny');
    if (currentName != null && currentName != undefined) {
      localStorage.removeItem('username_benny');
    }
    if(this.username != undefined) {
      localStorage.setItem('username_benny', this.username)
    }
  }

}
