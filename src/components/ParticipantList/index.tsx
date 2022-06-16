import React from 'react';
import { Participant, Card } from '../../API';

const ParticipantList: React.VFC<{
  participants: Participant[];
  fieldsCard: Card[];
  isOpened: boolean;
  className?: React.HTMLAttributes<HTMLUListElement>['className'];
}> = ({ participants, fieldsCard, isOpened, className = '' }) => {
  return (
    <ul
      className={`p-2 text-sm w-full rounded shadow-inner flex flex-wrap flex-col whitespace-nowrap truncate ${className}`}
    >
      {participants.map((p, idx) => {
        const card = fieldsCard.find((fc) => fc.username === p.username);
        const emoji = !!card ? '😎' : '🤔';
        const point = card?.point || '🤔';
        return (
          <li key={idx} className="px-2">
            <span className="mr-1">{isOpened ? point : emoji}</span>
            {p.displayUserName}
          </li>
        );
      })}
    </ul>
  );
};

export default ParticipantList;
