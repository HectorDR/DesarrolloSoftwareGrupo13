import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-analytics.js";
        
   
        import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
        
        const firebaseConfig = initializeApp( {
          apiKey: "AIzaSyCVk-YD3AFjqFSNr6LXMiH3nkqLOL00RYk",
          authDomain: "loing-db095.firebaseapp.com",
          projectId: "loing-db095",
          storageBucket: "loing-db095.appspot.com",
          messagingSenderId: "115772082835",
          appId: "1:115772082835:web:cc24a3af894a1d67119b66",
          measurementId: "G-YTL38EPJXE"

     });
const auth = getAuth(firebaseConfig);
createUserWithEmailAndPassword(auth)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  

            
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);