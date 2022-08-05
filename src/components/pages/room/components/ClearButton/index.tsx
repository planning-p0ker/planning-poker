import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Card, Room } from '../../../../../graphql/API';
import type { User } from '../../../../../hooks/useUser';

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
  return (
    <Button
      color="secondary"
      variant={!room?.isOpened || !user ? 'outlined' : 'contained'}
      disabled={!user || !fieldCards.length}
      onClick={onClear}
      endIcon={<ClearIcon />}
    >
      CLEAR
    </Button>
  );
};
