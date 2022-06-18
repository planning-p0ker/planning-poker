import React from 'react';
import {
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
} from 'ui-neumorphism';
import CardUI from '../Card';

const pointList = [1, 2, 3, 5, 8, 13, 21, 34];

const Hand: React.VFC<{
  selectNum?: number | null;
  onClickCard: (num: number | null) => () => void;
  disabledAll?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}> = ({ selectNum, onClickCard, disabledAll = false, className = '' }) => {
  return (
    <ToggleButtonGroup className={'space-x-3'}>
      {pointList.map((p) => (
        <ToggleButton
          key={p}
          className={'p-5'}
          selected={p === selectNum}
          size="large"
          disabled={disabledAll}
          value={p}
          onClick={onClickCard(p === selectNum ? null : p)}
        >
          <Card inset={p === selectNum}>
            <CardContent>{p}</CardContent>
          </Card>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Hand;
