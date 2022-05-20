import React, { useMemo } from 'react';
import { Card } from '../../API';

const Point: React.VFC<{
  cards: Card[];
  hidden: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}> = ({ cards, hidden, className = '' }) => {
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
    <div className={className}>
      {cardLength} cards / sum: {hidden ? '?' : sum} / average:{' '}
      {hidden ? '?' : average}
    </div>
  );
};

export default Point;
