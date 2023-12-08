import { useCallback, useEffect, useState } from 'react';
import { Room } from '../graphql/API';
import { getRoom } from '../graphql/queries';
import { onUpdateRoom } from '../graphql/subscriptions';
import { updateRoom } from '../graphql/mutations';
import { APIClient, AuthMode } from '../types';

export const useRoom = (
  client: APIClient,
  authMode: AuthMode,
  isReady: boolean,
  roomId?: string
) => {
  const [room, setRoom] = useState<Omit<Room, 'ttl' | 'participants'> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!roomId || !isReady) return;
    (async () => {
      const result = await client.graphql({
        query: getRoom,
        variables: { id: roomId },
        authMode,
      });
      setRoom(result.data?.getRoom || null);
      setIsLoading(false);
    })();
  }, [authMode, client, isReady, roomId]);

  useEffect(() => {
    if (!roomId || !isReady) return;
    const updateSub = client
      .graphql({
        query: onUpdateRoom,
        variables: {
          filter: {
            id: {
              eq: roomId,
            },
          },
        },
        authMode,
      })
      .subscribe({
        next: ({ data }) => {
          setRoom(data.onUpdateRoom);
        },
      });

    return () => {
      updateSub.unsubscribe();
    };
  }, [authMode, client, isReady, roomId]);

  const handleOnOpen = useCallback(async () => {
    if (!roomId) return;
    await client.graphql({
      query: updateRoom,
      variables: {
        input: {
          id: roomId,
          isOpened: true,
        },
      },
    });
  }, [client, roomId]);

  return { room, isLoading, handleOnOpen };
};
