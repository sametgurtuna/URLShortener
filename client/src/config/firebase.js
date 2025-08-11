// Demo mode için Firebase'siz authentication
// Gerçek uygulamada buraya gerçek Firebase config gelecek

// Demo auth objesi
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    
    // Demo için localStorage'dan user'ı oku
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      try {
        const user = JSON.parse(demoUser);
        setTimeout(() => callback(user), 100);
      } catch (error) {
        setTimeout(() => callback(null), 100);
      }
    } else {
      setTimeout(() => callback(null), 100);
    }
    return () => {}; // unsubscribe function
  }
};

// Demo database objesi
export const db = {
  // Demo için boş obje
};

// Demo functions
export const createUserWithEmailAndPassword = async (auth, email, password) => {
  const user = {
    uid: `demo-${Date.now()}`,
    email,
    displayName: email.split('@')[0],
    emailVerified: true
  };
  localStorage.setItem('demoUser', JSON.stringify(user));
  return { user };
};

export const signInWithEmailAndPassword = async (auth, email, password) => {
  const user = {
    uid: `demo-${Date.now()}`,
    email,
    displayName: email.split('@')[0],
    emailVerified: true
  };
  localStorage.setItem('demoUser', JSON.stringify(user));
  return { user };
};

export const signOut = async (auth) => {
  localStorage.removeItem('demoUser');
  return Promise.resolve();
};

export const updateProfile = async (user, profile) => {
  const currentUser = JSON.parse(localStorage.getItem('demoUser') || '{}');
  const updatedUser = { ...currentUser, ...profile };
  localStorage.setItem('demoUser', JSON.stringify(updatedUser));
  return Promise.resolve();
};

export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};

export default null;
