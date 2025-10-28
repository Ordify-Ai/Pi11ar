'use client';

import { getStripeCustomer, createStripeCustomer } from './firestore-service';
import { auth } from './firebase';

// API URLs to Cloud Functions or Next.js API routes
const CHECKOUT_URL = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL
  ? `${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL}/stripe-checkout`
  : '/api/stripe/create-checkout';

const BILLING_URL = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL
  ? `${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL}/stripe-billing-portal`
  : '/api/stripe/billing-portal';

/**
 * Creates a Stripe checkout session
 */
export async function createCheckoutSession({
  priceId,
  mode,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  mode: 'payment' | 'subscription';
  successUrl: string;
  cancelUrl: string;
}) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const idToken = await user.getIdToken();

    const response = await fetch(CHECKOUT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        price_id: priceId,
        mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create checkout session');
    }

    const { url } = await response.json();

    if (!url) {
      throw new Error('No checkout URL returned');
    }

    return url;
  } catch (err) {
    console.error('Error creating checkout session:', err);
    throw err;
  }
}

/**
 * Creates a billing portal session
 */
export async function createBillingPortalSession(returnUrl: string) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const idToken = await user.getIdToken();

    const response = await fetch(BILLING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        return_url: returnUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create billing portal session');
    }

    const { url } = await response.json();

    if (!url) {
      throw new Error('No billing portal URL returned');
    }

    return url;
  } catch (err) {
    console.error('Error creating billing portal session:', err);
    throw err;
  }
}

/**
 * Gets the user's subscription status
 */
export async function getSubscriptionStatus() {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }

    // We would normally call a cloud function or API route here
    // But for now, we can access Firestore directly
    const customer = await getStripeCustomer(user.uid);
    
    if (!customer) {
      return null;
    }

    // In a real implementation, this would be a call to a secure backend
    // that would fetch the subscription status from Stripe
    return (customer as any).subscription_status || null;
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return null;
  }
} 