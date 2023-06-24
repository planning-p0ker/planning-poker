import { useCallback, useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Participant,
  UpdateParticipantInput,
  UpdateRoomInput,
} from '../graphql/API';
import { User } from './useUser';
import { updateRoom, updateParticipant } from '../graphql/mutations';

export type Card = {
  id: string;
  username: string;
  displayUserName: string;
  point: number;
};

export const useCards = (
  user: User | null,
  participants: Participant[],
  roomId?: string
) => {
  const [fieldCards, setFieldCards] = useState<Card[]>([]);
  const [myCard, setMyCard] = useState<Card | null>(null);

  useEffect(() => {
    setFieldCards(
      participants
        .filter((p) => !!p.point)
        .map((p) => ({
          id: p.id,
          username: p.username,
          displayUserName: p.displayUserName,
          point: p.point!,
        }))
    );
  }, [participants]);

  useEffect(() => {
    if (!user) return;
    const me = fieldCards.find((c) => c.username === user.username);
    if (!me) return;
    setMyCard({
      id: me.id,
      username: me.username,
      displayUserName: me.displayUserName,
      point: me.point,
    });
  }, [fieldCards, user]);

  const handleOnClickPointButton = useCallback(
    (point: number | null) => async () => {
      if (user) {
        const myParticipant = participants.find(
          (p) => p.username === user.username
        );

        if (myParticipant) {
          const updateParticipantInput: UpdateParticipantInput = {
            id: myParticipant.id,
            username: myParticipant.username,
            displayUserName: myParticipant.displayUserName,
            point: point,
            roomParticipantsId: myParticipant.roomParticipantsId,
          };
          await API.graphql(
            graphqlOperation(updateParticipant, {
              input: updateParticipantInput,
            })
          );
        }
      }
    },
    [participants, user]
  );

  const handleOnClear = useCallback(async () => {
    await Promise.all(
      participants.map(async (participant) => {
        const updateParticipantInput: UpdateParticipantInput = {
          id: participant.id,
          username: participant.username,
          displayUserName: participant.displayUserName,
          point: null,
          roomParticipantsId: participant.roomParticipantsId,
        };
        return API.graphql(
          graphqlOperation(updateParticipant, {
            input: updateParticipantInput,
          })
        );
      })
    );
    const updateRoomInput: UpdateRoomInput = {
      id: roomId!,
      isOpened: false,
    };
    await API.graphql(
      graphqlOperation(updateRoom, {
        input: updateRoomInput,
      })
    );
  }, [participants, roomId]);

  return {
    fieldCards,
    myCard,
    handleOnClear,
    handleOnClickPointButton,
  };
};
