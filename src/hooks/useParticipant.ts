import { useEffect, useMemo, useState } from 'react';
import { API } from 'aws-amplify';
import {
  OnCreateParticipantByRoomIdSubscription,
  OnDeleteParticipantByRoomIdSubscription,
  Participant,
  Room,
} from '../API';
import { User } from './useUser';
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

export const useParticipant = (user: User | null, room: Room | null) => {
  const [paricipants, setParicipants] = useState<Participant[]>([]);

  const authMode = useMemo(() => {
    return user
      ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      : GRAPHQL_AUTH_MODE.AWS_IAM;
  }, [user]);

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
