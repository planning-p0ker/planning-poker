import type { GetServerSideProps, NextPage } from 'next';
import React, { useCallback } from 'react';
import Header from '../../components/Header';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteCard, createCard, updateRoom } from '../../graphql/mutations';
import { Card, GetRoomQuery, Participant, Room } from '../../API';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { useCards } from '../../hooks/useCards';
import { useRoom } from '../../hooks/useRoom';
import { calcTtl } from '../../utils/calcTtl';
import { RoomPage } from '../../components/pages/room';
import { useParticipant } from '../../hooks/useParticipant';
import { getRoom } from '../../graphql/queries';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';

type Props = {
  rooom: Room;
  // participants: Participant[];
  // fieldsCard: Card[];
};

const RoomPageContainer: NextPage<Props> = ({ rooom }) => {
  console.log('SSR room: ', rooom);
  const router = useRouter();
  const { roomId } = router.query;

  const { user, onSignIn, onSignOut } = useUser(router, `/rooms/${roomId}`);
  const room = useRoom(user, router.isReady, roomId as string | undefined);
  const participants = useParticipant(user, room);
  const { fieldCards, myCard } = useCards(
    user,
    router.isReady,
    roomId as string | undefined
  );
  const deleteParticipant = useCallback(async () => {
    if (!user) return;

    const myParicipant = participants.find(
      (p) => p.username === user?.username
    );
    if (!myParicipant) return;

    await API.graphql(
      graphqlOperation(deleteParticipant, {
        input: {
          id: myParicipant.id,
        },
      })
    );
  }, [participants, user]);

  const handleOnSignOut = useCallback(async () => {
    await deleteParticipant();
    onSignOut();
  }, [deleteParticipant, onSignOut]);

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
      participants={participants}
      onSignIn={onSignIn}
      onSignOut={handleOnSignOut}
      onOpen={handleOnOpen}
      onClear={handleOnClear}
      onClickFieldCard={handleOnClickFieldCard}
      onClickHandCard={handleOnClickHandCard}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const roomId = context.query.roomId;
  const room = (await API.graphql({
    query: getRoom,
    variables: { id: roomId },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
  })) as GraphQLResult<GetRoomQuery>;
  return {
    props: {
      room,
    }, // will be passed to the page component as props
  };
};

export default RoomPageContainer;
