import { User } from '../../../../../hooks/useUser';
import Header from '../../../../Header';

type RoomNotFoundProps = {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
};

export const RoomNotFound: React.VFC<RoomNotFoundProps> = ({
  user,
  onSignIn,
  onSignOut,
}) => (
  <div>
    <Header
      displayName={user?.displayName}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
    />
    <div className="mx-4">room not found</div>
  </div>
);
