import { Card as CardUI } from '@mui/material';
import React from 'react';
import { Participant, Card } from '../../../../../API';

const ParticipantList: React.VFC<{
  participants: Participant[];
  fieldsCard: Card[];
  isOpened: boolean;
  className?: React.HTMLAttributes<HTMLUListElement>['className'];
}> = ({ participants, fieldsCard, isOpened, className = '' }) => {
  return (
    <CardUI
      elevation={0}
      variant="outlined"
      sx={{ minHeight: 216 }}
      className={`p-4 w-full rounded flex flex-wrap ${className}`}
    >
      <ul className={'flex flex-col space-y-2'}>
        {participants.map((p, idx) => {
          const card = fieldsCard.find((fc) => fc.username === p.username);
          const emoji = !!card ? '😎' : '🤔';
          const point = card?.point || '🤔';
          return (
            <li key={idx} className="text-lg font-bold flex">
              <div className="mr-3 flex-shrink w-7 text-xl text-right">
                {isOpened ? point : emoji}
              </div>
              <div className="overflow-ellipsis">{p.displayUserName}</div>
            </li>
          );
        })}
      </ul>
    </CardUI>
  );
};

export default ParticipantList;
