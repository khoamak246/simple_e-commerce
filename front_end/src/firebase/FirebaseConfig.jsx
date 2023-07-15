import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCO5dEi4Ow9b2m_jDV5k8-19Ir4t91yOak",
  authDomain: "simple-e-commerce-8bfc6.firebaseapp.com",
  projectId: "simple-e-commerce-8bfc6",
  storageBucket: "simple-e-commerce-8bfc6.appspot.com",
  messagingSenderId: "717436091370",
  appId: "1:717436091370:web:93600fc2de4953e4b29093"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);