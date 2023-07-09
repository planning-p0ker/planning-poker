import { useCallback, useEffect, useMemo, useState } from 'react';
import { NextRouter } from 'next/router';
import { Participant, UpdateParticipantInput } from '../graphql/API';
import { User } from './useUser';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteParticipant, updateParticipant } from '../graphql/mutations';
import dayjs from 'dayjs';

export const useLeaveRoom = (
  router: NextRouter,
  onSignOut: () => void,
  user: User | null,
  participants: Participant[]
) => {
  // サインアウト前に行う処理
  const [isSignOut, setIsSignOut] = useState(false);
  const myParicipant = useMemo(
    () => participants.find((p) => p.username === user?.username),
    [participants, user?.username]
  );
  const handleOnSignOut = useCallback(async () => {
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
  }, [myParicipant]);

  useEffect(() => {
    if (!isSignOut) return;
    onSignOut();
  }, [isSignOut, onSignOut]);

  // ROOMから移動する前に行う処理
  const onBeforeUnload = useCallback(async () => {
    if (!myParicipant) return;
    await API.graphql(
      graphqlOperation(deleteParticipant, {
        input: {
          id: myParicipant.id,
        },
      })
    );
  }, [myParicipant]);

  useEffect(() => {
    router.events.on('routeChangeStart', onBeforeUnload);
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      router.events.off('routeChangeStart', onBeforeUnload);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [onBeforeUnload, router.events]);

  // userのttlを更新
  const updateUserTTL = useCallback(async () => {
    if (!user) return;

    const me = participants.find((p) => p.username === user.username);
    if (!me) return;

    const updateParticipantInput: UpdateParticipantInput = {
      ...me,
      id: me.id,
      ttl: dayjs().add(1, 'hour').unix(),
    };
    await API.graphql(
      graphqlOperation(updateParticipant, {
        input: updateParticipantInput,
      })
    );
  }, [participants, user]);

  useEffect(() => {
    const update = setInterval(updateUserTTL, 1000 * 60 * 50); // 50mに一度TTLを更新する
    return () => clearInterval(update);
  }, [updateUserTTL]);

  return { handleOnSignOut };
};
