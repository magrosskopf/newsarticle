import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }

  getItemFromLocalStorage(field: string): Storage {
    const item = JSON.parse(localStorage.getItem(field));
    console.log('getItemFromLocalStorage',item);

    return item;
  }

  setfieldToLocalStorage(field: string, item: any) {
    localStorage.setItem(field, item);
  }

  setItemToLocalStorage(field: string, item: any) {
    let storage: Storage;
    storage = this.getItemFromLocalStorage(field);
    if (storage.data !== undefined) {
      if (storage.data.indexOf(item) === -1) {
        storage.data.push(item);
        localStorage.removeItem(field);
        this.setfieldToLocalStorage(field, JSON.stringify(storage));
        console.log(localStorage.getItem('companyList'));

      }
    }
  }

  removeItemFromLocalStorage(field: string, item: any) {
    let storage: Storage;
    storage = this.getItemFromLocalStorage(field);
    storage.data.forEach(element => {
      if (storage.data.indexOf(item)) {
        storage.data.splice(storage.data.indexOf(item), 1);
      }
    });
    localStorage.removeItem(field);
    this.setfieldToLocalStorage(field, JSON.stringify({storage}));
  }

}
