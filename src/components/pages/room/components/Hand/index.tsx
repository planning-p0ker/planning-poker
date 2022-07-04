import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

const pointList = [1, 2, 3, 5, 8, 13, 21, 34];

const Hand: React.VFC<{
  selectNum?: number | null;
  onClickCard: (num: number | null) => () => void;
  disabledAll?: boolean;
}> = ({ selectNum, onClickCard, disabledAll = false }) => {
  return (
    <ToggleButtonGroup color="primary" value={selectNum} className="mx-auto">
      {pointList.map((p) => (
        <ToggleButton
          value={p}
          key={p}
          disabled={disabledAll}
          onClick={onClickCard(p === selectNum ? null : p)}
        >
          <span className="text-xl font-bold">{p}</span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Hand;
