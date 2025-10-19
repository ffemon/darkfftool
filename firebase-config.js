// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBetReoaPXMmf4yjOMKHniOpDpbAjg3ULE",
  authDomain: "dark-ff-admin.firebaseapp.com",
  databaseURL: "https://dark-ff-admin-default-rtdb.firebaseio.com",
  projectId: "dark-ff-admin",
  storageBucket: "dark-ff-admin.firebasestorage.app",
  messagingSenderId: "565481542741",
  appId: "1:565481542741:web:967d224140c4801dc370dc",
  measurementId: "G-3RBXTHMP08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Export the initialized services
export { app, analytics, db };