import React, { useEffect, useMemo, useState } from 'react';
import { API } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { GetRoomQuery, OnUpdateRoomByIdSubscription, Room } from '../API';
import { getRoom } from '../graphql/queries';
import { onUpdateRoomById } from '../graphql/subscriptions';
import { User } from './useUser';

type UpdateRoomSubscriptionEvent = {
  value: { data: OnUpdateRoomByIdSubscription };
};

export const useRoom = (
  user: User | null,
  isReady: boolean,
  roomId?: string
) => {
  const [room, setRoom] = useState<Room | null>(null);
  const authMode = useMemo(() => {
    return user
      ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      : GRAPHQL_AUTH_MODE.AWS_IAM;
  }, [user]);

  useEffect(() => {
    if (!roomId || !isReady) return;
    (async () => {
      const result = (await API.graphql({
        query: getRoom,
        variables: { id: roomId },
        authMode,
      })) as GraphQLResult<GetRoomQuery>;
      setRoom(result.data?.getRoom || null);
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
      console.log('subscribe in updateRoomListener');
      updateRoomListener.subscribe({
        next: ({ value: { data } }: UpdateRoomSubscriptionEvent) => {
          console.log('UPDATE ROOM');
          if (data.onUpdateRoomById) {
            const room = data.onUpdateRoomById;
            setRoom(room);
          }
        },
      });
    }

    return () => {
      if ('unsubscribe' in updateRoomListener) {
        console.log('unsubscribe in updateRoomListener');
        updateRoomListener.unsubscribe();
      }
    };
  }, [authMode, isReady, roomId]);

  return room;
};
