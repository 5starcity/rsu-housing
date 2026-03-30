// lib/auth.js
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
  } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import { auth, db } from "./firebase";
  
  // SIGNUP
  export async function signUp(email, password, name, role) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    // Save display name
    await updateProfile(user, { displayName: name });
  
    // Save user role to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      role, // "student" or "landlord"
      createdAt: new Date().toISOString(),
      verified: false
    });
  
    return user;
  }
  
  // LOGIN
  export async function logIn(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
  
  // LOGOUT
  export async function logOut() {
    await signOut(auth);
  }