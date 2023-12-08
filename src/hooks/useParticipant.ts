import { useEffect, useState } from 'react';
import { Participant, Room } from '../graphql/API';
import {
  onCreateParticipant,
  onDeleteParticipant,
  onUpdateParticipant,
} from '../graphql/subscriptions';
import { listParticipants } from '../graphql/queries';
import { sortParticipants } from '../utils/card';
import { updateRoom } from '../graphql/mutations';
import { APIClient, AuthMode } from '../types';

export const useParticipant = (
  client: APIClient,
  authMode: AuthMode,
  room: Room | null
) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  // 初期表示時に参加者一覧取得
  useEffect(() => {
    if (!room) return;
    (async () => {
      const result = await client.graphql({
        query: listParticipants,
        authMode: authMode,
        variables: { filter: { roomParticipantsId: { eq: room.id } } },
      });
      const items = result.data?.listParticipants?.items;
      if (items) {
        if (room.isOpened) {
          setParticipants(sortParticipants(items));
        } else {
          setParticipants(items);
        }
      }
    })();
  }, [authMode, client, room]);

  // Subscription
  useEffect(() => {
    if (!room) return;
    const variables = {
      filter: {
        roomParticipantsId: {
          eq: room.id,
        },
      },
    };
    const createSub = client
      .graphql({
        query: onCreateParticipant,
        authMode,
        variables,
      })
      .subscribe({
        next: ({ data }) => {
          if (data.onCreateParticipant) {
            const newItem = data.onCreateParticipant;
            setParticipants((prev) => {
              if (prev.some((p) => p.username === newItem.username)) {
                return prev;
              }
              return [...prev, newItem];
            });
          }
        },
      });

    const deleteSub = client
      .graphql({
        query: onDeleteParticipant,
        authMode,
        variables,
      })
      .subscribe({
        next: ({ data }) => {
          const deletedCard = data.onDeleteParticipant;
          setParticipants((prev) =>
            prev.filter((e) => e.id !== deletedCard.id)
          );
        },
      });

    const updateSub = client
      .graphql({
        query: onUpdateParticipant,
        authMode,
        variables,
      })
      .subscribe({
        next: ({ data }) => {
          const updateCard = data.onUpdateParticipant;
          setParticipants((prev) =>
            prev.map((participant) =>
              participant.id === updateCard.id ? updateCard : participant
            )
          );
        },
      });

    return () => {
      createSub.unsubscribe();
      deleteSub.unsubscribe();
      updateSub.unsubscribe();
    };
  }, [authMode, client, room]);

  useEffect(() => {
    if (!room || !room.isOpened || participants.length) return;
    client.graphql({
      query: updateRoom,
      variables: {
        input: { id: room?.id, isOpened: false },
      },
    });
  }, [client, participants.length, room]);

  return { participants, setParticipants };
};
