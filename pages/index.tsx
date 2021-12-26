import type { NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import Hand from '../src/components/Hand';
import Field from '../src/components/Field';
import Header from '../src/components/Header';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { deleteCard, createCard } from '../src/graphql/mutations';
import { Card } from '../src/API';
import { useUser } from '../src/hooks/useUser';
import { useCards } from '../src/hooks/useCards';

const Home: NextPage = () => {
  const [hidden, setHidden] = useState(true);
  const { user, onSignIn, onSignOut } = useUser();
  const { fieldCards, myCard } = useCards(user);

  const handleOnClickHandCard = useCallback(
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
            },
          })
        );
      }
    },
    [myCard, user]
  );

  const handleOnClickFieldCard = useCallback(async (card: Card) => {
    await API.graphql(graphqlOperation(deleteCard, { input: { id: card.id } }));
  }, []);

  const handleOnClearAllCards = useCallback(() => {
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
          selectNum={myCard?.point}
          onClickCard={handleOnClickHandCard}
          disabledAll={!user}
        />
      </div>
    </div>
  );
};

export default Home;
