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
  roomUpdatedAt: Room['updatedAt'] | null;
}> = ({ cards, hidden, className = '', roomUpdatedAt }) => {
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
          <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3">
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
  cards: Card[];
  roomUpdatedAt: string | null;
}> = ({ cards, roomUpdatedAt }) => {
  if (!cards.length || !cards[0].point) {
    return <div style={{ width: 38, height: 38 }} />;
  }

  const first = cards[0].point;
  const unanimous = cards.every((c) => c.point === first);
  if (!unanimous) {
    return <div style={{ width: 38, height: 38 }} />;
  }

  const dateByUpdatedAt = roomUpdatedAt ? new Date(roomUpdatedAt) : new Date();
  const seed = dateByUpdatedAt.getUTCSeconds();
  const num = seed <= 16 ? seed : seed % 10;

  return [
    <Parrot0 key={0} />,
    <Parrot1 key={1} />,
    <Parrot2 key={2} />,
    <Parrot3 key={3} />,
    <Parrot4 key={4} />,
    <Parrot5 key={5} />,
    <Parrot6 key={6} />,
    <Parrot7 key={7} />,
    <Parrot8 key={8} />,
    <Parrot9 key={9} />,
    <Parrot10 key={10} />,
    <Parrot11 key={11} />,
    <Parrot12 key={12} />,
    <Parrot13 key={13} />,
    <Parrot14 key={14} />,
    <Parrot15 key={15} />,
    <Parrot16 key={16} />,
  ][num];
};

const Parrot0: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/0.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot1: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/1.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot2: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/2.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot3: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/3.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot4: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/4.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot5: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/5.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot6: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/6.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot7: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/7.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot8: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/8.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot9: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/9.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot10: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/10.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot11: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/11.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot12: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/12.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot13: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/13.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot14: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/14.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot15: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/15.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};

const Parrot16: React.FC = () => {
  return (
    <Image
      priority={true}
      className="absolute"
      src="/parrots/16.gif"
      width={38}
      height={38}
      alt="満場一致!"
    />
  );
};
