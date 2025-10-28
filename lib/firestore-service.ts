'use client';

import { db } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

// Collection references
const usersCollection = collection(db, 'users');
const stripeCustomersCollection = collection(db, 'stripe_customers');
const stripeSubscriptionsCollection = collection(db, 'stripe_subscriptions');
const stripeOrdersCollection = collection(db, 'stripe_orders');

// User operations
export const createUser = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(usersCollection, userId), {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
};

export const getUserById = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(usersCollection, userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Stripe customer operations
export const createStripeCustomer = async (userId: string, customerId: string) => {
  try {
    await setDoc(doc(stripeCustomersCollection, userId), {
      userId,
      customerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    });
    return true;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    return false;
  }
};

export const getStripeCustomer = async (userId: string) => {
  try {
    const customerDoc = await getDoc(doc(stripeCustomersCollection, userId));
    return customerDoc.exists() ? customerDoc.data() : null;
  } catch (error) {
    console.error('Error getting Stripe customer:', error);
    return null;
  }
};

// Stripe subscription operations
export const getSubscriptionStatus = async (userId: string) => {
  try {
    const customerData = await getStripeCustomer(userId);
    if (!customerData) return null;

    const { customerId } = customerData as any;
    
    const q = query(
      stripeSubscriptionsCollection, 
      where('customerId', '==', customerId)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    return querySnapshot.docs[0].data();
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return null;
  }
};

// Health check to verify Firestore connection
export const checkFirestoreConnection = async () => {
  try {
    const testDoc = doc(db, '_health_check', 'test');
    await setDoc(testDoc, { timestamp: new Date().toISOString() });
    const result = await getDoc(testDoc);
    return result.exists();
  } catch (error) {
    console.error('Firestore connection error:', error);
    return false;
  }
}; 