import { Button } from 'ui-neumorphism';
import { Card, Room } from '../../../API';
import { User } from '../../../hooks/useUser';
import Field from '../../Field';
import Hand from '../../Hand';
import Header from '../../Header';
import ParticipantList from '../../ParticipantList';
import Point from '../../Point';
import RoomIdPlate from '../../RoomIdPlate';

type RoomPageProps = {
  user: User | null;
  room: Room | null;
  myCard: Card | null;
  fieldCards: Card[];
  onSignIn: () => void;
  onSignOut: () => void;
  onOpen: () => void;
  onClear: () => void;
  onClickFieldCard: (card: Card) => void;
  onClickHandCard: (num: number | null) => () => void;
};

export const RoomPage: React.VFC<RoomPageProps> = ({
  user,
  room,
  myCard,
  fieldCards,
  onSignIn,
  onSignOut,
  onOpen,
  onClear,
  onClickFieldCard,
  onClickHandCard,
}) => {
  return (
    <div>
      <Header
        displayName={user?.displayName}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <div className="mt-3 mx-4 flex flex-col space-y-4">
        <RoomIdPlate roomId={room?.id || ''} />
        <div className="flex justify-between align-middle">
          <Point
            className="my-auto"
            hidden={!room?.isOpened}
            cards={fieldCards}
          />
          <div className="flex space-x-6 mt-4">
            <Button
              color="var(--primary)"
              disabled={!user || fieldCards.length === 0 || room?.isOpened}
              onClick={onOpen}
            >
              open
            </Button>
            <Button
              disabled={!user || fieldCards.length === 0}
              onClick={onClear}
            >
              clear
            </Button>
          </div>
        </div>
        <div className="flex space-x-4 min-h-[208px] pb-4">
          <Field
            hidden={!room?.isOpened}
            user={user}
            cards={fieldCards}
            onClickMyCard={onClickFieldCard}
            className="w-full"
          />
          <ParticipantList
            className="p-4 flex-shrink max-w-[200px] min-w-[140px]"
            // names={participants.map((i) => i.displayUserName)}
            names={[]}
          />
        </div>
        <Hand
          selectNum={myCard?.point}
          onClickCard={onClickHandCard}
          disabledAll={!user || !!room?.isOpened}
        />
      </div>
    </div>
  );
};