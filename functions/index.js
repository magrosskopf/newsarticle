const functions = require('firebase-functions');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('d615e92c5a834914b570a3b52be2109e');
const schedule = require('node-schedule');
var dateFormat = require('dateformat');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getNewsArticle = functions.https.onRequest((request, response) => {

});

schedule.scheduleJob({hour: 00, minute: 00}, () => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
    var day = dateFormat(new Date(), "yyyy-mm-dd");
    newsapi.v2.everything({
      q: 'nikola',
      sources: 'bild,der-tagesspiegel,die-zeit,focus,gruenderszene,handelsblatt,spiegel-online,t3n,wired-de,wirtschafts-woche,wired,techcrunch,the-wall-street-journal,bloomberg,business-insider',
      from: day,
      page: 2
    }).then(response => {
      console.log(response.articles.length);
      run(response.articles, "news").catch(console.dir)
      
    });
  })
