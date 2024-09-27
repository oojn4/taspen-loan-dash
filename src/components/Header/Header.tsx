import {
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Title,
  rem
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LocaleToggle from '../LocaleToggle/LocaleToggle';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import classes from './Header.module.css';

export default function HeaderComponent() {
  const [drawerOpened, { close: closeDrawer }] = useDisclosure(false);
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleClickedLogo = () => {
    navigate('/');
  }

  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between" h="100%" gap={0}>
          <Title
            order={3}
            onClick={handleClickedLogo}
            style={{ cursor: 'pointer'}}>
            {t('app-name')}
          </Title>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/#" className={classes.link}>
              {t('header.home')}
            </a>
            <a href="/loan" className={classes.link}>
              {t('header.loan')}
            </a>
          </Group>

          <Group visibleFrom="sm" gap={5}>
            <LocaleToggle />
            <ThemeToggle />
            {/* <UserToggle /> */}
          </Group>

        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={t('app-name')}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="/#" className={classes.link}>
            {t('header.home')}
          </a>
          <a href="/loan" className={classes.link}>
            {t('header.loan')}
          </a>

          <Divider my="sm" />

        </ScrollArea>
      </Drawer>
    </>
  );
}