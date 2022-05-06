import type { NextPage } from 'next';
import React, { useCallback, useRef, useState } from 'react';
import Header from '../src/components/Header';
import { API, graphqlOperation } from 'aws-amplify';
import { createRoom } from '../src/graphql/mutations';
import { useRouter } from 'next/router';
import { useUser } from '../src/hooks/useUser';
import Button from '../src/components/Button';

// https://qiita.com/coa00/items/679b0b5c7c468698d53f
function generateUniqueRoomId(): string {
  let strong = 1000;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
}

const Home: NextPage = () => {
  const router = useRouter();
  const { user, onSignIn, onSignOut } = useUser(router, router.pathname);
  const isLoading = useRef(false);
  const [roomId, setRoomId] = useState('');
  const onCreateRoom = async () => {
    isLoading.current = true;
    const result = (await API.graphql(
      graphqlOperation(createRoom, {
        input: { id: generateUniqueRoomId(), isOpened: false },
      })
    )) as any;
    router.push(`/rooms/${result.data.createRoom.id}`);
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
      </div>
    </div>
  );
};

export default Home;
