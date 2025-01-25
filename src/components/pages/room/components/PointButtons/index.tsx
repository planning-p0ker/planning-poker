import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { pointList } from '../../../../../constants';

export type PointButtonsProps = {
  selectNum?: number | null;
  onClickPointButton: (num: number | null) => () => void;
  disabledAll?: boolean;
};

const PointButtons: React.FC<PointButtonsProps> = ({ selectNum, onClickPointButton, disabledAll = false }) => {
  return (
    <ToggleButtonGroup color="primary" value={selectNum} className="mx-auto">
      {pointList.map((p) => (
        <ToggleButton
          value={p}
          key={p}
          disabled={disabledAll}
          onClick={onClickPointButton(p === selectNum ? null : p)}
          size="large"
        >
          <span className="text-xl font-bold">{p}</span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default PointButtons;
