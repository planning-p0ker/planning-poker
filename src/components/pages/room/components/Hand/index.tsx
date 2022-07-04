import React from 'react';

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
          <button
            disabled={disabledAll}
            onClick={onClickCard(p === selectNum ? null : p)}
          >
            <span className="text-xl">{p}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Hand;
