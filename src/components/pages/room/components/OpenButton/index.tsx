import { Button, CircularProgress } from '@mui/material';
import { Participant, Room } from '../../../../../graphql/API';
import type { User } from '../../../../../hooks/useUser';
import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { Card } from '../../../../../hooks/useCards';

export type OpenButtonProps = {
  room: Room | null;
  user: User | null;
  participants: Participant[];
  fieldCards: Card[];
  onOpen: () => void;
};

export const OpenButton: React.FC<OpenButtonProps> = ({
  room,
  user,
  fieldCards,
  participants,
  onOpen,
}) => {
  const rate = useMemo(() => {
    return new BigNumber(fieldCards.length)
      .div(participants.length)
      .times(100)
      .toNumber();
  }, [fieldCards.length, participants.length]);

  return (
    <Button
      disabled={!user || fieldCards.length === 0 || room?.isOpened}
      variant={rate === 100 && fieldCards.length ? 'contained' : 'outlined'}
      onClick={onOpen}
      endIcon={
        fieldCards.length === 0 ? (
          <CircularProgress
            variant="determinate"
            size={20}
            color={'inherit'}
            value={100}
          />
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
  );
};

export const PiPOpenButton: React.FC<OpenButtonProps> = ({
  room,
  user,
  fieldCards,
  participants,
  onOpen,
}) => {
  return (
    <button
      disabled={!user || fieldCards.length === 0 || room?.isOpened}
      onClick={onOpen}
      className={`text-white py-2 px-4 rounded shadow-md bg-primary w-20
        hover:bg-primaryHover
        disabled:bg-back disabled:border disabled:border-black disabled:opacity-10 disabled:text-black disabled:shadow-none disabled:cursor-default`}
    >
      OPEN
    </button>
  );
};
