import {
  Button,
  Card,
  CardContent,
  Divider,
  Fab,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from '@mui/material';
import { User } from '../../../hooks/useUser';
import { Layout } from '../../Layout';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type TopPageProps = {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onCreateRoom: () => void;
  isCreateingRoom: boolean;
  isSearchingRoom: boolean;
  onJoinRoom: (roomId: string) => void;
  roomId: string;
  onChangeRoomId: (ev: any) => void;
  isRoomNotFound: boolean;
};

export const TopPage: React.VFC<TopPageProps> = ({
  user,
  onSignIn,
  onSignOut,
  onCreateRoom,
  onJoinRoom,
  isCreateingRoom,
  roomId,
  onChangeRoomId,
  isSearchingRoom,
  isRoomNotFound,
}) => {
  return (
    <Layout user={user} onSignIn={onSignIn} onSignOut={onSignOut}>
      <div className="mx-4 pt-3">
        <div className="mt-5 flex space-x-8">
          <Card className="w-72" elevation={0}>
            {isCreateingRoom && <LinearProgress />}
            <CardContent>
              <h2 className="font-bold" style={{ marginBottom: '12px' }}>
                CREATE ROOM
              </h2>
              <p
                style={{ marginBottom: '20px' }}
                className="text-center text-5xl"
              >
                👩‍🔧🏗️👨‍🏭
              </p>
              <Button
                variant="outlined"
                onClick={onCreateRoom}
                className={'w-full border'}
                disabled={!user || isCreateingRoom || isSearchingRoom}
              >
                CREATE ROOM
              </Button>
            </CardContent>
          </Card>
          <Card elevation={0}>
            {isSearchingRoom && <LinearProgress />}
            <CardContent>
              <h2 className="font-bold" style={{ marginBottom: '12px' }}>
                JOIN ROOM
              </h2>
              <p
                style={{ marginBottom: '12px' }}
                className="text-center text-5xl"
              >
                🏠🏃‍♀️🏃‍♂️
              </p>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <OutlinedInput
                  placeholder="ROOM ID"
                  error={isRoomNotFound}
                  onChange={onChangeRoomId}
                  endAdornment={
                    <InputAdornment position="end">
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <IconButton
                        disabled={!roomId}
                        onClick={() => onJoinRoom(roomId)}
                      >
                        <ArrowForwardIcon
                          color={
                            isRoomNotFound
                              ? 'error'
                              : roomId
                              ? 'primary'
                              : 'disabled'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {isRoomNotFound && (
                  <FormHelperText error>NOT FOUND</FormHelperText>
                )}
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
