import { Box, Button, Modal, SxProps, TextField } from '@mui/material';
import React from 'react';

export type InputNameModalProps = {
  open: boolean;
  onClickEnter: () => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const style: SxProps = {
  position: 'absolute' as 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  maxHeight: 400,
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const InputNameModal: React.VFC<InputNameModalProps> = ({
  open,
  value,
  onChange,
  onClickEnter,
}) => {
  return (
    <Modal
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col space-y-4">
          <div className="text-center text-5xl mb-4">📝</div>
          <TextField label="YOUR NAME" value={value} onChange={onChange} />
          <Button
            disabled={!value}
            type="submit"
            variant="contained"
            onClick={onClickEnter}
          >
            ENTER
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
