import type { NextPage } from 'next';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Header from '../../components/Header';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  deleteCard,
  createCard,
  updateRoom,
  deleteParticipant,
  createParticipant,
} from '../../graphql/mutations';
import {
  Card,
  CreateParticipantInput,
  CreateParticipantMutation,
} from '../../API';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { useCards } from '../../hooks/useCards';
import { useRoom } from '../../hooks/useRoom';
import { calcTtl } from '../../utils/calcTtl';
import { RoomPage } from '../../components/pages/room';
import { useParticipant } from '../../hooks/useParticipant';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';

const RoomPageContainer: NextPage = () => {
  const router = useRouter();
  const { roomId } = router.query;

  const { user, onSignIn, onSignOut } = useUser(router, `/rooms/${roomId}`);
  const { room, isLoading } = useRoom(
    user,
    router.isReady,
    roomId as string | undefined
  );
  const participants = useParticipant(user, room);
  const { fieldCards, myCard } = useCards(
    user,
    router.isReady,
    roomId as string | undefined
  );
  const [isSignOut, setIsSignOut] = useState(false);

  const [openModal, setOpenModal] = useState(true);
  useLayoutEffect(() => {
    (async () => {
      try {
        await Auth.currentAuthenticatedUser();
      } catch {
        setOpenModal(false);
      }
    })();
  }, []);

  const [inputName, setInputName] = useState(user?.displayName || '');
  useEffect(() => {
    if (user?.displayName) {
      setInputName(user.displayName);
    }
  }, [user?.displayName]);
  const handleOnChangeInputName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputName(event.target.value);
    },
    []
  );

  const handleOnClickEnter = useCallback(async () => {
    if (!room?.id) return;
    if (!user) return;

    await API.graphql(
      graphqlOperation(createParticipant, {
        input: {
          roomParticipantsId: room.id,
          username: user.username,
          displayUserName: inputName,
        } as CreateParticipantInput,
      })
    );

    setOpenModal(false);
  }, [inputName, room, user]);

  const handleOnSignOut = useCallback(async () => {
    // カード削除
    if (myCard) {
      await API.graphql(
        graphqlOperation(deleteCard, { input: { id: myCard.id } })
      );
    }
    // 参加者情報削除
    const myParicipant = participants.find(
      (p) => p.username === user?.username
    );
    if (myParicipant) {
      await API.graphql(
        graphqlOperation(deleteParticipant, {
          input: {
            id: myParicipant.id,
          },
        })
      );
    }
    setIsSignOut(true);
  }, [myCard, participants, user?.username]);

  useEffect(() => {
    if (!isSignOut) return;
    onSignOut();
  }, [isSignOut, onSignOut]);

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

  if (!isLoading && (!roomId || !room)) {
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
      isLoading={isLoading}
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
      modalProps={{
        open: openModal,
        onClickEnter: handleOnClickEnter,
        value: inputName,
        onChange: handleOnChangeInputName,
      }}
    />
  );
};

export default RoomPageContainer;
