import { useCallback, useEffect, useMemo, useState } from 'react';
import { NextRouter } from 'next/router';
import { Participant } from '../graphql/API';
import { User } from './useUser';
import { deleteParticipant } from '../graphql/mutations';
import { APIClient } from '../types';

export const useLeaveRoom = (
  client: APIClient,
  router: NextRouter,
  onSignOut: () => void,
  user: User | null,
  participants: Participant[]
) => {
  // サインアウト前に行う処理
  const [isSignOut, setIsSignOut] = useState(false);
  const myParticipant = useMemo(
    () => participants.find((p) => p.username === user?.username),
    [participants, user?.username]
  );
  const handleOnSignOut = useCallback(async () => {
    if (myParticipant) {
      await client.graphql({
        query: deleteParticipant,
        variables: {
          input: {
            id: myParticipant.id,
          },
        },
      });
    }
    setIsSignOut(true);
  }, [client, myParticipant]);

  useEffect(() => {
    if (!isSignOut) return;
    onSignOut();
  }, [isSignOut, onSignOut]);

  // ROOMから移動する前に行う処理
  const onBeforeUnload = useCallback(async () => {
    if (!myParticipant) return;
    await client.graphql({
      query: deleteParticipant,
      variables: {
        input: {
          id: myParticipant.id,
        },
      },
    });
  }, [client, myParticipant]);

  useEffect(() => {
    router.events.on('routeChangeStart', onBeforeUnload);
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      router.events.off('routeChangeStart', onBeforeUnload);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [onBeforeUnload, router.events]);

  return { handleOnSignOut };
};
