import type { NextPage } from 'next';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createParticipant } from '../../graphql/mutations';
import { CreateParticipantInput } from '../../graphql/API';
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
import { sortParticipants } from '../../utils/card';
import dayjs from 'dayjs';

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
  const { participants, setParicipants } = useParticipant(authMode, room);
  const { fieldCards, myCard, handleOnClear, handleOnClickPointButton } =
    useCards(user, participants, authMode,);
  const { handleOnSignOut } = useLeaveRoom(
    router,
    onSignOut,
    user,
    myCard,
    participants
  );

  // カードオープン時にポイント順に並び替え
  const [shouldSortCards, setShouldSortCards] = useState(false);
  useEffect(() => {
    if (room?.isOpened) {
      setShouldSortCards(true);
    }
  }, [room?.isOpened]);
  useEffect(() => {
    if (shouldSortCards) {
      setShouldSortCards(false);
      setParicipants(sortParticipants(participants, fieldCards));
    }
  }, [fieldCards, participants, setParicipants, shouldSortCards]);

  // 名前入力モーダル表示
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
  // 既に参加済みの場合は名前入力をスキップ
  useLayoutEffect(() => {
    if (user) {
      const isAllreadyJoin = participants.some(
        (p) => p.username === user?.username
      );
      setOpenModal(!isAllreadyJoin);
    }
  }, [participants, user]);

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

  // 名前入力モーダルのENTERボタン押下時のコールバック関数
  const handleOnClickEnter = useCallback(async () => {
    if (!room?.id) return;
    if (!user) return;

    await API.graphql(
      graphqlOperation(createParticipant, {
        input: {
          roomParticipantsId: room.id,
          username: user.username,
          displayUserName: inputName,
          ttl: dayjs().add(1, 'hour').unix(),
        } as CreateParticipantInput,
      })
    );

    setOpenModal(false);
  }, [inputName, room, user]);

  // 不正なroomIdの場合のレイアウト
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
