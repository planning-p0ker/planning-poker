import type { NextPage } from 'next';
import React, { useCallback } from 'react';
import Header from '../../components/Header';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteCard, createCard, updateRoom } from '../../graphql/mutations';
import { Card } from '../../API';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { useCards } from '../../hooks/useCards';
import { useRoom } from '../../hooks/useRoom';
import { calcTtl } from '../../utils/calcTtl';
import { RoomPage } from '../../components/pages/room';

const RoomPageContainer: NextPage = () => {
  const router = useRouter();
  const { roomId } = router.query;

  const { user, onSignIn, onSignOut } = useUser(router, `/rooms/${roomId}`);
  const room = useRoom(user, router.isReady, roomId as string | undefined);
  // const participants = useParticipant(user, room);
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
              ttl: calcTtl(),
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
      graphqlOperation(updateRoom, {
        input: { id: room?.id, isOpened: false, ttl: calcTtl() },
      })
    );
  }, [fieldCards, room?.id]);

  const handleOnOpen = useCallback(async () => {
    await API.graphql(
      graphqlOperation(updateRoom, {
        input: { id: room?.id, isOpened: true, ttl: calcTtl() },
      })
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
    <RoomPage
      user={user}
      room={room}
      myCard={myCard}
      fieldCards={fieldCards}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
      onOpen={handleOnOpen}
      onClear={handleOnClear}
      onClickFieldCard={handleOnClickFieldCard}
      onClickHandCard={handleOnClickHandCard}
    />
  );
};

export default RoomPageContainer;
