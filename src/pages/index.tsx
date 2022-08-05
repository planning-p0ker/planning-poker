import type { NextPage } from 'next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { createRoom } from '../graphql/mutations';
import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';
import { generateUniqueRoomId } from '../utils/generateUniqueRoomId';
import { CreateRoomMutation, GetRoomQuery } from '../graphql/API';
import { TopPage } from '../components/pages/top';
import { getRoom } from '../graphql/queries';

const Home: NextPage = () => {
  const router = useRouter();
  const { user, onSignIn, onSignOut } = useUser(router, router.pathname);

  const [isCreateingRoom, setIsCreatingRoom] = useState(false);
  const handleOnCreateRoom = useCallback(() => {
    setIsCreatingRoom(true);
  }, []);

  const [isSearchingRoom, setIsSearchingRoom] = useState(false);
  const [isRoomNotFound, setIsRoomNotFound] = useState(false);
  const [roomId, setRoomId] = useState('');
  const onChangeRoomId = useCallback((ev) => {
    setRoomId(ev.target.value);
  }, []);
  const handleOnJoinRoom = useCallback(() => {
    setIsSearchingRoom(true);
  }, []);

  const authMode = useMemo(() => {
    return user
      ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      : GRAPHQL_AUTH_MODE.AWS_IAM;
  }, [user]);

  useEffect(() => {
    if (!isCreateingRoom) return;
    (async () => {
      const result = (await API.graphql(
        graphqlOperation(createRoom, {
          input: {
            id: generateUniqueRoomId(),
            isOpened: false,
          },
        })
      )) as GraphQLResult<CreateRoomMutation>;
      const resultCreateRoom = result.data?.createRoom;
      setIsCreatingRoom(false);
      if (resultCreateRoom) {
        router.push(`/rooms/${resultCreateRoom.id}`);
      }
    })();
  }, [isCreateingRoom, router]);

  useEffect(() => {
    if (!isSearchingRoom) return;
    (async () => {
      const result = (await API.graphql({
        query: getRoom,
        variables: { id: roomId },
        authMode,
      })) as GraphQLResult<GetRoomQuery>;
      setIsSearchingRoom(false);
      if (result.data?.getRoom) {
        router.push(`/rooms/${result.data.getRoom.id}`);
      } else {
        setIsRoomNotFound(true);
      }
    })();
  }, [authMode, isSearchingRoom, roomId, router]);

  return (
    <TopPage
      user={user}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
      onCreateRoom={handleOnCreateRoom}
      onJoinRoom={handleOnJoinRoom}
      isCreateingRoom={isCreateingRoom}
      isSearchingRoom={isSearchingRoom}
      roomId={roomId}
      onChangeRoomId={onChangeRoomId}
      isRoomNotFound={isRoomNotFound}
    />
  );
};

export default Home;
