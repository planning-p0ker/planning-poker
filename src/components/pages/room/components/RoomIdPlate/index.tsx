import { Card } from '@mui/material';
import type React from 'react';
import { useCallback, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type RoomIdPlateProps = {
  roomId: string;
  isLoading: boolean;
};

export const RoomIdPlate: React.FC<RoomIdPlateProps> = ({
  roomId,
  isLoading,
}) => {
  const [copied, setCopied] = useState(false);
  const clearCopied = useCallback(() => {
    setTimeout(() => {
      setCopied(false);
    }, 1 * 1000);
  }, []);

  const onClickRoomId = useCallback(() => {
    navigator.clipboard.writeText(roomId).then(() => {
      setCopied(true);
      clearCopied();
    });
  }, [clearCopied, roomId]);

  return (
    <Card className="p-4" elevation={0} variant="outlined">
      <div className={'flex'}>
        <div className="font-bold text-gray-500">ROOM ID :</div>
        {!isLoading && (
          <>
            <div
              className="cursor-pointer flex items-center"
              onClick={onClickRoomId}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onClickRoomId();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="font-bold ml-2">{roomId}</div>
              <ContentCopyIcon className="ml-2 w-4" />
            </div>
            <div
              className={`transition ml-4 font-bold text-green-500 delay-100 ${
                copied ? '' : 'hidden'
              }`}
            >
              Copied!
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
