import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { GetRoomQuery, OnCreateRoomSubscription, OnDeleteRoomSubscription, OnUpdateRoomSubscription, Room } from "../API";
import { createRoom } from "../graphql/mutations";
import { getRoom } from "../graphql/queries";
import { onCreateRoom, onUpdateRoom } from "../graphql/subscriptions";

type CreateRoomSubscriptionEvent = { value: { data: OnCreateRoomSubscription } };
type DeleteRoomSubscriptionEvent = { value: { data: OnDeleteRoomSubscription } };
type UpdateRoomSubscriptionEvent = { value: { data: OnUpdateRoomSubscription } };

export const useRoom = (roomId: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  useEffect(() => {
    (async () => {
      const result = await API.graphql(graphqlOperation(getRoom, { id: roomId }));
      if ('data' in result && !!result.data) {
        const data = result.data as GetRoomQuery;
        if (!data.getRoom) {
          await API.graphql(graphqlOperation(createRoom, { input: { id: roomId, isOpened: false } }))
        } else {
          setRoom(data.getRoom);
        }
      }
    })();

    const createRoomListener = API.graphql(graphqlOperation(onCreateRoom, { id: roomId }));
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

    const updateRoomListener = API.graphql(graphqlOperation(onUpdateRoom, { id: roomId }));
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
  }, [roomId]);

  return room;
}
