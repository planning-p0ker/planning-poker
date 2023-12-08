import React, { useMemo } from 'react';
import styles from './AverageDisplay.module.css';
import CountUp from 'react-countup';
import BigNumber from 'bignumber.js';
import { Card as CardUI } from '@mui/material';
import { Card } from '../../../../../hooks/useCards';
import Image from 'next/image';
import { Room } from '../../../../../graphql/API';

export const AverageDisplay: React.FC<{
  cards: Card[];
  hidden: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  roomUpdatedAt: Room["updatedAt"] | null;
}> = ({ cards, hidden, className = '' , roomUpdatedAt }) => {
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
      {hidden ? (
        <div className="m-auto">
          <span className={styles.i}>?</span>
        </div>
      ) : (
        <div className="m-auto text-center relative">
          <div className='absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3'>
            <CountUp className={styles.i} duration={0.2} end={integer} />
            <span className={styles.dot}>.</span>
            <CountUp className={styles.d} duration={0.2} end={decimal} />
            <Parrot roomUpdatedAt={roomUpdatedAt} cards={cards} />
          </div>
        </div>
      )}
    </CardUI>
  );
};

const Parrot: React.FC<{
  cards: Card[], roomUpdatedAt: string | null
}> = ({ cards, roomUpdatedAt }) => {
  if (!cards.length || !cards[0].point) {
    return <div style={{width: 38, height: 38}}/>;
  }

  const first = cards[0].point;
  const unanimous = cards.every(c => c.point === first);
  if (!unanimous) {
    return <div style={{width: 38, height: 38}}/>;
  }

  const dateByUpdatedAt = roomUpdatedAt ? new Date(roomUpdatedAt) : new Date();
  const seed = dateByUpdatedAt.getUTCSeconds();
  const num = seed <= 16 ? seed
    : seed % 10;

  return (
    <Image
      className='absolute'
      src={`/parrots/${num}.gif`}
      width={38}
      height={38}
      alt='満場一致!'
    />
  );
}