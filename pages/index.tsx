import type { NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import Hand from '../src/components/Hand';
import Field from '../src/components/Field';
import Header from '../src/components/Header';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { deleteCard, createCard } from '../src/graphql/mutations';
import { Card } from '../src/API';
import { useUser } from '../src/hooks/useUser';
import { useFieldCardSubscription } from '../src/hooks/useFieldCardSubscription';

const Home: NextPage = () => {
  const [selectNum, setSelectNum] = useState<number | null>(null);
  const [hidden, setHidden] = useState(true);
  const { user, onSignIn, onSignOut } = useUser();
  const fieldCards = useFieldCardSubscription();

  const onDeleteCard = useCallback(
    async (card: Card[]) => {
      if (!!user) {
        const myCard = card.find((c) => c.username === user?.username);
        if (myCard) {
          await API.graphql(
            graphqlOperation(deleteCard, { input: { id: myCard.id } })
          );
        }
      }
    },
    [user]
  );

  const handleOnClickHandCard = useCallback(
    (point: number | null) => async () => {
      if (!!user) {
        if (!point) {
          // 場に出しているカードと同じポイントのカードをクリック
          await onDeleteCard(fieldCards);
          setSelectNum(null);
        } else {
          // 場に出しているカードと異なるカードをクリック
          await onDeleteCard(fieldCards);
          await API.graphql(
            graphqlOperation(createCard, {
              input: {
                point,
                username: user.username,
                displayUserName: user.displayName,
              },
            })
          );
          setSelectNum(point);
        }
      }
    },
    [fieldCards, onDeleteCard, user]
  );

  const handleOnClickFieldCard = useCallback(async (card: Card) => {
    await API.graphql(graphqlOperation(deleteCard, { input: { id: card.id } }));
    setSelectNum(null);
  }, []);

  const handleOnClearAllCards = useCallback(() => {
    setSelectNum(null);
    setHidden(true);
    Promise.all(
      fieldCards.map(async (card) => {
        return await API.graphql(
          graphqlOperation(deleteCard, { input: { id: card.id } })
        );
      })
    );
  }, [fieldCards]);

  return (
    <div>
      <Header
        displayName={user?.displayName}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <div className="mx-4">
        <Field
          hidden={hidden}
          setHidden={() => setHidden(false)}
          user={user}
          cards={fieldCards}
          onClickMyCard={handleOnClickFieldCard}
          onClearAllCards={handleOnClearAllCards}
        />
        <Hand
          selectNum={selectNum}
          onClickCard={handleOnClickHandCard}
          disabledAll={!user}
        />
      </div>
    </div>
  );
};

export default Home;
