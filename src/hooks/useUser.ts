import { useCallback, useEffect, useMemo, useState } from 'react';
import { NextRouter } from 'next/router';
import { AuthMode } from '../types';
import {
  signInWithRedirect,
  signOut,
  fetchUserAttributes,
} from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

export type User = {
  username: string;
  displayName: string;
};

export const useUser = (router: NextRouter, pathname: string) => {
  const [user, setUser] = useState<User | null>(null);

  const authMode: AuthMode = useMemo(() => {
    return user ? 'userPool' : 'iam';
  }, [user]);

  const onSignIn = useCallback(() => {
    signInWithRedirect({
      provider: 'Google',
      customState: pathname,
    });
  }, [pathname]);

  const getUser = async () => {
    try {
      const attr = await fetchUserAttributes();
      return attr;
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signInWithRedirect':
          getUser()
            .then((attr) => {
              if (attr) {
                setUser({
                  username: attr.username || attr.sub || 'guest',
                  displayName: attr.name || attr.email || 'guest',
                });
              }
            })
            .catch(() => {}); // noop
          break;
        case 'signedOut':
          setUser(null);
          router.push(pathname);
          break;
        case 'customOAuthState':
          router.push(payload.data);
          break;
      }
    });

    getUser().then((attr) => {
      if (!!attr && attr.sub) {
        setUser({
          username: attr.sub,
          displayName: attr.name ?? 'guest',
        });
      }
    });
  }, [pathname, router]);

  return { user, authMode, onSignIn, onSignOut: signOut };
};
