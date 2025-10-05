// FILE: src/firebase.js
// NOTE: This file intentionally uses the same Firebase CDN ESM links you provided.
// If you prefer to install the firebase npm package, replace these imports with
// `import { initializeApp } from 'firebase/app'` etc and install firebase.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getDatabase,
  ref as dbRef,
  push as dbPush,
  onChildAdded as dbOnChildAdded,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsx5E-UoF069Jog5jaZgRHWfObk1NUZIQg",
  authDomain: "chat-box-d3abf.firebaseapp.com",
  databaseURL: "https://chat-box-d3abf-default-rtdb.firebaseio.com",
  projectId: "chat-box-d3abf",
  storageBucket: "chat-box-d3abf.appspot.com",
  messagingSenderId: "23891153815",
  appId: "1:23891153815:web:314cf9642fd6d7b652ead2",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = dbRef(db, "messages");

export { db, messagesRef, dbPush, dbOnChildAdded };
