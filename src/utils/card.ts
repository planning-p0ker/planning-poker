import { pointList } from '../constants';
import { Participant } from '../graphql/API';
import { Card } from '../hooks/useCards';

export const sortParticipants = (participants: Participant[]) => {
  const sorted = participants.sort((a, b) => {
    if (a.point && b.point) {
      return b.point - a.point;
    }

    if (a.point && !b.point) {
      return -1;
    }

    if (!a.point && b.point) {
      return 1;
    }

    return 0;
  });

  return [...sorted];
};

export const checkNeedsDiscussion = (cards: Card[]) => {
  const fieldPoints = cards.filter((c) => !!c.point).map((c) => c.point);
  const maxPoint = Math.max(...fieldPoints);
  const minPoint = Math.min(...fieldPoints);
  const maxIndex = pointList.findIndex((p) => p === maxPoint);
  const minIndex = pointList.findIndex((p) => p === minPoint);
  return {
    isNeedDiscussion: maxIndex - minIndex > 2,
    maxPoint,
    minPoint,
  };
};
