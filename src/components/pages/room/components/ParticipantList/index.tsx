import React from 'react';
import { Participant, Card } from '../../../../../API';
import { Card as CardUI, CardContent } from 'ui-neumorphism';

const ParticipantList: React.VFC<{
  participants: Participant[];
  fieldsCard: Card[];
  isOpened: boolean;
  className?: React.HTMLAttributes<HTMLUListElement>['className'];
}> = ({ participants, fieldsCard, isOpened, className = '' }) => {
  return (
    <CardUI
      inset={true}
      className={`p-4 w-full rounded flex flex-wrap h-56 ${className}`}
    >
      <CardContent className={'flex'}>
        <ul
        // className={`p-2 text-sm w-full rounded shadow-inner flex flex-wrap flex-col whitespace-nowrap truncate ${className}`}
        >
          {participants.map((p, idx) => {
            const card = fieldsCard.find((fc) => fc.username === p.username);
            const emoji = !!card ? '😎' : '🤔';
            const point = card?.point || '🤔';
            return (
              <li key={idx} className="px-2 text-lg font-bold">
                <span className="mr-1">{isOpened ? point : emoji}</span>
                <span className="">{p.displayUserName}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </CardUI>
  );
};

export default ParticipantList;
