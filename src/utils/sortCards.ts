import { Card, Participant } from '../API';

export const sortParticipants = (
  participants: Participant[],
  cards: Card[]
) => {
  const sorted = participants.sort((a, b) => {
    const aCard = cards.find((c) => c.username === a.username);
    const bCard = cards.find((c) => c.username === b.username);

    if (aCard && bCard) {
      return bCard.point - aCard.point;
    }

    if (aCard && !bCard) {
      return -1;
    }

    if (!aCard && bCard) {
      return 1;
    }

    return 0;
  });

  return [...sorted];
};
