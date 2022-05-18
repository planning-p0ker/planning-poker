import React, { useEffect, useMemo, useState } from 'react';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { listCards } from '../graphql/queries';
import {  onCreateCardByRoomId, onDeleteCardByRoomId } from '../graphql/subscriptions';
import { Card, ListCardsQuery, OnCreateCardByRoomIdSubscriptionVariables, OnCreateCardByRoomIdSubscription, OnDeleteCardByRoomIdSubscription } from '../API';
import { User } from './useUser';

type CreateCardSubscriptionEvent = { value: { data: OnCreateCardByRoomIdSubscription } };
type DeleteCardSubscriptionEvent = { value: { data: OnDeleteCardByRoomIdSubscription } };

export const useCards = (user: User | null, isReady: boolean, roomId?: string) => {
  const [fieldCards, setFieldCars] = useState<Card[]>([]);
  const [myCard, setMyCard] = useState<Card | null>(null);

  const authMode = useMemo(() => {
    return user ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS : GRAPHQL_AUTH_MODE.AWS_IAM
  }, [user]);

  useEffect(() => {
    if (!roomId || !isReady) return;
    (async () => {
      const result = await API.graphql({ query: listCards, authMode, variables: { filter: { roomId: { eq: roomId } } } });
      if ('data' in result && !!result.data) {
        const data = result.data as ListCardsQuery;
        if (!!data.listCards) {
          setFieldCars(data.listCards.items);
        }
      }
    })();

    // NOTE: 現状updateCardは利用していない（カードを更新する際はdeleteCard&createCardでやっている）

    const createCardListener: any = API.graphql({ query: onCreateCardByRoomId, authMode, variables: { roomId } as OnCreateCardByRoomIdSubscriptionVariables });
    if ('subscribe' in createCardListener) {
      createCardListener.subscribe({
        next: ({ value: { data } }: CreateCardSubscriptionEvent) => {
          if (data.onCreateCardByRoomId) {
            const newItem = data.onCreateCardByRoomId;
            setFieldCars((prev) => [...prev, newItem]);
          }
        },
      });
    }

    const deleteCardListener: any = API.graphql({ query: onDeleteCardByRoomId, authMode, variables: { roomId } });
    if ('subscribe' in deleteCardListener) {
      deleteCardListener.subscribe({
        next: ({ value: { data } }: DeleteCardSubscriptionEvent) => {
          if (data.onDeleteCardByRoomId) {
            const deletedCard = data.onDeleteCardByRoomId;
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