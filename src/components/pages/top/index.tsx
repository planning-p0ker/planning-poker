import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardAction,
  CardContent,
  Fab,
  H5,
  Subtitle1,
  Subtitle2,
  TextField,
} from 'ui-neumorphism';
import { User } from '../../../hooks/useUser';
import Header from '../../Header';
import { Layout } from '../../Layout';

type TopPageProps = {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  isLoading: boolean;
  onCreateRoom: () => void;
  onJoinRoom: (roomId: string) => void;
};

export const TopPage: React.VFC<TopPageProps> = ({
  user,
  onSignIn,
  onSignOut,
  isLoading,
  onCreateRoom,
  onJoinRoom,
}) => {
  const [roomId, setRoomId] = useState('');
  const onChangeRoomId = useCallback((ev) => {
    console.log(ev.value);
    setRoomId(ev.value);
  }, []);

  return (
    <Layout user={user} onSignIn={onSignIn} onSignOut={onSignOut}>
      <div className="mx-4 pt-3">
        <Subtitle1>Use it to estimate story points online.</Subtitle1>
        <div className="mt-5 flex space-x-6">
          {/* CREATE */}
          <Card loading={isLoading}>
            <CardContent>
              <H5>CREATE YOUR ROOM</H5>
              <Subtitle2 secondary style={{ marginBottom: '12px' }}>
                You must be logged in to create a room
              </Subtitle2>
              <CardAction className="mt-2">
                <Button
                  onClick={onCreateRoom}
                  className={'w-full'}
                  disabled={!user || isLoading}
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
                <TextField
                  id="roomId"
                  value={roomId}
                  onChange={onChangeRoomId}
                />
                <Fab disabled={!roomId} onClick={() => onJoinRoom(roomId)}>
                  🚀
                </Fab>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
