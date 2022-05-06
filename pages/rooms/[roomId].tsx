import type { NextPage } from 'next';
import React, { useCallback } from 'react';
import Hand from '../../src/components/Hand';
import Field from '../../src/components/Field';
import Header from '../../src/components/Header';
import RoomIdPlate from '../../src/components/RoomIdPlate';
import { API, graphqlOperation } from 'aws-amplify';
import {
  deleteCard,
  createCard,
  updateRoom,
} from '../../src/graphql/mutations';
import { Card } from '../../src/API';
import { useRouter } from 'next/router';
import { useUser } from '../../src/hooks/useUser';
import { useCards } from '../../src/hooks/useCards';
import { useRoom } from '../../src/hooks/useRoom';

const Room: NextPage = () => {
  const router = useRouter();
  const { roomId } = router.query;

  const { user, onSignIn, onSignOut } = useUser(router, `/rooms/${roomId}`);
  const room = useRoom(user, router.isReady, roomId as string | undefined);
  const { fieldCards, myCard } = useCards(
    user,
    router.isReady,
    roomId as string | undefined
  );

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
              roomId,
            },
          })
        );
      }
    },
    [myCard, roomId, user]
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
  }, [fieldCards, room?.id]);

  const handleOnOpen = useCallback(async () => {
    await API.graphql(
      graphqlOperation(updateRoom, { input: { id: room?.id, isOpened: true } })
    );
  }, [room]);

  if (!roomId || !room) {
    return (
      <div>
        <Header
          displayName={user?.displayName}
          onSignIn={onSignIn}
          onSignOut={onSignOut}
        />
        <div className="mx-4">room not found</div>
      </div>
    );
  }

  return (
    <div>
      <Header
        displayName={user?.displayName}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <div className="mx-4">
        <RoomIdPlate roomId={room?.id || ''} />
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

export default Room;
