import React, { useCallback } from 'react';
import NamedCard from '../NamedCard';
import { Card } from '../../API';
import { User } from '../../hooks/useUser';
import { Card as CardUI, CardContent } from 'ui-neumorphism';

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
    <CardUI
      inset={true}
      className={`p-4 w-full rounded flex flex-wrap h-56 ${className}`}
    >
      <CardContent>
        <div>
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
      </CardContent>
    </CardUI>
  );
};

export default Field;
