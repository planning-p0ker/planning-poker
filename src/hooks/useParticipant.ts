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

type CreateParticipantSubscriptionEvent = {
  value: { data: OnCreateParticipantByRoomIdSubscription };
};
type DeleteParticipantSubscriptionEvent = {
  value: { data: OnDeleteParticipantByRoomIdSubscription };
};

export const useParticipant = (user: User | null, room: Room | null) => {
  const [isReady, setReady] = useState(false);
  const [paricipants, setParicipants] = useState<Participant[]>([]);
  const [myParicipant, setMyParicipant] = useState<Participant | null>(null);

  const authMode = useMemo(() => {
    return user
      ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      : GRAPHQL_AUTH_MODE.AWS_IAM;
  }, [user]);

  useEffect(() => {
    if (!!room && !!user) {
      setReady(true);
    }
  }, [room, user]);

  useEffect(() => {
    if (isReady) return;
    (async () => {
      const result = (await API.graphql({
        query: listParticipants,
        authMode,
        variables: { filter: { roomParticipantsId: { eq: room!.id } } },
      })) as GraphQLResult<ListParticipantsQuery>;
      const items = result.data?.listParticipants?.items;
      if (items) setParicipants(items);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authMode, isReady, room?.id]);

  const registerPaticipant = useCallback(async () => {
    if (isReady) {
      const result = (await API.graphql(
        graphqlOperation(createParticipant, {
          input: {
            roomParticipantsId: room!.id,
            username: user!.username,
            displayUserName: user!.displayName,
          } as CreateParticipantInput,
        })
      )) as GraphQLResult<CreateParticipantMutation>;

      const createParticipantResult = result.data?.createParticipant;
      if (createParticipantResult) {
        setMyParicipant(createParticipantResult);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const unregisterPaticipant = useCallback(async () => {
    if (myParicipant) {
      API.graphql(
        graphqlOperation(deleteParticipant, {
          input: {
            id: myParicipant.id,
          } as DeleteParticipantInput,
        })
      );
      setMyParicipant(null);
    }
  }, [myParicipant]);

  useEffect(() => {
    if (
      isReady &&
      !myParicipant &&
      !room?.participants?.items.some((i) => i.username === user?.username)
    ) {
      console.log('registerPaticipant');
      registerPaticipant();
    }

    return () => {
      console.log('unregisterPaticipant');
      unregisterPaticipant();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if (!room?.id || !isReady) return;
    const createListener: any = API.graphql({
      query: onCreateParticipantByRoomId,
      authMode,
      variables: {
        roomId: room.id,
      } as OnCreateCardByRoomIdSubscriptionVariables,
    });
    if ('subscribe' in createListener) {
      console.log('subscribe in createCardListener');
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
      console.log('subscribe in deleteCardListener');
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
        console.log('unsubscribe in createCardListener');
        createListener.unsubscribe();
      }
      if ('unsubscribe' in deleteListener) {
        console.log('unsubscribe in deleteCardListener');
        deleteListener.unsubscribe();
      }
    };
  }, [authMode, isReady, room]);

  return paricipants;
};
