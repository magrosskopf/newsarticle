const functions = require('firebase-functions');
const NewsAPI = require('newsapi');
const keys = require('./key.json')
const axios = require('axios');

const newsapi = new NewsAPI(keys.newsapikey);
var dateFormat = require('dateformat');
const request = require('request');


const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const companyNamesCollection = db.collection('companynames');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// 12.01.2020: TODO => companyNames von Firestore abrufen und NewsApi Query befüllen

exports.getNews = functions.https.onRequest((req, res)=> {
    getNewsFromDatabase().then(() =>  {
        return res.send('ok')
        
    }).catch(er => {
        console.error(er);
    });
   
})

exports.fetchNews = functions.pubsub.schedule('every 1 hours').onRun(async (context) => {
// exports.fetchTheNews = functions.https.onRequest(async (req, res)=> {

    const companyNameSnap = await admin.firestore().collection('companynames').get();
    const companyDocs = companyNameSnap.docs;

    console.log("CompanyDocs Lenght: ", companyDocs.length)

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
    const date2Str = day2.toISOString().split('T')[0];
    const api_key = 'EsFA307yqQq1fCYB7J8UiB632siH1CAn8XKteRRdkxcA5we0veyTxmYDFonL';
    
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
                console.log('drin dat ding');
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

async function getNewsFromDatabase(companyArray) {
    const companiesRef = db.collection('news');
    let snapshot = await companiesRef.get(); 
    let sortedArray = []
    snapshot.forEach(el => {
        console.log("snapshot", el.data())
    })
    return sortedArray;
}

async function getDataFromRef(refName) {
    const companiesRef = db.collection(refName);
    let snapshot = await companiesRef.get(); 
    return snapshot;

}

async function saveNews(companyName, content, time) {
    const aTuringRef = db.collection('news').doc(companyName).collection(time).doc();
    if (content.length > 0) {
        aTuringRef.set({
            "time": time,
            "content": content
        });
    }
       
    

}

async function newsApiCall(doc, index, day, res ) {
    await newsapi.v2.everything({
        q: doc.data().companyName,
        sources: 'bild,der-tagesspiegel,die-zeit,focus,gruenderszene,handelsblatt,spiegel-online,t3n,wired-de,wirtschafts-woche,wired,techcrunch,the-wall-street-journal,bloomberg,business-insider',
        from: day,
        pageSize: 100,
        page: 1 // Use this to page through the results.
    }).then(response => {
        saveNews(doc.id, {content: ["asdf", "asdf"]}, day).catch(err => console.log(err))
        console.log("response" + index, response)
        throw new Error(JSON.stringify(response));
    }).catch(err => console.error(err));
}

async function apiCallAlternative(day, copmany) {
    var options = {
        'method': 'GET',
        'url': 'https://gnewsapi.net/api/search?q=' + copmany + '&country=de&language=de&from=' + day + '&api_token='+ keys.altApiKey,
        'headers': {
        }
    };
    await request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });

}

function calcDate() {
    var MS_PER_MINUTE = 60000;
    var durationInMinutes = 1500;
    var myStartDate = new Date(Date.now() - durationInMinutes * MS_PER_MINUTE)
    return  dateFormat(myStartDate, "yyyy-mm-dd'T'HH:MM:ss");
}

exports.newsnews = functions.https.onRequest((req, res)=> {
// exports.scheduledFunction = functions.pubsub.schedule('every 15 minutes').onRun((context) => {
    var day = calcDate();
//     getDataFromRef('companynames').then((data)=> {
       
//   });

    var compnies = [
        "Tesla",
        "Apple",
        "Facebook"
    ]

    compnies.forEach(doc => {
        apiCallAlternative(day, doc)
    })


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

// exports.scheduledFunction = functions.pubsub.schedule('every 15 minutes').onRun((context) => {
//     functions.logger.info("Hello logs!", {structuredData: true});
//     response.send("Hello from Firebase!");
//     var day = dateFormat(new Date(), "yyyy-mm-dd");
//     return newsapi.v2.everything({
//       q: 'nikola',
//       sources: 'bild,der-tagesspiegel,die-zeit,focus,gruenderszene,handelsblatt,spiegel-online,t3n,wired-de,wirtschafts-woche,wired,techcrunch,the-wall-street-journal,bloomberg,business-insider',
//       from: day,
//       page: 2
//     }).then(response => {
//       console.log(response);
//       //run(response.articles, "news").catch(console.dir)
//       return null;
//     });
// });

