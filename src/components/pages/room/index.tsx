import { Card, Participant, Room } from '../../../graphql/API';
import { User } from '../../../hooks/useUser';
import { AverageDisplay } from './components/AverageDisplay';
import PointButtons from './components/PointButtons';
import { ParticipantList } from './components/ParticipantList';
import { RoomIdPlate } from './components/RoomIdPlate';
import { Layout } from '../../Layout';
import {
  InputNameModal,
  InputNameModalProps,
} from './components/InputNameModal';
import { ClearButton } from './components/ClearButton';
import { OpenButton } from './components/OpenButton';

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
  onClickPointButton: (num: number | null) => () => void;
  modalProps: InputNameModalProps;
};

export const RoomPage: React.VFC<RoomPageProps> = ({
  isLoading,
  user,
  room,
  myCard,
  fieldCards,
  participants,
  modalProps,
  onSignIn,
  onSignOut,
  onOpen,
  onClear,
  onClickPointButton,
}) => {
  return (
    <Layout user={user} onSignIn={onSignIn} onSignOut={onSignOut}>
      <InputNameModal {...modalProps} />
      <div className="mt-10 flex flex-col space-y-4 px-16">
        <RoomIdPlate isLoading={isLoading} roomId={room?.id || ''} />
        <div className="flex justify-end align-middle">
          <div className="flex space-x-6 mt-4 pr-3">
            <OpenButton
              room={room}
              user={user}
              fieldCards={fieldCards}
              participants={participants}
              onOpen={onOpen}
            />
            <ClearButton
              room={room}
              user={user}
              fieldCards={fieldCards}
              onClear={onClear}
            />
          </div>
        </div>
        <div className="flex justify-center space-x-5 min-h-[208px] pb-4">
          <AverageDisplay
            hidden={!room?.isOpened}
            cards={fieldCards}
            className="flex-shrink max-w-[200px] min-w-[140px]"
          />
          <ParticipantList
            className="flex-shrink max-w-[400px] min-w-[140px]"
            isOpened={room?.isOpened || false}
            participants={participants}
            fieldsCard={fieldCards}
          />
        </div>
        <PointButtons
          selectNum={myCard?.point}
          onClickPointButton={onClickPointButton}
          disabledAll={isLoading || !user || !!room?.isOpened}
        />
      </div>
    </Layout>
  );
};
