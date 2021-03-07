import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import {LocalStorageServiceService} from './local-storage-service.service';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getNewsUrl: string;
  getAllCompaniesUrl: string;

  constructor(private http: HttpClient, private ls : LocalStorageServiceService) {
    this.getNewsUrl = 'https://us-central1-news-article-db373.cloudfunctions.net/getNews?companyList=';
    this.getAllCompaniesUrl = 'https://us-central1-news-article-db373.cloudfunctions.net/getCompanies';
  }

  getNews(companyList: Storage): Observable<any> {
    console.log(companyList);

    if (companyList.data != undefined ) {
      if (companyList.data.length > 0) {
        companyList.data.forEach((comp, index) => {
          let company: Company;
          company = comp;
          this.getNewsUrl += company.companyName;
          if (index !== companyList.data.length - 1 && companyList.data.length != 1) {
            this.getNewsUrl += ',';
          }
        });
      }
    }
    console.log(this.getNewsUrl);

    return this.http.get(this.getNewsUrl);
  }

  getAllCompanies(): Observable<any> {
    return this.http.get(this.getAllCompaniesUrl);
  }
}

