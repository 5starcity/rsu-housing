// lib/verification.js
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
  } from "firebase/firestore";
  import { db } from "@/lib/firebase";
  
  export async function submitVerificationRequest(uid, data) {
    await addDoc(collection(db, "verificationRequests"), {
      uid,
      name: data.name,
      phone: data.phone,
      address: data.address,
      status: "pending",
      submittedAt: serverTimestamp(),
    });
  }
  
  export async function isLandlordVerified(uid) {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return false;
    return snap.data().verified === true;
  }