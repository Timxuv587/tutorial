import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDBNI9Umbh0nDvk0c8GwIgkoB14JMfMczs",
    authDomain: "tutorial-5291d.firebaseapp.com",
    databaseURL: "https://tutorial-5291d-default-rtdb.firebaseio.com",
    projectId: "tutorial-5291d",
    storageBucket: "tutorial-5291d.appspot.com",
    messagingSenderId: "1035172313315",
    appId: "1:1035172313315:web:4e0cba18e804c7bbaeadd6",
    measurementId: "G-MBQ2P0W8Z6"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        onIdTokenChanged(getAuth(firebase), setUser);
    }, []);

    return [user];
};