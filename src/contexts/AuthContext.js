import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para extrair dados e salvar no Firestore
  const syncUserProfile = async (currentUser) => {
    if (!currentUser) {
      setProfile(null);
      return;
    }

    const fullName = currentUser.displayName || 'Usuário';
    const firstName = fullName.split(' ')[0]; // Pega apenas o primeiro nome
    const email = currentUser.email || '';
    const photoURL = currentUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

    const userProfileData = {
      uid: currentUser.uid,
      name: fullName,
      firstName: firstName,
      email: email,
      photoURL: photoURL,
      lastLogin: serverTimestamp(),
    };

    setProfile(userProfileData);

    try {
      // Salva ou atualiza a coleção "users" no Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, userProfileData, { merge: true });
    } catch (error) {
      console.log('Erro ao salvar usuário no Firestore:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('Erro ao sair:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, syncUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
