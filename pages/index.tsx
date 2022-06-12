import type { NextPage } from 'next';
import React, { useCallback, useRef, useState } from 'react';
import Header from '../src/components/Header';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { createRoom } from '../src/graphql/mutations';
import { useRouter } from 'next/router';
import { useUser } from '../src/hooks/useUser';
// import Button from '../src/components/Button';
import { calcTtl } from '../src/utils/calcTtl';
import { generateUniqueRoomId } from '../src/utils/generateUniqueRoomId';
import { CreateRoomMutation } from '../src/API';
import Image from 'next/image';
import topImage from '../public/topImage.png';
import {
  Body2,
  Card,
  CardAction,
  CardContent,
  H5,
  Subtitle2,
  TextField,
  Button,
  Fab,
  Subtitle1,
} from 'ui-neumorphism';

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
    console.log('ev', ev);
    setRoomId(ev.value);
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
      <div className="mx-4 pt-3">
        <Subtitle1>Use it to estimate story points online.</Subtitle1>
        <div className="mt-5 flex space-x-6">
          {/* CREATE */}
          <Card loading={isLoading.current}>
            <CardContent>
              <H5>CREATE YOUR ROOM</H5>
              {/* TODO: 未ログイン時のみ表示したい注釈 */}
              <Subtitle2 secondary style={{ marginBottom: '12px' }}>
                You must be logged in to create a room
              </Subtitle2>
              <CardAction className="mt-2">
                <Button
                  onClick={onCreateRoom}
                  className={'w-full'}
                  disabled={!user || isLoading.current}
                >
                  🏗️
                </Button>
              </CardAction>
            </CardContent>
          </Card>

          {/* JOIN */}
          <Card>
            <CardContent>
              <H5>JOIN ROOM</H5>
              <Subtitle2 secondary style={{ marginBottom: '12px' }}>
                {"Enter your team's  roomID"}
              </Subtitle2>
              <div className="flex">
                <TextField value={roomId} onChange={onChangeRoomId} />
                <Fab disabled={!roomId} onClick={onJoinRoom}>
                  🚀
                </Fab>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
