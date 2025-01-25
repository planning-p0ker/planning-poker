import PiPIcon from '@mui/icons-material/PictureInPictureRounded';
import Button from '@mui/material/Button';
import PiPWindow, { usePiPWindow } from '../../../../../hooks/usePiP';
import { useCallback, useMemo } from 'react';
import { AverageDisplayProps, Parrot, PiPAverageDisplay } from '../AverageDisplay';
import { PointButtonsProps } from '../PointButtons';
import { OpenButtonProps, PiPOpenButton } from '../OpenButton';
import { ClearButtonProps, PiPClearButton } from '../ClearButton';
import { PiPParticipantList } from '../ParticipantList';
import { checkNeedsDiscussion } from '../../../../../utils/card';

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
    requestPipWindow();
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
          <div className='mx-auto h-full mt-5 content-center justify-center align-middle items-center'>
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
            <PiPDiscussion
              participants={participants}
              fieldCards={fieldCards}
              cards={cards}
              room={room}
            />
          </div>
        </PiPWindow>
      )}
    </div>
  );
}

const PiPDiscussion = ({ participants, cards, room, fieldCards }: Pick<PiPProps, "participants" | "cards" | "room" | "fieldCards">) => {

  const { isNeedDiscussion, maxPoint, minPoint } =
    checkNeedsDiscussion(fieldCards);

  const maxParticipantNameList = useMemo(() => {
    const maxUsername = fieldCards.filter((fc) => fc.point === maxPoint).map((fc) => fc.username);
    return participants.filter((p) => maxUsername.includes(p.username)).map((p) => p.displayUserName);
  }, [fieldCards, participants, maxPoint]);

  const minParticipantNameList = useMemo(() => {
    const minUsername = fieldCards.filter((fc) => fc.point === minPoint).map((fc) => fc.username);
    return participants.filter((p) => minUsername.includes(p.username)).map((p) => p.displayUserName);
  }, [fieldCards, participants, minPoint]);


  if (!room?.isOpened || !cards.length || !isNeedDiscussion) {
    return null;
  }

  return (
    <div className='flex justify-center mt-4 space-x-3 bg-back'>
      <details className='w-40'>
        <summary className='border border-black rounded p-2 cursor-pointer'><span className='mr-1'>🐛</span><span>{`< ${minPoint} pt`}</span></summary>
        <div className='border border-black rounded p-2 mt-2'>
          {minParticipantNameList.join(' / ')}
        </div>
      </details>
      <details className='w-40'>
        <summary className='border border-black rounded p-2 cursor-pointer'><span className='mr-1'>🐳</span><span>{`< ${minPoint} pt`}</span></summary>
        <div className='border border-black rounded p-2 mt-2'>
          {maxParticipantNameList.join(' / ')}
        </div>
      </details>
    </div>
  );
}