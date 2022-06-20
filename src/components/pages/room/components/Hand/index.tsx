import React from 'react';
import { Button } from 'ui-neumorphism';

const pointList = [1, 2, 3, 5, 8, 13, 21, 34];

const Hand: React.VFC<{
  selectNum?: number | null;
  onClickCard: (num: number | null) => () => void;
  disabledAll?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}> = ({ selectNum, onClickCard, disabledAll = false }) => {
  return (
    <div className="grid grid-cols-8 px-20 sm:grid-cols-4 sm:px-10 gap-4">
      {pointList.map((p) => (
        <div key={p} className="w-8">
          <Button
            active={p === selectNum}
            style={{ minWidth: 40, height: 60 }}
            disabled={disabledAll}
            onClick={onClickCard(p === selectNum ? null : p)}
          >
            <span className="text-xl">{p}</span>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Hand;
