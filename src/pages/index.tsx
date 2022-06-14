import type { NextPage } from 'next';
import React, { useCallback, useRef } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { createRoom } from '../graphql/mutations';
import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';
import { calcTtl } from '../utils/calcTtl';
import { generateUniqueRoomId } from '../utils/generateUniqueRoomId';
import { CreateRoomMutation } from '../API';
import { TopPage } from '../components/pages/top';

const Home: NextPage = () => {
  const router = useRouter();
  const { user, onSignIn, onSignOut } = useUser(router, router.pathname);
  const isLoading = useRef(false);
  const onCreateRoom = async () => {
    isLoading.current = true;
    const result = (await API.graphql(
      graphqlOperation(createRoom, {
        input: {
          id: generateUniqueRoomId(),
          isOpened: false,
          ttl: calcTtl(),
        },
      })
    )) as GraphQLResult<CreateRoomMutation>;
    const resultCreateRoom = result.data?.createRoom;
    if (resultCreateRoom) {
      router.push(`/rooms/${resultCreateRoom.id}`);
    }
    isLoading.current = false;
  };

  const onJoinRoom = useCallback(
    (roomId: string) => {
      router.push(`/rooms/${roomId}`);
    },
    [router]
  );

  return (
    <TopPage
      user={user}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
      isLoading={isLoading.current}
      onCreateRoom={onCreateRoom}
      onJoinRoom={onJoinRoom}
    />
  );
};

export default Home;
