import type { NextPage } from 'next';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { createParticipant } from '../../graphql/mutations';
import { useRouter } from 'next/router';
import { RoomPage } from '../../components/pages/room';
import { RoomNotFound } from '../../components/pages/room/components/RoomNotFound';
import { sortParticipants } from '../../utils/card';
import dayjs from 'dayjs';
import { useUser } from '../../hooks/useUser';
import { useRoom } from '../../hooks/useRoom';
import { useParticipant } from '../../hooks/useParticipant';
import { useCards } from '../../hooks/useCards';
import { useLeaveRoom } from '../../hooks/useLeaveRoom';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const RoomPageContainer: NextPage = () => {
  const router = useRouter();
  const { roomId } = router.query;

  const { user, authMode, onSignIn, onSignOut } = useUser(
    router,
    `/rooms/${roomId}`,
  );
  const { room, isLoading, handleOnOpen } = useRoom(
    client,
    authMode,
    router.isReady,
    roomId as string | undefined,
  );
  const { participants, setParticipants } = useParticipant(client, authMode, room, );
  const { fieldCards, myCard, handleOnClear, handleOnClickPointButton } =
    useCards(client, user, participants, room?.id, );
  const { handleOnSignOut } = useLeaveRoom(
    client,
    router,
    onSignOut,
    user,
    participants,
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
      setParticipants(sortParticipants(participants));
    }
  }, [fieldCards, participants, setParticipants, shouldSortCards]);

  // 名前入力モーダル表示
  const [openModal, setOpenModal] = useState(true);
  useLayoutEffect(() => {
    (async () => {
      try {
        await fetchUserAttributes();
      } catch {
        setOpenModal(false);
      }
    })();
  }, []);
  // 既に参加済みの場合は名前入力をスキップ
  useLayoutEffect(() => {
    if (user) {
      const isAllReadyJoin = participants.some(
        (p) => p.username === user?.username
      );
      setOpenModal(!isAllReadyJoin);
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
    if (!room?.id || !user) return;
    await client.graphql({
      query: createParticipant,
      variables: {
        input: {
          roomParticipantsId: room.id,
          username: user.username,
          displayUserName: inputName,
          ttl: dayjs().add(1, 'hour').unix(),
        },
      }});
    setOpenModal(false);
  }, [inputName, room?.id, user]);

  // 不正なroomIdの場合のレイアウト
  if (!isLoading && (!roomId || !room)) {
    return (
      <RoomNotFound user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
    );
  }

  console.log("test");

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
