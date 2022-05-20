import React from 'react';
import CardUI from '../Card';

const pointList = [1, 2, 3, 5, 8, 13];

const Hand: React.VFC<{
  selectNum?: number | null;
  onClickCard: (num: number | null) => () => void;
  disabledAll?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}> = ({ selectNum, onClickCard, disabledAll = false, className = '' }) => {
  return (
    <div className={`flex flex-wrap space-x-2 ${className}`}>
      {pointList.map((p) => (
        <div key={p} className="">
          <CardUI
            disabled={disabledAll}
            selected={p === selectNum}
            point={p}
            onClick={onClickCard(p === selectNum ? null : p)}
          />
        </div>
      ))}
    </div>
  );
};

export default Hand;
