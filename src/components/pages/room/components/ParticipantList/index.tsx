import { Card as CardUI } from '@mui/material';
import React, { useMemo } from 'react';
import { Participant } from '../../../../../graphql/API';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { checkNeedsDiscussion } from '../../../../../utils/card';
import { Card } from '../../../../../hooks/useCards';

type ParticipantListProps = {
  participants: Participant[];
  fieldsCard: Card[];
  isOpened: boolean;
  className?: React.HTMLAttributes<HTMLUListElement>['className'];
};

const ParticipantRow: React.FC<{
  isOpened: boolean;
  participant: Participant;
  card: Card | undefined;
  nameSuffix?: 'max' | 'min';
}> = ({ card, isOpened, participant, nameSuffix }) => {
  const emoji = !!card ? '😎' : '🤔';
  const point = card?.point === 0 ? '?' : card?.point || '🤔';
  const suffix =
    isOpened && nameSuffix === 'max' ? (
      <>
        <span className="text-sm font-thin sm:hidden">{'TOO BIG!!>'}</span>🐳
      </>
    ) : isOpened && nameSuffix === 'min' ? (
      <>
        <span className="sm:hidden text-xs font-thin">{'TOO SMALL!>'}</span>🐛
      </>
    ) : (
      ''
    );

  return (
    <li className="text-lg font-bold flex justify-between w-full">
      <div className="flex">
        <div className="mr-3 flex-shrink w-7 text-xl text-right">
          {isOpened ? <span>{point}</span> : emoji}
        </div>
        <div className="overflow-ellipsis">{participant.displayUserName}</div>
      </div>
      <div className="overflow-ellipsis">{suffix}</div>
    </li>
  );
};

export const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  fieldsCard,
  isOpened,
  className = '',
}) => {
  const flipKey = useMemo(
    () => participants.map((p) => p.id).join(''),
    [participants]
  );

  const { isNeedDiscussion, maxPoint, minPoint } =
    checkNeedsDiscussion(fieldsCard);

  return (
    <CardUI
      elevation={0}
      variant="outlined"
      sx={{ minHeight: 216 }}
      className={`p-4 w-full rounded flex flex-wrap ${className}`}
    >
      <Flipper flipKey={flipKey} className="w-full">
        <ul className={'flex flex-col space-y-2 w-full'}>
          {participants.map((p) => {
            const card = fieldsCard.find((fc) => fc.username === p.username);
            const nameSuffix =
              isNeedDiscussion && card?.point === maxPoint
                ? 'max'
                : isNeedDiscussion && card?.point === minPoint
                ? 'min'
                : undefined;
            return (
              <Flipped key={p.id} flipId={p.id}>
                <ParticipantRow
                  isOpened={isOpened}
                  card={card}
                  participant={p}
                  nameSuffix={nameSuffix}
                />
              </Flipped>
            );
          })}
        </ul>
      </Flipper>
    </CardUI>
  );
};
