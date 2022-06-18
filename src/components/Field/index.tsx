import React, { useMemo } from 'react';
import { Card } from '../../API';
import { User } from '../../hooks/useUser';
import { Card as CardUI } from 'ui-neumorphism';
import styles from './Field.module.css';
import CountUp from 'react-countup';
import BigNumber from 'bignumber.js';

const Field: React.VFC<{
  user: User | null;
  cards: Card[];
  hidden: boolean;
  onClickMyCard: (card: Card) => void;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}> = ({ onClickMyCard, user, cards, hidden, className = '' }) => {
  const sum = useMemo(() => {
    return cards.reduce((prev, current) => prev + current.point, 0);
  }, [cards]);

  const [integer, decimal] = useMemo(() => {
    if (!cards.length) return [0, 0];
    const [i, d] = new BigNumber(sum)
      .div(cards.length)
      .dp(1)
      .toString()
      .split('.');

    return [Number(i), Number(d)];
  }, [cards, sum]);

  return (
    <CardUI
      inset={true}
      className={`p-4 w-full rounded flex flex-wrap h-56 ${className}`}
    >
      <div className={styles.point}>
        {hidden ? (
          <span className={styles.i}>?</span>
        ) : (
          <>
            <CountUp className={styles.i} duration={0.2} end={integer} />
            <span className={styles.dot}>.</span>
            <CountUp className={styles.d} duration={0.2} end={decimal} />
          </>
        )}
      </div>
    </CardUI>
  );
};

export default Field;
