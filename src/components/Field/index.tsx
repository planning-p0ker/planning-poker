import React, { useCallback } from 'react';
import NamedCard from '../NamedCard';
import { Card } from '../../API';
import { User } from '../../hooks/useUser';

const Field: React.VFC<{
  user: User | null;
  cards: Card[];
  hidden: boolean;
  onClickMyCard: (card: Card) => void;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}> = ({ onClickMyCard, user, cards, hidden, className = '' }) => {
  const onClickCard = useCallback(
    (card: Card) => () => {
      onClickMyCard(card);
    },
    [onClickMyCard]
  );

  return (
    <div
      className={`p-4 w-full rounded bg-gray-200 shadow-inner flex flex-wrap ${className}`}
    >
      {cards.map((c, idx) => {
        return (
          <div key={idx} className="my-2 ml-2">
            <NamedCard
              userDisplayName={c.displayUserName}
              hidden={hidden}
              point={c.point}
              disabled={!(hidden && user && c.username === user.username)}
              onClick={onClickCard(c)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Field;
