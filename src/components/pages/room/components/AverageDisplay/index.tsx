import React, { useMemo } from 'react';
import { Card } from '../../../../../graphql/API';
import styles from './AverageDisplay.module.css';
import CountUp from 'react-countup';
import BigNumber from 'bignumber.js';
import { Card as CardUI } from '@mui/material';

export const AverageDisplay: React.VFC<{
  cards: Card[];
  hidden: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}> = ({ cards, hidden, className = '' }) => {
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
      elevation={0}
      variant="outlined"
      sx={{ minHeight: 216 }}
      className={`p-4 w-full rounded flex flex-wrap ${className}`}
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
