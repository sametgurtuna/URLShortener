import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  auth
} from '../config/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  // Kullanıcı kayıt
  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      toast.success('Account created successfully!');
      return userCredential;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Kullanıcı giriş
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      return userCredential;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Çıkış yap
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Premium durumu kontrol et (demo için)
  const checkPremiumStatus = (user) => {
    // Demo için: eğer email'de "premium" geçiyorsa premium
    if (user && user.email && user.email.includes('premium')) {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
  };

  // Premium satın al (demo)
  const upgradeToPremium = () => {
    setIsPremium(true);
    toast.success('🎉 Upgraded to Premium!');
    // Gerçek uygulamada burada ödeme işlemi olur
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setCurrentUser(user);
      checkPremiumStatus(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    isPremium,
    upgradeToPremium,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
