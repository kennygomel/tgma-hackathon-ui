import { Section, Cell, Image, List, Tabbar } from '@telegram-apps/telegram-ui';
import { Icon24ChevronDown } from '@telegram-apps/telegram-ui/dist/icons/24/chevron_down';
import { Icon24ChevronLeft } from '@telegram-apps/telegram-ui/dist/icons/24/chevron_left';
import { Icon24ChevronRight } from '@telegram-apps/telegram-ui/dist/icons/24/chevron_right';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import tonSvg from './ton.svg';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <List>
        <Section
          header="Features"
          footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
        >
          <Link to="/ton-connect">
            <Cell
              before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
              subtitle="Connect your TON wallet"
            >
              TON Connect
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
