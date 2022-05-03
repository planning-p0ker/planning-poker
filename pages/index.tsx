import type { NextPage } from 'next';
import React, { useRef } from 'react';
import Header from '../src/components/Header';
import { API, graphqlOperation, Auth } from 'aws-amplify';
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
  const { user, onSignIn, onSignOut } = useUser();
  const isLoading = useRef(false);
  const onCreateRoom = async () => {
    isLoading.current = true;
    const result = (await API.graphql(
      graphqlOperation(createRoom, {
        input: { id: generateUniqueRoomId(), isOpened: false },
      })
    )) as any;
    console.log(result);
    router.push(`/rooms/${result.data.createRoom.id}`);
    isLoading.current = false;
  };

  return (
    <div>
      <Header
        displayName={user?.displayName}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <div className="mx-4">
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
        <br />
        <br />
        {/* <input className="border-2" value={'!'} />
        <Button disabled={isLoading.current}>join room🏠</Button> */}
      </div>
    </div>
  );
};

export default Home;
