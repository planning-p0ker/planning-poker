import React from 'react';
import CardUI from '../Card';

const pointList = [1, 2, 3, 5, 8, 13];

const Hand: React.VFC<{
  selectNum?: number | null;
  onClickCard: (num: number | null) => () => void;
  disabledAll?: boolean;
}> = ({ selectNum, onClickCard, disabledAll = false }) => {
  return (
    <div>
      <div className="flex flex-wrap">
        {pointList.map((p) => (
          <div key={p} className="my-2 ml-2">
            <CardUI
              disabled={disabledAll}
              selected={p === selectNum}
              point={p}
              onClick={onClickCard(p === selectNum ? null : p)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hand;
