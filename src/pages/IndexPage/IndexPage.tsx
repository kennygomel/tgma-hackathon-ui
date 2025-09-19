import type { DisplayDataRow } from '@/components/DisplayData/DisplayData.tsx';
import { useQuery } from '@/hooks/useQuery.ts';
import { AuthService, AuthUser } from '@/services/auth.service.ts';
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  type User,
  useSignal,
} from '@telegram-apps/sdk-react';
import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { FC, useEffect, useMemo } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import userSvg from './user.svg';

function getUserRows(user: User): DisplayDataRow[] {
  return Object.entries(user).map(([ title, value ]) => ({ title, value }));
}

export const IndexPage: FC = () => {
  const initDataRaw = import.meta.env.DEV ? 'user=%7B%22id%22%3A323173181%2C%22first_name%22%3A%22Ignat%22%2C%22last_name%22%3A%22Rychkov%22%2C%22username%22%3A%22ignatrychkov%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Ff6LJeyec9XyXOSr_OXRWo3HKqbKFlfCYYkM01fOQalI.svg%22%7D&chat_instance=1432267138820610369&chat_type=private&auth_date=1758284032&signature=aC41ox5qarx_tQECxPQ_kO9Wjy_9NlZALi6pBQqaPEmqah6uMHuTw45HUQGccutAOVN_flii26CNwq72h2y7AQ&hash=a3a859a76ffa75f91abd7fc75234f0b81cfaa6c5e0c4ba1de13de34b798792ec' : useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);
  const { data: user, loading, error } = useQuery<AuthUser>(() => AuthService.signIn(initDataRaw as string), []);

  console.log('user', user);

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

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {(error as Error).message}</p>;

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
