import BigNumber from 'bignumber.js';
import { pointList } from '../constants';
import { Card, Participant } from '../graphql/API';

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

export const checkNeedsDiscussion = (cards: Card[]) => {
  const fieldPoints = cards.map(c => c.point);
  const maxPoint = Math.max(...fieldPoints);
  const minPoint = Math.min(...fieldPoints);
  const maxIndex = pointList.findIndex(p => p === maxPoint);
  const minIndex = pointList.findIndex(p => p === minPoint);
  return {
    isNeedDiscussion: maxIndex - minIndex > 2,
    maxPoint,
    minPoint
  }
}
