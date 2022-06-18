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
      className={`px-4 w-full rounded flex flex-wrap h-56 ${className}`}
    >
      <CardContent>
        <ul className={'grid grid-cols-1'}>
          {participants.map((p, idx) => {
            const card = fieldsCard.find((fc) => fc.username === p.username);
            const emoji = !!card ? '😎' : '🤔';
            const point = card?.point || '🤔';
            return (
              <li key={idx} className="text-lg font-bold flex">
                <div className="mr-1 flex-shrink w-7 text-xl">
                  {isOpened ? point : emoji}
                </div>
                <div className="">{p.displayUserName}</div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </CardUI>
  );
};

export default ParticipantList;
