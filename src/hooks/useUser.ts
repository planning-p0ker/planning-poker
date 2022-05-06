import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { NextRouter } from "next/router";

export type User = {
  username: string;
  displayName: string;
};

export const useUser = (router: NextRouter, pathname: string ) => {
  const [user, setUser] = useState<User | null>(null);
  const onSignIn = useCallback(() => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
      customState: pathname,
    })
  }, [pathname]);
  const onSignOut = useCallback(() => {
    Auth.signOut();
  }, []);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser().then((userData) => {
            if (userData) {
              setUser({
                username: userData.username,
                displayName: userData.attributes.name
              })
            }
          });
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          router.push(data);
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          break;
      }
    });

    getUser().then((userData) => {
      if (!!userData) {
        setUser({
          username: userData.username,
          displayName: userData.attributes.name
        });
      }
    });
  }, [pathname, router]);

  const getUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      return userData;
    } catch (e) {
      return;
    }
  };

  return { user, onSignIn, onSignOut };
}