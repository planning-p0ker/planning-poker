import { GetStaticProps } from 'next';

type Props = { nowDate: string };

const SSGDemo = ({ nowDate }: Props) => {
  return <div>SSG demo: {nowDate}</div>;
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      nowDate: new Date().toLocaleString(),
    },
  };
};

export default SSGDemo;
