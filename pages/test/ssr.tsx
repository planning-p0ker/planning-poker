import { GetServerSideProps } from 'next';

type Props = { nowDate: string };

const SSRDemo = ({ nowDate }: Props) => {
  return <div>SSR demo: {nowDate}</div>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      nowDate: new Date().toLocaleString(undefined, { timeZone: 'Asia/Tokyo' }),
    },
  };
};

export default SSRDemo;
