import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.sass']
})
export class NewsfeedComponent implements OnInit {

  testArray = [
    {
      author: 'Max Musterman',
      headline: 'Elon Musk startet CO2-Wettbewerb',
      content: 'Der SpaceX-Eigentümer sucht nach einer neuen Methode, Kohlenstoff abzuscheiden. Das Preisgeld ist das bisher höchste, das dafür ausgelobt wurde.',
      url: 'google.de'
    },
    {
      author: 'Max Musterman',
      headline: 'Elon Musk startet CO2-Wettbewerb',
      content: 'Der SpaceX-Eigentümer sucht nach einer neuen Methode, Kohlenstoff abzuscheiden. Das Preisgeld ist das bisher höchste, das dafür ausgelobt wurde.',
      url: 'google.de'
    },
    {
      author: 'Max Musterman',
      headline: 'Elon Musk startet CO2-Wettbewerb',
      content: 'Der SpaceX-Eigentümer sucht nach einer neuen Methode, Kohlenstoff abzuscheiden. Das Preisgeld ist das bisher höchste, das dafür ausgelobt wurde.',
      url: 'google.de'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
