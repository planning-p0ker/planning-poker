import { useCallback, useEffect, useMemo, useState } from 'react';
import { NextRouter } from 'next/router';
import { Card, Participant } from '../graphql/API';
import { User } from './useUser';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteCard, deleteParticipant } from '../graphql/mutations';

export const useLeaveRoom = (
  router: NextRouter,
  onSignOut: () => void,
  user: User | null,
  myCard: Card | null,
  participants: Participant[]
) => {
  // サインアウト前に行う処理
  const [isSignOut, setIsSignOut] = useState(false);
  const myParicipant = useMemo(
    () => participants.find((p) => p.username === user?.username),
    [participants, user?.username]
  );
  const handleOnSignOut = useCallback(async () => {
    if (myCard) {
      await API.graphql(
        graphqlOperation(deleteCard, { input: { id: myCard.id } })
      );
    }

    if (myParicipant) {
      await API.graphql(
        graphqlOperation(deleteParticipant, {
          input: {
            id: myParicipant.id,
          },
        })
      );
    }
    setIsSignOut(true);
  }, [myCard, myParicipant]);

  useEffect(() => {
    if (!isSignOut) return;
    onSignOut();
  }, [isSignOut, onSignOut]);

  // ROOMから移動する前に行う処理
  const onBeforeUnload = useCallback(async () => {
    if (!user) return;
    // カード削除
    if (myCard) {
      await API.graphql(
        graphqlOperation(deleteCard, {
          input: {
            id: myCard.id,
          },
        })
      );
    }

    if (!myParicipant) return;
    await API.graphql(
      graphqlOperation(deleteParticipant, {
        input: {
          id: myParicipant.id,
        },
      })
    );
  }, [myCard, myParicipant, user]);

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
