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

exports.getCompanyNames = functions.https.onRequest((req, res)=> {
    const companiesRef = db.collection('companynames');
    // eslint-disable-next-line no-use-before-definegit 
    let snapshot = companiesRef.get(); // eslint-disable-line
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
})


exports.news = functions.https.onRequest((req, res) => {
    var day = dateFormat(new Date(), "yyyy-mm-dd");

    const companiesRef = db.collection('companynames');
    // eslint-disable-next-line no-use-before-define
    let snapshot = companiesRef.get(); // eslint-disable-line
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      
        return newsapi.v2.everything({
            q: 'encavis',
            sources: 'bild,der-tagesspiegel,die-zeit,focus,gruenderszene,handelsblatt,spiegel-online,t3n,wired-de,wirtschafts-woche,wired,techcrunch,the-wall-street-journal,bloomberg,business-insider',
            from: day,
            page: 2 // TODO: wofür ist das?
        }).then(response => {
            console.log(response);
            res.send(response.articles);
            //run(response.articles, "news").catch(console.dir)
            return null;
        });
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

// exports.scheduledFunction = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
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

