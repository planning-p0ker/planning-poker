import { pointList } from '../constants';
import { Participant } from '../graphql/API';
import { Card } from '../hooks/useCards';

export const sortParticipants = (participants: Participant[]) => {
  const sorted = participants.sort((a, b) => {
    if (a.point && b.point) {
      return a.point - b.point;
    }

    if (a.point && !b.point) {
      return -1;
    }

    if (!a.point && b.point) {
      return 1;
    }

    return 0;
  });

  const result = [...sorted];
  console.log('SORT RESULT: ', result);
  return result;
};

export const checkNeedsDiscussion = (cards: Card[]) => {
  const fieldPoints = cards.map((c) => c.point);
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
