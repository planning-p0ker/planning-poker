import type { NextPage } from 'next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createRoom } from '../graphql/mutations';
import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';
import { generateUniqueRoomId } from '../utils/generateUniqueRoomId';
import { TopPage } from '../components/pages/top';
import { getRoom } from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';

const Home: NextPage = () => {
  const router = useRouter();
  const { user, onSignIn, onSignOut } = useUser(router, router.pathname);
  const client = generateClient();

  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const handleOnCreateRoom = useCallback(() => {
    setIsCreatingRoom(true);
  }, []);

  const [isSearchingRoom, setIsSearchingRoom] = useState(false);
  const [isRoomNotFound, setIsRoomNotFound] = useState(false);
  const [roomId, setRoomId] = useState('');
  const onChangeRoomId = useCallback((roomId: string) => {
    setRoomId(roomId);
  }, []);
  const handleOnJoinRoom = useCallback(() => {
    setIsSearchingRoom(true);
  }, []);

  const authMode = useMemo(() => {
    return user
      ? "userPool"
      : "iam";
  }, [user]);

  useEffect(() => {
    if (!isCreatingRoom) return;
    (async () => {
      const result = (await client.graphql(
        {
          query: createRoom,
          variables: {
            input: {
              id: generateUniqueRoomId(),
              isOpened: false,
            }
          }
        })
      );
      const resultCreateRoom = result.data?.createRoom;
      if (resultCreateRoom) {
        router.push(`/rooms/${resultCreateRoom.id}`);
      }
      setIsCreatingRoom(false);
    })();
  }, [client, isCreatingRoom, router]);

  useEffect(() => {
    if (!isSearchingRoom) return;
    (async () => {
      const result = (await client.graphql({
        query: getRoom,
        variables: { id: roomId },
        authMode,
      }));
      if (result.data?.getRoom) {
        router.push(`/rooms/${result.data.getRoom.id}`);
      } else {
        setIsRoomNotFound(true);
      }
      setIsSearchingRoom(false);
    })();
  }, [authMode, client, isSearchingRoom, roomId, router]);

  return (
    <TopPage
      user={user}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
      onCreateRoom={handleOnCreateRoom}
      onJoinRoom={handleOnJoinRoom}
      isCreatingRoom={isCreatingRoom}
      isSearchingRoom={isSearchingRoom}
      roomId={roomId}
      onChangeRoomId={onChangeRoomId}
      isRoomNotFound={isRoomNotFound}
    />
  );
};

export default Home;
