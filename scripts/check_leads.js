const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Since we are running locally and don't have a service account JSON handy, we can 
// check if we can authenticate via gcloud default credentials.
initializeApp();
const db = getFirestore();

async function checkLeads() {
  try {
    const snapshot = await db.collection('leads').limit(5).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (err) {
    console.error("Error fetching leads:", err.message);
  }
}
checkLeads();
