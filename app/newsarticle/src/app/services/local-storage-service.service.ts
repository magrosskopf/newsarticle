import { Injectable } from '@angular/core';
import {Storage} from 'src/app/interfaces/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }

  getItemFromLocalStorage(field: string): Storage {
    console.log('getItemFromLocalStorage',localStorage.getItem(field));

    const item = JSON.parse(localStorage.getItem(field));

    return item;
  }

  setfieldToLocalStorage(field: string, item: string) {
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
    this.setfieldToLocalStorage(field, JSON.stringify(storage));
  }

}
