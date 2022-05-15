import dayjs from 'dayjs';

export const calcTtl = () => {
  return dayjs().add(3, "months").unix();
}