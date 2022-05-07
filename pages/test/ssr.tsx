import { API } from 'aws-amplify';
import { GetServerSideProps } from 'next';
import { listRooms } from '../../src/graphql/queries';

type Props = { nowDate: string; result: any };

const SSRDemo = ({ nowDate, result }: Props) => {
  return (
    <div>
      SSR demo: {nowDate}
      <br />
      {JSON.stringify(result)}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const result = (await API.graphql({ query: listRooms })) as any;
  return {
    props: {
      result: result,
      nowDate: new Date().toLocaleString(undefined, { timeZone: 'Asia/Tokyo' }),
    },
  };
};

export default SSRDemo;
