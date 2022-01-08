import React, { useEffect, useMemo, useState } from "react";
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { GetRoomQuery, OnCreateRoomSubscription, OnDeleteRoomSubscription, OnUpdateRoomSubscription, Room } from "../API";
import { createRoom } from "../graphql/mutations";
import { getRoom } from "../graphql/queries";
import { onCreateRoom, onUpdateRoom } from "../graphql/subscriptions";
import { User } from "./useUser";

type CreateRoomSubscriptionEvent = { value: { data: OnCreateRoomSubscription } };
type DeleteRoomSubscriptionEvent = { value: { data: OnDeleteRoomSubscription } };
type UpdateRoomSubscriptionEvent = { value: { data: OnUpdateRoomSubscription } };

export const useRoom = (user: User | null, roomId: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  const authMode = useMemo(() => {
    return user ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS : GRAPHQL_AUTH_MODE.AWS_IAM
  }, [user]);

  useEffect(() => {
    (async () => {
      const result = await API.graphql({ query: getRoom, variables: { id: roomId }, authMode });
      if ('data' in result && !!result.data) {
        const data = result.data as GetRoomQuery;
        if (!data.getRoom) {
          await API.graphql({ query: createRoom, variables: { input: { id: roomId, isOpened: false }, authMode } });
        } else {
          setRoom(data.getRoom);
        }
      }
    })();

    const createRoomListener = API.graphql({ query: onCreateRoom, variables: { id: roomId }, authMode });
    if ("subscribe" in createRoomListener) {
      createRoomListener.subscribe({
        next: ({ value: { data } }: CreateRoomSubscriptionEvent) => {
          if (data.onCreateRoom) {
            const room = data.onCreateRoom;
            if (room.id === roomId) {
              setRoom(room);
            }
          }
        },
      })
    }

    const updateRoomListener = API.graphql({ query: onUpdateRoom, variables: { id: roomId }, authMode });
    if ("subscribe" in updateRoomListener) {
      updateRoomListener.subscribe({
        next: ({ value: { data } }: UpdateRoomSubscriptionEvent) => {
          if (data.onUpdateRoom) {
            const room = data.onUpdateRoom;
            setRoom(room);
          }
        },
      })
    }
  }, [authMode, roomId]);

  return room;
}
