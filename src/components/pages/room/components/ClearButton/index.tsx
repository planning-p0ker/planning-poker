import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Room } from '../../../../../graphql/API';
import type { User } from '../../../../../hooks/useUser';
import { Card } from '../../../../../hooks/useCards';

export type ClearButtonProps = {
  room: Room | null;
  user: User | null;
  fieldCards: Card[];
  onClear: () => void;
};

export const ClearButton: React.FC<ClearButtonProps> = ({
  room,
  user,
  fieldCards,
  onClear,
}) => {
  const disabled = !user || !room?.isOpened || fieldCards.length === 0;

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

export const PiPClearButton: React.FC<ClearButtonProps> = ({
  room,
  user,
  fieldCards,
  onClear,
}) => {
  const disabled = !user || !room?.isOpened || fieldCards.length === 0;

  return (
    <button
      disabled={disabled}
      onClick={onClear}
      className={`text-white py-2 px-4 rounded shadow-md bg-secondary w-20
        hover:bg-secondaryHover
        disabled:bg-back disabled:border disabled:border-black disabled:opacity-10 disabled:text-black disabled:shadow-none disabled:cursor-default`}
    >
      CLEAR
    </button>
  );
};

