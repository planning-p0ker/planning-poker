import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listCards } from '../graphql/queries';
import { onCreateCard, onDeleteCard } from '../graphql/subscriptions';
import { Card, ListCardsQuery, OnCreateCardSubscription, OnDeleteCardSubscription } from '../API';

type CreateCardSubscriptionEvent = { value: { data: OnCreateCardSubscription } };
type DeleteCardSubscriptionEvent = { value: { data: OnDeleteCardSubscription } };

export const useFieldCardSubscription = () => {
  const [fieldCards, setFieldCars] = useState<Card[]>([]);
  useEffect(() => {
    (async () => {
      const result = await API.graphql(graphqlOperation(listCards));
      if ('data' in result && !!result.data) {
        const data = result.data as ListCardsQuery;
        if (!!data.listCards) {
          setFieldCars(data.listCards.items);
        }
      }
    })();

    const createCardListener = API.graphql(graphqlOperation(onCreateCard));
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

    const deleteCardListener = API.graphql(graphqlOperation(onDeleteCard));
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
  }, []);

  return fieldCards;
};