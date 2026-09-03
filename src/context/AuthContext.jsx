// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'invi_client_auth';

const DEFAULT_DEMO_USER = {
  id: 'usr_invi_8821',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@invi-client.in',
  phone: '+91 98765 43210',
  address: 'Flat 402, Prestige Tower, 100ft Road, Indiranagar, Bangalore, Karnataka - 560038',
  city: 'Bangalore',
  state: 'Karnataka',
  pincode: '560038',
  memberSince: 'August 2026',
  isVerified: true
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'deleted') return null;
      if (saved) return JSON.parse(saved);
      return DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  const isLoggedIn = !!user;

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else if (localStorage.getItem(STORAGE_KEY) !== 'deleted') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage unavailable
    }
  }, [user]);

  /**
   * Client Login with Email or Phone
   */
  const login = (emailOrPhone, name = 'Valued Client') => {
    const isEmail = emailOrPhone.includes('@');
    const newUser = {
      id: 'usr_' + Math.floor(100000 + Math.random() * 900000),
      name: name || (isEmail ? emailOrPhone.split('@')[0] : 'Client'),
      email: isEmail ? emailOrPhone : 'client@invi.co.in',
      phone: !isEmail ? emailOrPhone : '+91 98765 43210',
      address: 'Indiranagar, Bangalore, Karnataka - 560038',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038',
      memberSince: 'September 2026',
      isVerified: true
    };
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {}
    return newUser;
  };

  /**
   * Client Logout
   */
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  /**
   * Update Profile Details
   */
  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  /**
   * Permanent Account & Data Erasure (GDPR / Indian DPDP Act Compliance)
   */
  const deleteAccount = () => {
    setUser(null);
    try {
      localStorage.setItem(STORAGE_KEY, 'deleted');
      localStorage.removeItem('invi_cart');
      localStorage.removeItem('invi_wishlist');
    } catch {}
  };

  /**
   * Restore Demo Account
   */
  const restoreDemoAccount = () => {
    setUser(DEFAULT_DEMO_USER);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_USER));
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateProfile,
        deleteAccount,
        restoreDemoAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
