'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { checkFirestoreConnection } from '@/lib/firestore-service';

export function AuthStatus() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      toast.success('Signed in successfully');
    } catch (error: any) {
      toast.error(`Error signing in: ${error.message}`);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      toast.success('Signed up successfully');
    } catch (error: any) {
      toast.error(`Error signing up: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(`Error signing out: ${error.message}`);
    }
  };

  const testFirestoreConnection = async () => {
    const isConnected = await checkFirestoreConnection();
    setConnectionStatus(isConnected);
    if (isConnected) {
      toast.success('Connected to Firestore');
    } else {
      toast.error('Failed to connect to Firestore');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-bold mb-4">Authentication Status</h2>
      
      {user ? (
        <div>
          <p className="mb-2">Signed in as: {user.email}</p>
          <p className="mb-2">User ID: {user.uid}</p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      ) : (
        <div>
          <p className="mb-2">Not signed in</p>
          <div className="space-y-2">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-2 border rounded w-full mb-2"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-2 border rounded w-full mb-4"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSignIn}>Sign In</Button>
              <Button onClick={handleSignUp}>Sign Up</Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Button onClick={testFirestoreConnection} variant="outline">
          Test Firestore Connection
        </Button>
        {connectionStatus !== null && (
          <p className="mt-2">
            Firestore connection: {connectionStatus ? 'Connected' : 'Failed'}
          </p>
        )}
      </div>
    </div>
  );
} 