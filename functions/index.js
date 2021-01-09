const functions = require('firebase-functions');
const NewsAPI = require('newsapi');
const keys = require('./key.json')
const newsapi = new NewsAPI(keys.newsapikey);
var dateFormat = require('dateformat');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.news = functions.https.onRequest((req, res) => {
        res.send("Hello from Firebase!");
        var day = dateFormat(new Date(), "yyyy-mm-dd");
        return newsapi.v2.everything({
          q: 'nikola',
          sources: 'bild,der-tagesspiegel,die-zeit,focus,gruenderszene,handelsblatt,spiegel-online,t3n,wired-de,wirtschafts-woche,wired,techcrunch,the-wall-street-journal,bloomberg,business-insider',
          from: day,
          page: 2
        }).then(response => {
          console.log(response);
          //run(response.articles, "news").catch(console.dir)
          return null;
        });
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

