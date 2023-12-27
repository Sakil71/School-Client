import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, signInWithPopup, GoogleAuthProvider, updateEmail, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import app from '../Firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [admissionClass, setAdmissionClass] = useState('');

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserInformation = profile =>{
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    }

    const updateEmailAddress = (email) =>{
        setLoading(true);
        return updateEmail(auth.currentUser, email);
    }

    const emailVerify =  () =>{
        setLoading(true);
        return sendEmailVerification(auth.currentUser);
    }

    const resetPass = email =>{
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const loginWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logoutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=> unsubscribe();
    }, [])

    const value = {
        user,
        loading,
        setLoading,
        admissionClass,
        setAdmissionClass,
        createUser,
        logInUser,
        loginWithGoogle,
        updateUserInformation,
        resetPass,
        logoutUser,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

