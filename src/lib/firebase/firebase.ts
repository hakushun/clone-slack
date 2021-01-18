import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDWNO770VTrwfLKmRsEbofyGoSIsORX6X4',
  authDomain: 'clone-slack-ab637.firebaseapp.com',
  projectId: 'clone-slack-ab637',
  storageBucket: 'clone-slack-ab637.appspot.com',
  messagingSenderId: '174130768219',
  appId: '1:174130768219:web:88ee35f67ee208b2e3927e',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
