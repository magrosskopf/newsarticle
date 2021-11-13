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
        url: 'https://amzn.to/2QTg8aR',
        img: '//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=3898798828&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=financebenny-21',
        name: 'Rich Dad Poor Dad',
        author: 'Robert T. Kiyosaki',
        description: 'Eine einfache und prägnante Darstellung, wie das richtige Mindset zu Geld aussehen sollte. Zudem liefert R. Kiyosaki eine gute Erklärung, warum Reiche reich und Arme arm bleiben.',
        level: 'Anfänger'
      },
      {
        url: 'https://amzn.to/3emKvOS',
        name: 'Warren Buffet: Sein Weg. Seine Methode. Seine Strategie.',
        img: '//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=3864703751&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=financebenny-21',
        author: 'Robert Hagstrom',
        description: 'Robert Hagstrom gibt einen detaillierten Einblick in das Leben von Warren Buffett. Er zeigt nicht nur auf, dass die Methoden von Buffett funktionieren, sondern auch wie! So kann jeder in Aktien investieren wie Warren Buffett.',
        level: 'Fortgeschritten'
      },
      {
        url: 'https://amzn.to/3f6UvMu',
        name: 'Think and Grow Rich - Deutsche Ausgabe',
        img: '//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=3959721714&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=financebenny-21',
        author: 'Napoleon Hill',
        description: 'Ein Bücher über das Nachdenken. Napoleon Hill erklärt, wie man mit der richtige Denkweise sein Vermögen vergrößern kann und Geld förmlich anzieht. Wie immer beginnt Erfolg eben im Kopf.',
        level: 'Anfänger'
      },
      {
        url: 'https://amzn.to/3uKEWRv',
        name: 'You are a badass at making money',
        img: '//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=0735222975&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=financebenny-21',
        author: 'Jen Sincero',
        description: 'You Are a Badass at Making Money wird Sie über die Ängste und Stolpersteine hinwegbringen, die den finanziellen Erfolg für Sie unerreichbar gemacht haben. Jen Sincero schöpft aus ihrer eigenen Verwandlung - in nur wenigen Jahren - von einer Frau, die in einer umgebauten Garage lebte und deren Bankkonto von Unkraut durchwühlt wurde, zu einer Frau, die mit Stil die Welt bereist, und kanalisiert die unnachahmliche Frechheit und Sachlichkeit, die You Are a Badass zu einem unbezwingbaren Bestseller machte. Sie kombiniert urkomische persönliche Essays mit mundgerechten Aha-Konzepten, die das Verdienstpotenzial freisetzen und zu echten Ergebnissen führen.',
        level: 'Anfänger'
      }
    ];
  }

  ngOnInit(): void {
    this.headerText = {
      main: 'Wissen',
      sub: 'Wir haben einige Ressourcen und Infomaterial für dich zusammengestellt um dein Aktienwissen zu erweitern.'
    };
  }

}
