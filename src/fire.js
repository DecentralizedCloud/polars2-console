import { initializeApp } from "firebase/app";
// import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
export const firebaseConfig = {
    apiKey: "AIzaSyC0YtD7UI0Ba09TZn6fnq2KcoKd5IhR094",
    authDomain: "decentralizedcloudservice.firebaseapp.com",
    databaseURL:
        "https://decentralizedcloudservice-default-rtdb.firebaseio.com",
    projectId: "decentralizedcloudservice",
    storageBucket: "decentralizedcloudservice.appspot.com",
    messagingSenderId: "974039200795",
    appId: "1:974039200795:web:6d66c8fac30aab81ddf4be",
    measurementId: "G-NX6M2YE568",
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export const auth = getAuth();

// export const auth =
// const analytics = firebase.getAnalytics(app);

export default fire;
