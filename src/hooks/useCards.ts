import { useCallback, useEffect, useState } from 'react';
import {
  Participant,
  UpdateParticipantInput,
  UpdateRoomInput,
} from '../graphql/API';
import { User } from './useUser';
import { updateRoom, updateParticipant } from '../graphql/mutations';
import dayjs from 'dayjs';
import { APIClient } from '../types';

export type Card = {
  id: string;
  username: string;
  displayUserName: string;
  point: number;
};

export const useCards = (
  client: APIClient,
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
    if (me) {
      setMyCard({
        id: me.id,
        username: me.username,
        displayUserName: me.displayUserName,
        point: me.point,
      });
    } else {
      setMyCard(null);
    }
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
            ttl: dayjs().add(1, 'hour').unix(),
          };
          await client.graphql({
            query: updateParticipant,
            variables: {
              input: updateParticipantInput,
            },
          });
        }
      }
    },
    [client, participants, user]
  );

  const handleOnClear = useCallback(async () => {
    // TODO: 一括で削除するようにする
    await Promise.all(
      participants.map(async (participant) => {
        const updateParticipantInput: UpdateParticipantInput = {
          id: participant.id,
          username: participant.username,
          displayUserName: participant.displayUserName,
          point: null,
          roomParticipantsId: participant.roomParticipantsId,
        };
        return client.graphql({
          query: updateParticipant,
          variables: {
            input: updateParticipantInput,
          },
        });
      })
    );
    const updateRoomInput: UpdateRoomInput = {
      id: roomId!,
      isOpened: false,
    };
    await client.graphql({
      query: updateRoom,
      variables: {
        input: updateRoomInput,
      },
    });
  }, [client, participants, roomId]);

  return {
    fieldCards,
    myCard,
    handleOnClear,
    handleOnClickPointButton,
  };
};
