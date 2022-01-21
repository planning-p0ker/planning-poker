import React, { useEffect, useMemo, useState } from 'react';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { listCards } from '../graphql/queries';
import { onCreateCard, onDeleteCard } from '../graphql/subscriptions';
import { Card, ListCardsQuery, OnCreateCardSubscription, OnDeleteCardSubscription } from '../API';
import { User } from './useUser';

type CreateCardSubscriptionEvent = { value: { data: OnCreateCardSubscription } };
type DeleteCardSubscriptionEvent = { value: { data: OnDeleteCardSubscription } };

export const useCards = (user: User | null, isReady: boolean, roomId?: string) => {
  const [fieldCards, setFieldCars] = useState<Card[]>([]);
  const [myCard, setMyCard] = useState<Card | null>(null);

  const authMode = useMemo(() => {
    return user ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS : GRAPHQL_AUTH_MODE.AWS_IAM
  }, [user]);

  useEffect(() => {
    if (!roomId || !isReady) return;
    (async () => {
      const result = await API.graphql({ query: listCards, authMode, variables: { roomId } });
      if ('data' in result && !!result.data) {
        const data = result.data as ListCardsQuery;
        if (!!data.listCards) {
          setFieldCars(data.listCards.items);
        }
      }
    })();

    const createCardListener = API.graphql({ query: onCreateCard, authMode, variables: { roomId } });
    if ('subscribe' in createCardListener) {
      createCardListener.subscribe({
        next: ({ value: { data } }: CreateCardSubscriptionEvent) => {
          if (data.onCreateCard) {
            const newItem = data.onCreateCard;
            setFieldCars((prev) => [...prev, newItem]);
          }
        },
      });
    }

    const deleteCardListener = API.graphql({ query: onDeleteCard, authMode, variables: { roomId } });
    if ('subscribe' in deleteCardListener) {
      deleteCardListener.subscribe({
        next: ({ value: { data } }: DeleteCardSubscriptionEvent) => {
          if (data.onDeleteCard) {
            const deletedCard = data.onDeleteCard;
            setFieldCars((prev) => prev.filter((e) => e.id !== deletedCard.id));
          }
        },
      });
    }
  }, [authMode, isReady, roomId]);

  useEffect(() => {
    if (user) {
      const card = fieldCards.find(c => c.username === user.username);
      if (card) {
        setMyCard(card);
        return;
      }
    }

    setMyCard(null);
  }, [fieldCards, user]);

  return { fieldCards, myCard };
};