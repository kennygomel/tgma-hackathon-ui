import { useAuth } from '@/auth/AuthContext.tsx';
import type { DisplayDataRow } from '@/components/DisplayData/DisplayData.tsx';
import {
  initDataState as _initDataState,
  type User,
  useSignal,
} from '@telegram-apps/sdk-react';
import { Section, Cell, Image, List, Spinner } from '@telegram-apps/telegram-ui';
import { FC, useMemo } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import userSvg from './user.svg';

function getUserRows(user: User): DisplayDataRow[] {
  return Object.entries(user).map(([ title, value ]) => ({ title, value }));
}

export const IndexPage: FC = () => {
  const { loading } = useAuth();
  const initDataState = useSignal(_initDataState);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [ initDataState ]);

  const fullName = userRows
    ?.filter(row => [ 'first_name', 'last_name' ].includes(row.title))
    .map(row => row.value)
    .filter(Boolean)
    .join(' ') as string;
  const photoUrl = userRows?.find(row => row.title === 'photo_url')?.value as string;
  const username = userRows?.find(row => row.title === 'username')?.value as string;

  if (loading) {
    return (<div className="fixed inset-0 flex flex-row justify-center items-center">
      <Spinner size="l" />
    </div>);
  }

  return (
    <Page back={false}>
      <List>
        <Section
          header="Мой аккаунт"
          footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
        >
          <Link to="/profile">
            <Cell
              before={<Image src={photoUrl || userSvg} style={{ backgroundColor: '#007AFF' }} />}
              subtitle={username ? `@${username}` : null}
            >
              {fullName}
            </Cell>
          </Link>
        </Section>
        <Section
          header="Application Launch Data"
          footer="These pages help developer to learn more about current launch information"
        >
          <Link to="/init-data">
            <Cell subtitle="User data, chat information, technical data">Init Data</Cell>
          </Link>
          <Link to="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">Launch Parameters</Cell>
          </Link>
          <Link to="/theme-params">
            <Cell subtitle="Telegram application palette information">Theme Parameters</Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};
