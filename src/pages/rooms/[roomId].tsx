import type { NextPage } from 'next';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createParticipant } from '../../graphql/mutations';
import { CreateParticipantInput } from '../../API';
import { useRouter } from 'next/router';
import {
  useUser,
  useCards,
  useRoom,
  useParticipant,
  useLeaveRoom,
} from '../../hooks';
import { RoomPage } from '../../components/pages/room';
import { RoomNotFound } from '../../components/pages/room/components/RoomNotFound';

const RoomPageContainer: NextPage = () => {
  const router = useRouter();
  const { roomId } = router.query;

  const { user, authMode, onSignIn, onSignOut } = useUser(
    router,
    `/rooms/${roomId}`
  );
  const { room, isLoading, handleOnOpen } = useRoom(
    authMode,
    router.isReady,
    roomId as string | undefined
  );
  const participants = useParticipant(authMode, room);
  const { fieldCards, myCard, handleOnClear, handleOnClickPointButton } =
    useCards(user, authMode, router.isReady, roomId as string | undefined);
  const { handleOnSignOut } = useLeaveRoom(
    router,
    onSignOut,
    user,
    myCard,
    participants
  );

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

  if (!isLoading && (!roomId || !room)) {
    return (
      <RoomNotFound user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
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
      onClickPointButton={handleOnClickPointButton}
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
