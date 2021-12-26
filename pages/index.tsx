import type { NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import Hand from '../src/components/Hand';
import Field from '../src/components/Field';
import Header from '../src/components/Header';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { deleteCard, createCard, updateRoom } from '../src/graphql/mutations';
import { Card } from '../src/API';
import { useUser } from '../src/hooks/useUser';
import { useCards } from '../src/hooks/useCards';
import { useRoom } from '../src/hooks/useRoom';

const Home: NextPage = () => {
  const { user, onSignIn, onSignOut } = useUser();
  const { fieldCards, myCard } = useCards(user);
  const room = useRoom('test');

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

  const handleOnClear = useCallback(async () => {
    Promise.all(
      fieldCards.map(async (card) => {
        return await API.graphql(
          graphqlOperation(deleteCard, { input: { id: card.id } })
        );
      })
    );
    await API.graphql(
      graphqlOperation(updateRoom, { input: { id: room?.id, isOpened: false } })
    );
  }, [fieldCards, room]);

  const handleOnOpen = useCallback(async () => {
    await API.graphql(
      graphqlOperation(updateRoom, { input: { id: room?.id, isOpened: true } })
    );
  }, [room]);

  return (
    <div>
      <Header
        displayName={user?.displayName}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <div className="mx-4">
        <Field
          hidden={!room?.isOpened}
          user={user}
          cards={fieldCards}
          onClickMyCard={handleOnClickFieldCard}
          onClear={handleOnClear}
          onOpen={handleOnOpen}
        />
        <Hand
          selectNum={myCard?.point}
          onClickCard={handleOnClickHandCard}
          disabledAll={!user || !!room?.isOpened}
        />
      </div>
    </div>
  );
};

export default Home;
