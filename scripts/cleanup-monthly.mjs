import { initAdmin } from "./firebaseAdmin.mjs";
import { getFirestore } from "firebase-admin/firestore";

initAdmin();

const db = getFirestore();
const pageSize = Number(process.env.PAGE_SIZE || 400);
const preserveIds = (process.env.PRESERVE_ROOM_IDS || "")
  .split(",")
  .map(id => id.trim())
  .filter(Boolean);

const preserveSet = new Set(["general", ...preserveIds]);

const deleteBatch = async query => {
  const snapshot = await query.get();
  if (snapshot.empty) {
    return 0;
  }

  const batch = db.batch();
  snapshot.docs.forEach(docSnap => batch.delete(docSnap.ref));
  await batch.commit();
  return snapshot.size;
};

const deleteCollection = async collectionRef => {
  let deletedTotal = 0;
  while (true) {
    const deleted = await deleteBatch(collectionRef.limit(pageSize));
    deletedTotal += deleted;
    if (deleted < pageSize) {
      break;
    }
  }
  return deletedTotal;
};

const trimRoomMessages = async roomId => {
  const messagesRef = db.collection("rooms").doc(roomId).collection("messages");
  const keepSnapshot = await messagesRef
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();

  if (keepSnapshot.empty) {
    return 0;
  }

  const lastKept = keepSnapshot.docs[keepSnapshot.docs.length - 1];
  let deletedTotal = 0;

  while (true) {
    const snapshot = await messagesRef
      .orderBy("createdAt", "desc")
      .startAfter(lastKept)
      .limit(pageSize)
      .get();

    if (snapshot.empty) {
      break;
    }

    const batch = db.batch();
    snapshot.docs.forEach(docSnap => batch.delete(docSnap.ref));
    await batch.commit();
    deletedTotal += snapshot.size;

    if (snapshot.size < pageSize) {
      break;
    }
  }

  return deletedTotal;
};

const cleanup = async () => {
  const roomsSnapshot = await db.collection("rooms").get();
  let deletedRooms = 0;
  let deletedMessages = 0;

  for (const roomDoc of roomsSnapshot.docs) {
    const roomId = roomDoc.id;

    if (preserveSet.has(roomId)) {
      deletedMessages += await trimRoomMessages(roomId);
      continue;
    }

    const messagesRef = db
      .collection("rooms")
      .doc(roomId)
      .collection("messages");
    deletedMessages += await deleteCollection(messagesRef);
    await roomDoc.ref.delete();
    deletedRooms += 1;
  }

  console.log(
    `Cleanup complete. Deleted rooms: ${deletedRooms}. Deleted messages: ${deletedMessages}.`,
  );
};

cleanup().catch(error => {
  console.error("Cleanup failed:", error);
  process.exitCode = 1;
});
