import React, { useCallback, useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

const RoomIdPlate: React.VFC<{
  roomId: string;
  isLoading: boolean;
}> = ({ roomId, isLoading }) => {
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
    <div>
      <div className={'flex'}>
        <div className="font-bold text-gray-500">ROOM ID :</div>
        {!isLoading && (
          <>
            <div
              className="cursor-pointer flex items-center"
              onClick={onClickRoomId}
            >
              <div className="font-bold ml-2">{roomId}</div>
              <AiOutlineCopy className="ml-2" />
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
    </div>
  );
};

export default RoomIdPlate;
