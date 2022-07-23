import { useMemo } from 'react';
import { Card, Participant, Room } from '../../../API';
import { User } from '../../../hooks/useUser';
import AverageDisplay from './components/AverageDisplay';
import PointButtons from './components/PointButtons';
import ParticipantList from './components/ParticipantList';
import RoomIdPlate from './components/RoomIdPlate';
import { Layout } from '../../Layout';
import BigNumber from 'bignumber.js';
import { Button, CircularProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import InputNameModal, {
  InputNameModalProps,
} from './components/InputNameModal';

type RoomPageProps = {
  isLoading: boolean;
  user: User | null;
  room: Room | null;
  myCard: Card | null;
  fieldCards: Card[];
  participants: Participant[];
  onSignIn: () => void;
  onSignOut: () => void;
  onOpen: () => void;
  onClear: () => void;
  onClickPointButton: (num: number | null) => () => void;
  modalProps: InputNameModalProps;
};

export const RoomPage: React.VFC<RoomPageProps> = ({
  isLoading,
  user,
  room,
  myCard,
  fieldCards,
  participants,
  modalProps,
  onSignIn,
  onSignOut,
  onOpen,
  onClear,
  onClickPointButton,
}) => {
  const rate = useMemo(() => {
    return new BigNumber(fieldCards.length)
      .div(participants.length)
      .times(100)
      .toNumber();
  }, [fieldCards.length, participants.length]);

  return (
    <Layout user={user} onSignIn={onSignIn} onSignOut={onSignOut}>
      <InputNameModal {...modalProps} />
      <div className="mt-10 flex flex-col space-y-4 px-16">
        <RoomIdPlate isLoading={isLoading} roomId={room?.id || ''} />
        <div className="flex justify-end align-middle">
          <div className="flex space-x-6 mt-4 pr-3">
            <Button
              disabled={!user || fieldCards.length === 0 || room?.isOpened}
              variant={
                rate === 100 && fieldCards.length ? 'contained' : 'outlined'
              }
              onClick={onOpen}
              endIcon={
                fieldCards.length === 0 ? (
                  <CircularProgress size={20} color={'inherit'} />
                ) : (
                  <CircularProgress
                    size={20}
                    variant="determinate"
                    color={rate === 100 ? 'inherit' : 'primary'}
                    value={rate}
                  />
                )
              }
            >
              OPEN
            </Button>
            <Button
              color="secondary"
              variant={!room?.isOpened || !user ? 'outlined' : 'contained'}
              disabled={!user}
              onClick={onClear}
              endIcon={<ClearIcon />}
            >
              clear
            </Button>
          </div>
        </div>
        <div className="flex justify-center space-x-5 min-h-[208px] pb-4">
          <AverageDisplay
            hidden={!room?.isOpened}
            cards={fieldCards}
            className="flex-shrink max-w-[200px] min-w-[140px]"
          />
          <ParticipantList
            className="flex-shrink max-w-[400px] min-w-[140px]"
            isOpened={room?.isOpened || false}
            participants={participants}
            fieldsCard={fieldCards}
          />
        </div>
        <PointButtons
          selectNum={myCard?.point}
          onClickPointButton={onClickPointButton}
          disabledAll={isLoading || !user || !!room?.isOpened}
        />
      </div>
    </Layout>
  );
};
