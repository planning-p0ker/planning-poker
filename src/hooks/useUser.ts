import React, { useCallback, useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { NextRouter } from 'next/router';

export type User = {
  username: string;
  displayName: string;
};

export const useUser = (router: NextRouter, pathname: string) => {
  const [user, setUser] = useState<User | null>(null);

  const onSignIn = useCallback(() => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
      customState: pathname,
    });
  }, [pathname]);

  const onSignOut = useCallback(() => {
    Auth.signOut();
  }, []);

  const getUser = async () => {
    console.log('getUser');
    try {
      const userData = await Auth.currentAuthenticatedUser();
      console.log('getUser:userData', userData);
      Amplify.configure({
        aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
      });

      return userData;
    } catch (e) {
      console.log(e);
      Amplify.configure({
        aws_appsync_authenticationType: 'AWS_IAM',
      });
      return;
    }
  };

  useEffect(() => {
    console.log('TEST useEffect');
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log(`${event}: data`, data);
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then((userData) => {
            if (userData) {
              setUser({
                username: userData.username,
                displayName: userData.attributes.name,
              });
            }
          });
          break;
        case 'signOut':
          setUser(null);
          router.push(pathname);
          break;
        case 'customOAuthState':
          router.push(data);
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          break;
      }
    });

    getUser().then((userData) => {
      if (!!userData) {
        setUser({
          username: userData.username,
          displayName: userData.attributes.name,
        });
      }
    });
  }, [pathname, router]);

  return { user, onSignIn, onSignOut };
};
