import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Card, Room } from '../../../../../graphql/API';
import type { User } from '../../../../../hooks/useUser';
import { useMemo } from 'react';

type ClearButtonProps = {
  room: Room | null;
  user: User | null;
  fieldCards: Card[];
  onClear: () => void;
};

export const ClearButton: React.VFC<ClearButtonProps> = ({
  room,
  user,
  fieldCards,
  onClear,
}) => {
  const isReady = useMemo(
    () => !!(room?.isOpened && fieldCards.length),
    [fieldCards.length, room?.isOpened]
  );

  const disabled = useMemo(() => !user || !isReady, [isReady, user]);

  return (
    <Button
      color="secondary"
      variant={!room?.isOpened || !user ? 'outlined' : 'contained'}
      disabled={disabled}
      onClick={onClear}
      endIcon={<ClearIcon />}
    >
      CLEAR
    </Button>
  );
};
