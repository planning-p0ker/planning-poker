import Link from 'next/link';

type Props = { nowDate: string };

const NextPageTest = () => {
  return (
    <div>
      Amplify + Next.jsで以下のページを作成
      <ul className="list-disc">
        <li>
          ・{' '}
          <span className="text-blue-600 hover:underline">
            <Link href="/test/ssg">SSG</Link>
          </span>
        </li>
        <li>
          ・{' '}
          <span className="text-blue-600 hover:underline">
            <Link href="/test/ssr">SSR</Link>
          </span>
        </li>
        <li>
          ・{' '}
          <span className="text-blue-600 hover:underline">
            <Link href="/test/isr">ISR</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default NextPageTest;
