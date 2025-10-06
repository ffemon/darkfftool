// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {

  apiKey: "AIzaSyAVXhIYa9lUz4gDZRq0o7vhzBlD1JxqS6c",

  authDomain: "my-injector-11b48.firebaseapp.com",

  databaseURL: "https://my-injector-11b48-default-rtdb.firebaseio.com",

  projectId: "my-injector-11b48",

  storageBucket: "my-injector-11b48.firebasestorage.app",

  messagingSenderId: "995503710291",

  appId: "1:995503710291:web:d4b067355e777f8177e6a6",

  measurementId: "G-278WYQ3G1Q"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Export the initialized services
export { app, analytics, db };