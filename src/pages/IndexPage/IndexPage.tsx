import type { DisplayDataRow } from '@/components/DisplayData/DisplayData.tsx';
import {
  initDataState as _initDataState,
  type User,
  useSignal,
} from '@telegram-apps/sdk-react';
import { Section, Cell, Image, List, Tabbar } from '@telegram-apps/telegram-ui';
import { Icon24ChevronDown } from '@telegram-apps/telegram-ui/dist/icons/24/chevron_down';
import { Icon24ChevronLeft } from '@telegram-apps/telegram-ui/dist/icons/24/chevron_left';
import { Icon24ChevronRight } from '@telegram-apps/telegram-ui/dist/icons/24/chevron_right';
import { FC, useMemo } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import tonSvg from './ton.svg';

function getUserRows(user: User): DisplayDataRow[] {
  return Object.entries(user).map(([title, value]) => ({ title, value }));
}

export const IndexPage: FC = () => {
  const initDataState = useSignal(_initDataState);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [initDataState]);

  const fullName = userRows
    ?.filter(row => ['first_name', 'last_name'].includes(row.title))
    .map(row => row.value)
    .filter(Boolean)
    .join(' ') as string;
  const photoUrl = userRows?.find(row => row.title === 'photo_url')?.value as string;
  const username = userRows?.find(row => row.title === 'username')?.value as string;

  return (
    <Page back={false}>
      <List>
        <Section header="Мой аккаунт">
          <Link to="/ton-connect">
            <Cell
              before={<Image src={photoUrl || tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
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
      <Tabbar>
        <Tabbar.Item key="init" text="Init data" selected={false} onClick={() => alert('init')}>
          <Icon24ChevronLeft />
        </Tabbar.Item>
        <Tabbar.Item key="launch" text="Launch params" selected={false} onClick={() => alert('launch')}>
          <Icon24ChevronDown />
        </Tabbar.Item>
        <Tabbar.Item key="theme" text="Theme params" selected={false} onClick={() => alert('theme')}>
          <Icon24ChevronRight />
        </Tabbar.Item>
      </Tabbar>
    </Page>
  );
};
