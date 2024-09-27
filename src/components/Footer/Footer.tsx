import { ActionIcon, Anchor, Container, Group, rem, Text, Title } from '@mantine/core';
import { IconBrandFacebook, IconBrandInstagram, IconPointFilled } from '@tabler/icons-react';
import classes from './Footer.module.css';

const FOOTERDATA = [
  {
    title: 'Menu',
    links: [
      { key: 'articles', label: 'Artikel', link: '/#articles' },
      { key: 'users', label: 'Anggota', link: '/#users' },
      { key: 'courses', label: 'Pengembangan', link: '/#courses' },
      { key: 'about', label: 'Tentang Kami', link: '/about' },
      { key: 'faq', label: 'FAQ', link: '/faq' },
    ],
  },
  {
    title: 'Other Website',
    links: [
      { key: 'bps', label: 'Badan Pusat Statistik', link: 'https://www.bps.go.id/id' },
      { key: 'stis', label: 'Politeknik Statistika STIS', link: 'https://www.stis.ac.id/' },
    ],
  },
];

export default function Footer() {
  const groups = FOOTERDATA.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer} id="about">
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Title>HAISSTIS</Title>
          <Text size="xs" c="dimmed" className={classes.description}>
            Himpunan Alumni Mahasiswa AIS - STIS
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          +62 812-7640-267 <IconPointFilled size={14}/> haisstis@stis.ac.id
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          {/* @ts-ignore */}
          <ActionIcon size="lg" color="gray" variant="subtle" component={Anchor} href="https://www.facebook.com/groups/91859526265" target="_blank">
            <IconBrandFacebook style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          {/* @ts-ignore */}
          <ActionIcon size="lg" color="gray" variant="subtle" component={Anchor} href="https://www.instagram.com/haisstis_official/" target="_blank">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}