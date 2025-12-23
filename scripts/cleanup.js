/**
 * Firestore Cleanup Script
 *
 * This script deletes documents from the 'posts' collection that are older than 24 hours.
 *
 * Prerequisites:
 * 1. Install firebase-admin: npm install firebase-admin
 * 2. Download your Service Account JSON from Firebase Console -> Project Settings -> Service Accounts.
 * 3. Set the path to your service account JSON in the SERVICE_ACCOUNT_PATH variable below.
 */

const admin = require("firebase-admin");
const path = require("path");

// --- CONFIGURATION ---
const SERVICE_ACCOUNT_PATH = "./service-account.json"; // Update this path
const COLLECTION_NAME = "posts";
const HOURS_TO_KEEP = 24;
// ---------------------

if (!SERVICE_ACCOUNT_PATH) {
  console.error("Please provide a path to your service account JSON.");
  process.exit(1);
}

try {
  const serviceAccount = require(path.resolve(SERVICE_ACCOUNT_PATH));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error("Error initializing Firebase Admin:", error.message);
  process.exit(1);
}

const db = admin.firestore();

async function deleteOldDocuments() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - HOURS_TO_KEEP * 60 * 60 * 1000);

  console.log(
    `Searching for documents in "${COLLECTION_NAME}" older than ${cutoff.toISOString()}...`
  );

  const snapshot = await db
    .collection(COLLECTION_NAME)
    .where("createdAt", "<", cutoff)
    .get();

  if (snapshot.empty) {
    console.log("No old documents found.");
    return;
  }

  console.log(`Found ${snapshot.size} documents to delete.`);

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log("Successfully deleted old documents.");
}

deleteOldDocuments().catch(console.error);
