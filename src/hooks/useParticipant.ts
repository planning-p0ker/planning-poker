import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import {
  OnCreateParticipantByRoomIdSubscription,
  OnDeleteParticipantByRoomIdSubscription,
  Participant,
  Room,
} from '../API';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import {
  onCreateParticipantByRoomId,
  onDeleteParticipantByRoomId,
} from '../graphql/subscriptions';

type CreateParticipantSubscriptionEvent = {
  value: { data: OnCreateParticipantByRoomIdSubscription };
};
type DeleteParticipantSubscriptionEvent = {
  value: { data: OnDeleteParticipantByRoomIdSubscription };
};

export const useParticipant = (
  authMode: GRAPHQL_AUTH_MODE,
  room: Room | null
) => {
  const [paricipants, setParicipants] = useState<Participant[]>([]);

  // Subscription
  useEffect(() => {
    if (!room?.id) {
      return;
    }

    const createListener: any = API.graphql({
      query: onCreateParticipantByRoomId,
      authMode,
      variables: { roomParticipantsId: room.id },
    });
    if ('subscribe' in createListener) {
      createListener.subscribe({
        next: ({ value: { data } }: CreateParticipantSubscriptionEvent) => {
          if (data.onCreateParticipantByRoomId) {
            const newItem = data.onCreateParticipantByRoomId;
            setParicipants((prev) => {
              if (prev.some((p) => p.username === newItem.username)) {
                return prev;
              }

              return [...prev, newItem];
            });
          }
        },
      });
    }

    const deleteListener: any = API.graphql({
      query: onDeleteParticipantByRoomId,
      authMode,
      variables: { roomParticipantsId: room.id },
    });
    if ('subscribe' in deleteListener) {
      deleteListener.subscribe({
        next: ({ value: { data } }: DeleteParticipantSubscriptionEvent) => {
          if (data.onDeleteParticipantByRoomId) {
            const deletedCard = data.onDeleteParticipantByRoomId;
            setParicipants((prev) =>
              prev.filter((e) => e.id !== deletedCard.id)
            );
          }
        },
      });
    }

    return () => {
      if ('unsubscribe' in createListener) {
        createListener.unsubscribe();
      }
      if ('unsubscribe' in deleteListener) {
        deleteListener.unsubscribe();
      }
    };
  }, [authMode, room]);

  return paricipants;
};
