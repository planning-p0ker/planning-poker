import PiPIcon from '@mui/icons-material/PictureInPictureRounded';
import Button from '@mui/material/Button';
import PiPWindow, { usePiPWindow } from '../../../../../hooks/usePiP';
import { useCallback } from 'react';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { AverageDisplayProps, PiPAverageDisplay } from '../AverageDisplay';
import { PointButtonsProps } from '../PointButtons';
import { OpenButton, OpenButtonProps, PiPOpenButton } from '../OpenButton';
import { ClearButton, ClearButtonProps, PiPClearButton } from '../ClearButton';
import { PiPParticipantList } from '../ParticipantList';

type PiPProps = AverageDisplayProps & PointButtonsProps & OpenButtonProps & ClearButtonProps;

export const PiP = ({
  roomUpdatedAt,
  hidden,
  cards,
  room,
  user,
  fieldCards,
  participants,
  onOpen,
  onClear,
  selectNum,
  onClickPointButton,
  disabledAll,
}: PiPProps) => {
  const { isSupported, requestPipWindow, pipWindow, closePipWindow } =
    usePiPWindow();

  const startPiP = useCallback(() => {
    requestPipWindow(300, 200);
  }, [requestPipWindow]);


  if (!isSupported) {
    return null;
  }

  return (
    <div className='mx-auto'>
      <Button variant="text" startIcon={<PiPIcon />} onClick={pipWindow ? closePipWindow : startPiP}>
        {pipWindow ? 'Close PIP' : 'Open PIP'}
      </Button>
      {pipWindow && (
        <PiPWindow pipWindow={pipWindow}>
          <div className='mx-auto my-auto h-40 content-center justify-center align-middle items-center'>
            <div className='flex justify-center space-x-4 items-center'>
              <PiPAverageDisplay
                roomUpdatedAt={roomUpdatedAt}
                hidden={hidden}
                cards={cards}
              />
              <div className='flex-col'>
                <div className="flex space-x-2">
                  <PiPOpenButton
                    room={room}
                    user={user}
                    fieldCards={fieldCards}
                    participants={participants}
                    onOpen={onOpen}
                  />
                  <PiPClearButton
                    room={room}
                    user={user}
                    fieldCards={fieldCards}
                    onClear={onClear}
                  />
                </div>
                <div className='flex mt-4 items-center space-x-2 justify-between'>
                  <PiPParticipantList participants={participants} fieldsCard={fieldCards} isOpened={room?.isOpened || false} />
                  <select
                    value={selectNum ?? ""}
                    disabled={disabledAll}
                    onChange={(ev) => {
                      const point = ev.target.value;
                      console.log('point', point);
                      if (isNaN(Number(point))) {
                        onClickPointButton(null)();
                      } else {
                        onClickPointButton(Number(point))();
                      }
                    }}
                    className='border border-black rounded block p-2 font-bold text-lg w-20'
                  >
                    <option value={""}>🤔</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={8}>8</option>
                    <option value={13}>13</option>
                    <option value={21}>21</option>
                    <option value={34}>34</option>
                    <option value={55}>55</option>
                    <option value={89}>89</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </PiPWindow>
      )}
    </div>
  );
}