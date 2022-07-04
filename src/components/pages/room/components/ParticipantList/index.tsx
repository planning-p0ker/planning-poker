import React from 'react';
import { Participant, Card } from '../../../../../API';

const ParticipantList: React.VFC<{
  participants: Participant[];
  fieldsCard: Card[];
  isOpened: boolean;
  className?: React.HTMLAttributes<HTMLUListElement>['className'];
}> = ({ participants, fieldsCard, isOpened, className = '' }) => {
  return (
    <div className={`px-4 w-full rounded flex flex-wrap h-56 ${className}`}>
      <ul className={'grid grid-cols-1'}>
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
    </div>
  );
};

export default ParticipantList;
