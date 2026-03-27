const functions = require('firebase-functions');
const axios = require('axios');
const admin = require('firebase-admin');
admin.initializeApp();

exports.fetchNews = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async () => {
    const res = await axios.get(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY'
    );

    const db = admin.firestore();
    const batch = db.batch();

    res.data.articles.forEach(article => {
      const ref = db.collection('posts').doc();
      batch.set(ref, {
        title: article.title,
        description: article.description,
        imageUrl: article.urlToImage,
        url: article.url,
        createdAt: Date.now()
      });
    });

    await batch.commit();
  });