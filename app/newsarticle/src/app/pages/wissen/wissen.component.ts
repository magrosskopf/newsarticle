import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wissen',
  templateUrl: './wissen.component.html',
  styleUrls: ['./wissen.component.sass']
})
export class WissenComponent implements OnInit {
  headerText: any;
  books: Array<any>;

  constructor() {
    this.setBooks();
  }
  setBooks() {
    this.books = [
      {
        url: "https://amzn.to/2QTg8aR",
        name: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        description: "Eine einfache und prägnante Darstellung, wie das richtige Mindset zu Geld aussehen sollte. Zudem liefert R. Kiyosaki eine gute Erklärung, warum Reiche reich und Arme arm bleiben.",
        level: "Anfänger"
      },
      {
        url: "https://amzn.to/3emKvOS",
        name: "Warren Buffet: Sein Weg. Seine Methode. Seine Strategie.",
        author: "Robert Hagstrom",
        description: "Robert Hagstrom gibt einen detaillierten Einblick in das Leben von Warren Buffett. Er zeigt nicht nur auf, dass die Methoden von Buffett funktionieren, sondern auch wie! So kann jeder in Aktien investieren wie Warren Buffett.",
        level: "Fortgeschritten"
      }
    ]
  }

  ngOnInit(): void {
    this.headerText = {
      main: 'Wissen',
      sub: 'Wir haben einige Ressourcen und Infomaterial für dich zusammengestellt um dein Aktienwissen zu erweitern.'
    };
  }

}
