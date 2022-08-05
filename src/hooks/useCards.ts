import { useCallback, useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { listCards } from '../graphql/queries';
import {
  onCreateCardByRoomId,
  onDeleteCardByRoomId,
} from '../graphql/subscriptions';
import {
  Card,
  ListCardsQuery,
  OnCreateCardByRoomIdSubscriptionVariables,
  OnCreateCardByRoomIdSubscription,
  OnDeleteCardByRoomIdSubscription,
} from '../graphql/API';
import { User } from './useUser';
import { createCard, deleteCard, updateRoom } from '../graphql/mutations';

type CreateCardSubscriptionEvent = {
  value: { data: OnCreateCardByRoomIdSubscription };
};
type DeleteCardSubscriptionEvent = {
  value: { data: OnDeleteCardByRoomIdSubscription };
};

export const useCards = (
  user: User | null,
  authMode: GRAPHQL_AUTH_MODE,
  isReady: boolean,
  roomId?: string
) => {
  const [fieldCards, setFieldCards] = useState<Card[]>([]);
  const [myCard, setMyCard] = useState<Card | null>(null);

  // 初期表示時にカード一覧取得
  useEffect(() => {
    if (!roomId || !isReady) return;
    (async () => {
      const result = (await API.graphql({
        query: listCards,
        authMode,
        variables: { filter: { roomId: { eq: roomId } } },
      })) as GraphQLResult<ListCardsQuery>;
      const items = result.data?.listCards?.items;
      if (items) setFieldCards(items);
    })();
  }, [authMode, isReady, roomId]);

  // Subscription
  useEffect(() => {
    if (!roomId || !isReady) return;
    // NOTE: 現状updateCardは利用していない（カードを更新する際はdeleteCard&createCardでやっている）
    const createCardListener: any = API.graphql({
      query: onCreateCardByRoomId,
      authMode,
      variables: { roomId } as OnCreateCardByRoomIdSubscriptionVariables,
    });
    if ('subscribe' in createCardListener) {
      createCardListener.subscribe({
        next: ({ value: { data } }: CreateCardSubscriptionEvent) => {
          if (data.onCreateCardByRoomId) {
            const newItem = data.onCreateCardByRoomId;
            setFieldCards((prev) => [...prev, newItem]);
          }
        },
      });
    }

    const deleteCardListener: any = API.graphql({
      query: onDeleteCardByRoomId,
      authMode,
      variables: { roomId },
    });
    if ('subscribe' in deleteCardListener) {
      deleteCardListener.subscribe({
        next: ({ value: { data } }: DeleteCardSubscriptionEvent) => {
          if (data.onDeleteCardByRoomId) {
            const deletedCard = data.onDeleteCardByRoomId;
            setFieldCards((prev) =>
              prev.filter((e) => e.id !== deletedCard.id)
            );
          }
        },
      });
    }

    return () => {
      if ('unsubscribe' in createCardListener) {
        createCardListener.unsubscribe();
      }
      if ('unsubscribe' in deleteCardListener) {
        deleteCardListener.unsubscribe();
      }
    };
  }, [authMode, isReady, roomId]);

  useEffect(() => {
    if (user) {
      const card = fieldCards.find((c) => c.username === user.username);
      if (card) {
        setMyCard(card);
        return;
      }
    }

    setMyCard(null);
  }, [fieldCards, user]);

  const handleOnClickPointButton = useCallback(
    (point: number | null) => async () => {
      if (myCard) {
        await API.graphql(
          graphqlOperation(deleteCard, { input: { id: myCard.id } })
        );
      }
      if (user && point) {
        await API.graphql(
          graphqlOperation(createCard, {
            input: {
              point,
              username: user.username,
              displayUserName: user.displayName,
              roomId,
            },
          })
        );
      }
    },
    [myCard, roomId, user]
  );

  const handleOnClear = useCallback(async () => {
    Promise.all(
      fieldCards.map(async (card) => {
        return await API.graphql(
          graphqlOperation(deleteCard, { input: { id: card.id } })
        );
      })
    );
    await API.graphql(
      graphqlOperation(updateRoom, {
        input: { id: roomId, isOpened: false },
      })
    );
  }, [fieldCards, roomId]);

  return {
    fieldCards,
    myCard,
    handleOnClear,
    handleOnClickPointButton,
  };
};
