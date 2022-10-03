import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  ListCardsQuery,
  ListParticipantsQuery,
  OnCreateParticipantByRoomIdSubscription,
  OnDeleteParticipantByRoomIdSubscription,
  Participant,
  Room,
  Card,
} from '../graphql/API';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import {
  onCreateParticipantByRoomId,
  onDeleteParticipantByRoomId,
} from '../graphql/subscriptions';
import { listCards, listParticipants } from '../graphql/queries';
import { sortParticipants } from '../utils/sortCards';
import { updateRoom } from '../graphql/mutations';

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
  const [participants, setParicipants] = useState<Participant[]>([]);

  // 初期表示時に参加者一覧取得
  useEffect(() => {
    if (!room) return;
    (async () => {
      const result = (await API.graphql({
        query: listParticipants,
        authMode,
        variables: { filter: { roomParticipantsId: { eq: room.id } } },
      })) as GraphQLResult<ListParticipantsQuery>;
      const items = result.data?.listParticipants?.items as Participant[];
      if (items) {
        if (room.isOpened) {
          const listCardsData = (await API.graphql({
            query: listCards,
            authMode,
            variables: { filter: { roomId: { eq: room.id } } },
          })) as GraphQLResult<ListCardsQuery>;
          const cards = listCardsData.data?.listCards?.items as Card[];
          setParicipants(!!cards ? sortParticipants(items, cards) : items);
        } else {
          setParicipants(items);
        }
      }
    })();
  }, [authMode, room]);

  // Subscription
  useEffect(() => {
    if (!room) return;

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

  useEffect(() => {
    if (!room || !room.isOpened || participants.length) return;

    API.graphql(
      graphqlOperation(updateRoom, {
        input: { id: room?.id, isOpened: false },
      })
    );
  }, [participants.length, room])

  return { participants, setParicipants };
};
