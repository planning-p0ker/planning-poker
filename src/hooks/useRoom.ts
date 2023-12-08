import { useCallback, useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import {
  GetRoomQuery,
  OnUpdateRoomByIdSubscription,
  Room,
} from '../graphql/API';
import { getRoom } from '../graphql/queries';
import { onUpdateRoomById } from '../graphql/subscriptions';
import { updateRoom } from '../graphql/mutations';

type UpdateRoomSubscriptionEvent = {
  value: { data: OnUpdateRoomByIdSubscription };
};

export const useRoom = (
  authMode: GRAPHQL_AUTH_MODE,
  isReady: boolean,
  roomId?: string
) => {
  const [room, setRoom] = useState<Omit<Room, "ttl" | "participants"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!roomId || !isReady) return;
    (async () => {
      const result = (await API.graphql({
        query: getRoom,
        variables: { id: roomId },
        authMode,
      })) as GraphQLResult<GetRoomQuery>;
      setRoom(result.data?.getRoom || null);
      setIsLoading(false);
    })();
  }, [authMode, isReady, roomId]);

  useEffect(() => {
    if (!roomId || !isReady) return;
    const updateRoomListener = API.graphql({
      query: onUpdateRoomById,
      variables: { id: roomId },
      authMode,
    }) as any;

    if ('subscribe' in updateRoomListener) {
      updateRoomListener.subscribe({
        next: ({ value: { data } }: UpdateRoomSubscriptionEvent) => {
          if (data.onUpdateRoomById) {
            const room = data.onUpdateRoomById;
            setRoom(room);
          }
        },
      });
    }

    return () => {
      if ('unsubscribe' in updateRoomListener) {
        updateRoomListener.unsubscribe();
      }
    };
  }, [authMode, isReady, roomId]);

  const handleOnOpen = useCallback(async () => {
    await API.graphql(
      graphqlOperation(updateRoom, {
        input: {
          id: roomId,
          isOpened: true,
        },
      })
    );
  }, [roomId]);

  return { room, isLoading, handleOnOpen };
};
