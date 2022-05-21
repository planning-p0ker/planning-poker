import type { NextPage } from 'next';
import React, { useCallback, useRef, useState } from 'react';
import Header from '../src/components/Header';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { createRoom } from '../src/graphql/mutations';
import { useRouter } from 'next/router';
import { useUser } from '../src/hooks/useUser';
import Button from '../src/components/Button';
import Link from 'next/link';
import { calcTtl } from '../src/utils/calcTtl';
import { generateUniqueRoomId } from '../src/utils/generateUniqueRoomId';
import { CreateRoomMutation } from '../src/API';

const Home: NextPage = () => {
  const router = useRouter();
  const { user, onSignIn, onSignOut } = useUser(router, router.pathname);
  const isLoading = useRef(false);
  const [roomId, setRoomId] = useState('');
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

  const onChangeRoomId = useCallback((ev) => {
    setRoomId(ev.target.value);
  }, []);

  const onJoinRoom = useCallback(() => {
    router.push(`/rooms/${roomId}`);
  }, [roomId, router]);

  return (
    <div>
      <Header
        displayName={user?.displayName}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <div className="mx-4 flex space-x-10 items-center justify-between">
        <Button
          disabled={!user || isLoading.current}
          onClick={onCreateRoom}
          width={34}
        >
          <>
            create room
            <br />
            🏗️
          </>
        </Button>
        <div className="flex">
          <input
            onChange={onChangeRoomId}
            className="border-2 rounded mr-2 px-2 shadow"
            placeholder="ROOM ID"
          />
          <Button
            primary={true}
            disabled={isLoading.current || !roomId}
            onClick={onJoinRoom}
          >
            join room 🏠
          </Button>
        </div>
        <br />
        <div className="text-blue-600 hover:underline">
          <Link href="/test">Next.js勉強用のテストページ</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
