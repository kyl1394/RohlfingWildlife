import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';
import config from './config';

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.store = app.firestore();
    this.storage = app.storage().ref();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // *** Merge Auth and DB User API ***

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

    // *** User API ***

  user = uid => this.store.collection('users').doc(uid);

  users = () => this.store.collection('users');

  // *** Photo API ***

  photo = uid => this.store.collection('photos').doc(uid);

  photos = () => this.store.collection('photos');

  getPhotos = () => this.store.collection('photos').orderBy('order');

  doUploadPhoto = (name, date, url, order) => {
    var needsUpdate = this.photos().where('order', '>=', order);

    var batch = this.store.batch();
    needsUpdate.get().then((photos) => {
      photos.docs.forEach((photo) => {
        var newOrder = parseInt(photo.data().order) + 1;
        batch.update(photo.ref, {'order': newOrder});
      });

      batch.commit();

      this.photos().add({
        name: name,
        date: date,
        src: url,
        order: order,
        enabled: true,
      })
    });
  }
}

export default Firebase;
