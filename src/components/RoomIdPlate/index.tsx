import React, { useCallback, useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

const RoomIdPlate: React.VFC<{
  roomId: string;
}> = ({ roomId }) => {
  const [copied, setCopied] = useState(false);
  const clearCopied = useCallback(() => {
    setTimeout(() => {
      setCopied(false);
    }, 3 * 1000);
  }, []);

  const onClickRoomId = useCallback(() => {
    navigator.clipboard.writeText(roomId).then(() => {
      setCopied(true);
      clearCopied();
    });
  }, [clearCopied, roomId]);

  return (
    <div className="mx-4 p-2 flex items-center rounded bg-gray-200 shadow-inner">
      <div className="font-bold text-gray-500">ROOM ID :</div>
      <div className="cursor-pointer flex items-center" onClick={onClickRoomId}>
        <div className="font-bold ml-2">{roomId}</div>
        <AiOutlineCopy className="ml-2" />
      </div>
      <div
        className={`transition ml-4 font-bold text-green-500 delay-200 ${
          copied ? '' : 'hidden'
        }`}
      >
        Copied!
      </div>
    </div>
  );
};

export default RoomIdPlate;
