import React, { useEffect, useMemo, useState } from "react";
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { GetRoomQuery, OnUpdateRoomByIdSubscription, Room } from "../API";
import { createRoom } from "../graphql/mutations";
import { getRoom } from "../graphql/queries";
import { onUpdateRoomById } from "../graphql/subscriptions";
import { User } from "./useUser";

type UpdateRoomSubscriptionEvent = { value: { data: OnUpdateRoomByIdSubscription } };

export const useRoom = (user: User | null, isReady: boolean, roomId?: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  const authMode = useMemo(() => {
    return user ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS : GRAPHQL_AUTH_MODE.AWS_IAM
  }, [user]);

  useEffect(() => {
    if (!roomId || !isReady) return;
    try {
      (async () => {
        const result = await API.graphql({ query: getRoom, variables: { id: roomId }, authMode: GRAPHQL_AUTH_MODE.AWS_IAM });
        if ('data' in result && !!result.data) {
          const data = result.data as GetRoomQuery;
          if (!data.getRoom) {
            setRoom(null);
          } else {
            setRoom(data.getRoom);
          }
        }
      })();  
    } catch (e) {
      console.log("getRoom Error", e);
    }

    try {
      const updateRoomListener = API.graphql({ query: onUpdateRoomById, variables: { id: roomId }, authMode: GRAPHQL_AUTH_MODE.AWS_IAM });
      if ("subscribe" in updateRoomListener) {
        updateRoomListener.subscribe({
          next: ({ value: { data } }: UpdateRoomSubscriptionEvent) => {
            if (data.onUpdateRoomById) {
              const room = data.onUpdateRoomById;
              setRoom(room);
            }
          },
        })
      }
    } catch (e) {
      console.log("updateRoomListener Error", e);
    }

  }, [authMode, isReady, roomId]);

  return room;
}
