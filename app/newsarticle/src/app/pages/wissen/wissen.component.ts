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
        url: "https://www.amazon.de/Rich-Dad-Poor-Reichen-beibringen/dp/3898798828/ref=sr_1_1?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=333KWKTTI47JU&dchild=1&keywords=rich+dad+poor+dad&qid=1618493391&sprefix=rich+dad%2Caps%2C188&sr=8-1",
        name: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        description: "Eine einfache und prägnante Darstellung, wie das richtige Mindset zu Geld aussehen sollte. Zudem liefert R. Kiyosaki eine gute Erklärung, warum Reiche reich und Arme arm bleiben.",
        level: "Anfänger"
      },
      {
        url: "https://www.amazon.de/Warren-Buffett-Seine-Methode-Strategie/dp/3864703751/ref=sr_1_2?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3BW4CK4TMOGBL&dchild=1&keywords=warren+buffett&qid=1618494381&sprefix=warren+buffet%2Caps%2C194&sr=8-2",
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
