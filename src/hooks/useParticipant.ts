import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  CreateParticipantInput,
  CreateParticipantMutation,
  DeleteParticipantInput,
  ListParticipantsQuery,
  OnCreateCardByRoomIdSubscriptionVariables,
  OnCreateParticipantByRoomIdSubscription,
  OnDeleteParticipantByRoomIdSubscription,
  Participant,
  Room,
} from '../API';
import { createParticipant, deleteParticipant } from '../graphql/mutations';
import { User } from './useUser';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { listParticipants } from '../graphql/queries';
import {
  onCreateParticipantByRoomId,
  onDeleteParticipantByRoomId,
} from '../graphql/subscriptions';
import { useRouter } from 'next/router';

type CreateParticipantSubscriptionEvent = {
  value: { data: OnCreateParticipantByRoomIdSubscription };
};
type DeleteParticipantSubscriptionEvent = {
  value: { data: OnDeleteParticipantByRoomIdSubscription };
};

export const useParticipant = (user: User | null, room: Room | null) => {
  const [paricipants, setParicipants] = useState<Participant[]>([]);
  const [myParicipant, setMyParicipant] = useState<Participant | null>(null);
  const router = useRouter();

  const authMode = useMemo(() => {
    return user
      ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      : GRAPHQL_AUTH_MODE.AWS_IAM;
  }, [user]);

  const onBeforeUnload = () => {
    console.log('onBeforeUnload');
  };

  useEffect(() => {
    console.log('Register!');
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [router.events]);

  useEffect(() => {
    if (!room?.id) {
      console.log('[query]room id is not seted, return');
      return;
    }
    (async () => {
      const result = (await API.graphql({
        query: listParticipants,
        authMode,
        variables: { filter: { roomParticipantsId: { eq: room.id } } },
      })) as GraphQLResult<ListParticipantsQuery>;
      const items = result.data?.listParticipants?.items;
      if (items) setParicipants(items);
    })();
  }, [authMode, room?.id]);

  // Subscription
  useEffect(() => {
    if (!room?.id) {
      console.log('[subscripion]room id is not seted, return');
      return;
    }

    const createListener: any = API.graphql({
      query: onCreateParticipantByRoomId,
      authMode,
      variables: {
        roomId: room.id,
      } as OnCreateCardByRoomIdSubscriptionVariables,
    });
    if ('subscribe' in createListener) {
      createListener.subscribe({
        next: ({ value: { data } }: CreateParticipantSubscriptionEvent) => {
          if (data.onCreateParticipantByRoomId) {
            const newItem = data.onCreateParticipantByRoomId;
            setParicipants((prev) => [...prev, newItem]);
          }
        },
      });
    }

    const deleteListener: any = API.graphql({
      query: onDeleteParticipantByRoomId,
      authMode,
      variables: { roomId: room.id },
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
