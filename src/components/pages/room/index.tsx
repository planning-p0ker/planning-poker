import { Card, Participant, Room } from '../../../API';
import { User } from '../../../hooks/useUser';
import AverageDisplay from './components/AverageDisplay';
import PointButtons from './components/PointButtons';
import ParticipantList from './components/ParticipantList';
import RoomIdPlate from './components/RoomIdPlate';
import { Layout } from '../../Layout';
import { useCallback, useMemo, useState } from 'react';
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
  onClickFieldCard: (card: Card) => void;
  onClickHandCard: (num: number | null) => () => void;
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
  onClickFieldCard,
  onClickHandCard,
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
                <CircularProgress
                  size={20}
                  variant="determinate"
                  color={rate === 100 ? 'inherit' : 'primary'}
                  value={rate}
                />
              }
            >
              OPEN
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              disabled={!user || fieldCards.length === 0}
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
            user={user}
            cards={fieldCards}
            onClickMyCard={onClickFieldCard}
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
          onClickCard={onClickHandCard}
          disabledAll={isLoading || !user || !!room?.isOpened}
        />
      </div>
    </Layout>
  );
};
