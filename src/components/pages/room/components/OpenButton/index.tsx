import { Button, CircularProgress } from '@mui/material';
import { Participant, Room } from '../../../../../graphql/API';
import type { User } from '../../../../../hooks/useUser';
import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { Card } from '../../../../../hooks/useCards';

type OpenButtonProps = {
  room: Room | null;
  user: User | null;
  participants: Participant[];
  fieldCards: Card[];
  onOpen: () => void;
};

export const OpenButton: React.VFC<OpenButtonProps> = ({
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
