const functions = require('firebase-functions');
const NewsAPI = require('newsapi');
const keys = require('./key.json')
const axios = require('axios');

const newsapi = new NewsAPI(keys.newsapikey);
var dateFormat = require('dateformat');
const request = require('request');
const cors = require('cors')
const corsHandler = cors({
  origin: [
    'http://localhost:4200',
    'http://localhost:4200/',
    'https://news-article-db373.web.app'
    // Staging URL
    // PROD URL
  ],
})

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore(); 
const companyNamesCollection = db.collection('companynames');

exports.getNews = functions.https.onRequest(async (req, res)=> {
    corsHandler(req, res, async () => {
        let companyList = req.query.companyList.split(",");
        const now = new Date();
        let nowTS = admin.firestore.Timestamp.fromDate(now);
        let resNews = [];
        /* eslint-disable no-await-in-loop */
        for (let c of companyList) {
            const companyNews = await admin.firestore().collection('news').doc(c).listCollections();
            const collectionIds = []
            companyNews.map(col => {
            // console.log("compare", Math.abs(new Date(col.id) - new Date(now.toISOString()))/1000/60/60/24)
                if(Math.abs(new Date(col.id) - new Date(now.toISOString()))/1000/60/60/24 <= 2) {
                    collectionIds.push(col.id)
                    return col.id
                } 
            });

            let temp = { [c]: []}
            for(let id of collectionIds) {
                let entry = await admin.firestore().collection('news').doc(c).collection(id).get()
                entry = entry.docs;
                for(el of entry) {
                    temp[c].push(el.data())
                }
            }
            resNews.push(temp)
        // for(let item of collectionIds) {}
        }
        /* eslint-enable no-await-in-loop */


        // for(let com of companyNews.docs){
        //     console.log("data", com.data());
        //     if (companyList.indexOf(com.id) > -1) {
        //         resNews.push(com.data()) 
        //     }
        // }
    
        res.send(resNews)
    });
})

exports.fetchNews = functions.pubsub.schedule('every 1 hours').onRun(async (context) => {
// exports.fetchTheNews = functions.https.onRequest(async (req, res)=> {

    const companyNameSnap = await admin.firestore().collection('companynames').get();
    const companyDocs = companyNameSnap.docs;


    const now = new Date();
    const before = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const day1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const day2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    day1.setDate(today.getDate() - 1);
    day2.setDate(today.getDate());

    before.setMinutes( before.getMinutes() - 60 );
    

    let nowTS = admin.firestore.Timestamp.fromDate(now);
    let beforeTS = admin.firestore.Timestamp.fromDate(before);
    nowTS = nowTS.toMillis();
    beforeTS = beforeTS.toMillis();

    const date1Str = day1.toISOString().split('T')[0];
    console.log(date1Str, day1);
    const date2Str = day2.toISOString().split('T')[0];
    const api_key = keys.altApiKey;
    
    for(const com of companyDocs) {
        const batch = admin.firestore().batch();
        //url to fetch news
        const link = `https://gnewsapi.net/api/search?q=${com.data()['companyName']}&country=us&language=en&from=${date1Str}&to=${date2Str}&api_token=${api_key}`;
      
        // eslint-disable-next-line no-await-in-loop
        const response = await axios.get(link);
        // handle success
        const articles = response.data.articles;

        //filter new by published_timestamp
        const toWrite = [];
        for (const el of articles) {
            if(el.published_timestamp*1000 > beforeTS && el.published_timestamp*1000 <= nowTS) {
             
                toWrite.push(el);
            }
        }
        const newDoc = admin.firestore().collection('news').doc(`${com.data()['companyName']}`).collection(now.toISOString());
        for(const el of toWrite) {
            const news = newDoc.doc();
            batch.set(news, el);
        }
        // eslint-disable-next-line no-await-in-loop
        await batch.commit();
    }

});

exports.getCompanies = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        const companyNameSnap = await admin.firestore().collection('companynames').get();
        const companyDocs = companyNameSnap.docs;
        let temp = [];
        for(const com of companyDocs) {
            temp.push(com.data())
        }

        res.send(temp);
    });
});

exports.addCompany = functions.https.onRequest((req, res) => {
    let companyName = req.query.companyName;
    companyNamesCollection.doc(companyName).set({
        'companyName': companyName,
        'wkn': req.query.wkn,
        'altName': req.query.altName
      });

      res.sendStatus(200);
});


