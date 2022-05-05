import React, { useCallback, useMemo } from 'react';
import Button from '../Button';
import NamedCard from '../NamedCard';
import { Card } from '../../API';
import { User } from '../../hooks/useUser';

const Field: React.VFC<{
  user: User | null;
  cards: Card[];
  hidden: boolean;
  onClickMyCard: (card: Card) => void;
  onClear: () => void;
  onOpen: () => void;
}> = ({ onClickMyCard, user, cards, onClear, onOpen, hidden }) => {
  const onClickCard = useCallback(
    (card: Card) => () => {
      onClickMyCard(card);
    },
    [onClickMyCard]
  );

  const cardLength = useMemo(() => {
    return cards.length;
  }, [cards]);

  const sum = useMemo(() => {
    return cards.reduce((prev, current) => prev + current.point, 0);
  }, [cards]);

  const average = useMemo(() => {
    if (!cards.length) return '';

    return Math.ceil(sum / cards.length);
  }, [cards, sum]);

  return (
    <div className="p-4">
      <div className="">
        {cardLength} cards / sum: {hidden ? '?' : sum} / average:{' '}
        {hidden ? '?' : average}
      </div>
      <div
        className="mt-4 p-4 w-full rounded bg-gray-200 shadow-inner flex flex-wrap"
        style={{ minHeight: 208 }}
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
      <div className="flex space-x-2 mt-2">
        <Button
          primary={true}
          disabled={!user || cardLength === 0 || !hidden}
          onClick={onOpen}
        >
          open
        </Button>
        <Button disabled={!user || cardLength === 0} onClick={onClear}>
          clear
        </Button>
      </div>
    </div>
  );
};

export default Field;
