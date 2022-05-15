import dayjs from 'dayjs';

export const calcTtl = () => {
  return dayjs().add(5, "minutes").unix();
}