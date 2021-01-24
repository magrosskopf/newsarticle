const functions = require('firebase-functions');
const NewsAPI = require('newsapi');
const keys = require('./key.json')
const newsapi = new NewsAPI(keys.newsapikey);
var dateFormat = require('dateformat');

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

function calcDate() {
    var MS_PER_MINUTE = 60000;
    var durationInMinutes = 1500;
    var myStartDate = new Date(Date.now() - durationInMinutes * MS_PER_MINUTE)
    return  dateFormat(myStartDate, "yyyy-mm-dd'T'HH:MM:ss");
}

// exports.newsnews = functions.https.onRequest((req, res)=> {
exports.scheduledFunction = functions.pubsub.schedule('every 15 minutes').onRun((context) => {
    var day = calcDate();
    getDataFromRef('companynames').then((data)=> {
        var i = 0;
         data.forEach(doc => {
        //    newsApiCall(doc, index, day, res)
            newsapi.v2.everything({
                q: doc.data().companyName,
                sources: 'bild,der-tagesspiegel,die-zeit,focus,gruenderszene,handelsblatt,spiegel-online,t3n,wired-de,wirtschafts-woche,wired,techcrunch,the-wall-street-journal,bloomberg,business-insider',
                from: day,
                pageSize: 100,
                page: 1 // Use this to page through the results.
            }).then(response => {
                saveNews(doc.id, response.articles, day).catch(err => console.log(err))
                console.log("response" + i, response)
                i++
                throw new Error(JSON.stringify(response));
            }).catch(err => console.error);
        });
        return "ok"
    }).catch(err => console.log(err))
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

