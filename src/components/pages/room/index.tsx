import { Button, ProgressCircular } from 'ui-neumorphism';
import { Card, Participant, Room } from '../../../API';
import { User } from '../../../hooks/useUser';
import Field from './components/Field';
import Hand from './components/Hand';
import ParticipantList from './components/ParticipantList';
import RoomIdPlate from './components/RoomIdPlate';
import { Layout } from '../../Layout';
import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

type RoomPageProps = {
  isLoading: boolean;
  user: User | null;
  room: Room | null;
  myCard: Card | null;
  fieldCards: Card[];
  participants: Participant[];
  onSignIn: () => void;
  onSignOut: () => void;
  onOpen: () => void;
  onClear: () => void;
  onClickFieldCard: (card: Card) => void;
  onClickHandCard: (num: number | null) => () => void;
};

export const RoomPage: React.VFC<RoomPageProps> = ({
  isLoading,
  user,
  room,
  myCard,
  fieldCards,
  participants,
  onSignIn,
  onSignOut,
  onOpen,
  onClear,
  onClickFieldCard,
  onClickHandCard,
}) => {
  const rate = useMemo(() => {
    return new BigNumber(fieldCards.length)
      .div(participants.length)
      .times(100)
      .toNumber();
  }, [fieldCards.length, participants.length]);

  return (
    <Layout user={user} onSignIn={onSignIn} onSignOut={onSignOut}>
      <div className="mt-10 flex flex-col space-y-4 px-16">
        <RoomIdPlate isLoading={isLoading} roomId={room?.id || ''} />
        <div className="flex justify-end align-middle">
          <div className="flex space-x-6 mt-4 pr-3">
            <Button
              disabled={!user || fieldCards.length === 0 || room?.isOpened}
              onClick={onOpen}
            >
              <span className="mr-1">open</span>
              <ProgressCircular value={rate} size={20} />
            </Button>
            <Button
              disabled={!user || fieldCards.length === 0}
              onClick={onClear}
            >
              clear
            </Button>
          </div>
        </div>
        <div className="flex justify-center space-x-5 min-h-[208px] pb-4">
          <Field
            hidden={!room?.isOpened}
            user={user}
            cards={fieldCards}
            onClickMyCard={onClickFieldCard}
            className="flex-shrink max-w-[200px] min-w-[140px]"
          />
          <ParticipantList
            className="flex-shrink max-w-[400px] min-w-[140px]"
            isOpened={room?.isOpened || false}
            participants={participants}
            fieldsCard={fieldCards}
          />
        </div>
        <Hand
          selectNum={myCard?.point}
          onClickCard={onClickHandCard}
          disabledAll={isLoading || !user || !!room?.isOpened}
        />
      </div>
    </Layout>
  );
};
