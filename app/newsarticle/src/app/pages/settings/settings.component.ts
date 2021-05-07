import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { Company } from 'src/app/interfaces/company';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Storage} from 'src/app/interfaces/storage';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  headerText: any;
  companiesArray: any;
  username: string;
  usernameIsSaved: boolean;
  name: string;
  checked = false;
  constructor(private api: ApiService, private ls: LocalStorageServiceService, private _snackBar: MatSnackBar) {
    this.usernameIsSaved = false;
  }

  ngOnInit(): void {
    this.headerText = {
      main: 'Einstellungen',
      sub: 'Konfiguriere die App nach deinen Bedürfnissen!'
    };

    this.name = localStorage.getItem('username_benny') != null ? localStorage.getItem('username_benny') : 'Name';

    this.api.getAllCompanies().subscribe(data => {
      console.log(data);
      this.companiesArray = data;
      if (!this.ls.getItemFromLocalStorage('companyList')) {
        this.ls.setfieldToLocalStorage('companyList', JSON.stringify({data:[]}));
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
                    document.getElementById(element.companyName.replace(' ', '_'))['checked'] = true;
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
      this.openSnackBar(item.companyName, 'added to newsfeed')

    } else {
      this.ls.removeItemFromLocalStorage('companyList', item);
      this.openSnackBar(item.companyName, 'removed from newsfeed')

    }
    console.log(this.ls.getItemFromLocalStorage('companyList'));

  }

  saveName() {
    console.log(this.username);

    const currentName = localStorage.getItem('username_benny');
    if (currentName != null && currentName != undefined) {
      localStorage.removeItem('username_benny');
      this.openSnackBar('Dein Name wurde erfolgreich', 'entfernt')

    }
    if(this.username != undefined) {
      localStorage.setItem('username_benny', this.username)
      this.openSnackBar('Dein Name wurde erfolgreich', 'in ' + this.username + ' geändert')
      this.name = this.username;
    }
    this.usernameIsSaved = true;
    this.username = '';
  }

  openSnackBar(content, status) {
    this._snackBar.open(content + ' ' + status, '', {duration: 1000});
  }

}
