import { Button, Container, Grid, GridCol, Group, Image, Paper, Space, Spoiler, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import classes from './IntroArticles.module.css';

export default function IntroArticles() {
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper} style={{ position: 'relative' }} id="articles">
    <Container className={classes.wrapperContainer} style={{ borderTopRightRadius: 50, borderBottomRightRadius: 50 }} ml="0" pl={{ base: 0, md: '5%', lg: '18%' }} pr={{ base: 0, md: '13%', lg: '18%' }}>
      <Title className={classes.title}>Artikel</Title>
      <Text size="sm" className={classes.description}>
        Ketahui berbagai macam informasi-informasi penting seputar HAISSTIS di sini!
      </Text>
      <Space h="lg"/>
      <Stack>
        <Paper bg="transparent">
          <Grid>
            <GridCol span={{ base: 12, sm: 3}}>
              <Image src="https://i.imgur.com/Cij5vdL.png" height={120} radius={25} />
            </GridCol>
            <GridCol span={{ base: 12, sm: 9}}>
              <Text size="sm" c="dimmed">17 Agustus 2024</Text>
              <Text size="lg" fw={700}>Upacara Bendera</Text>
              <Spoiler maxHeight={80} showLabel="Show more" hideLabel="Hide">
                <Text size="sm">
                  Ayo putra bangsa Harumkan negeri ini Jadikan kita bangga Indonesia Tunjukan pada dunia Bahwa ibu pertiwi Pantas jadi juara Indonesia Jayalah negaraku Tanah air tercinta Indonesia raya Jayalah negaraku Tanah air tercinta Indonesia raya Garuda di dadaku Garuda kebanggaanku Ku yakin hari ini pasti menang... Kobarkan semangatmu Tunjukkan sportivitasmu Ku yakin hari ini pasti menang...
                </Text>
              </Spoiler>
            </GridCol>
          </Grid>
        </Paper>
        <Paper bg="transparent">
          <Grid>
            <GridCol span={{ base: 12, sm: 3}}>
              <Image src="https://i.imgur.com/Cij5vdL.png" height={120} radius={25} />
            </GridCol>
            <GridCol span={{ base: 12, sm: 9}}>
              <Text size="sm" c="dimmed">17 Agustus 2024</Text>
              <Text size="lg" fw={700}>Upacara Bendera</Text>
              <Spoiler maxHeight={80} showLabel="Show more" hideLabel="Hide">
                <Text size="sm">
                  Ayo putra bangsa Harumkan negeri ini Jadikan kita bangga Indonesia Tunjukan pada dunia Bahwa ibu pertiwi Pantas jadi juara Indonesia Jayalah negaraku Tanah air tercinta Indonesia raya Jayalah negaraku Tanah air tercinta Indonesia raya Garuda di dadaku Garuda kebanggaanku Ku yakin hari ini pasti menang... Kobarkan semangatmu Tunjukkan sportivitasmu Ku yakin hari ini pasti menang...
                </Text>
              </Spoiler>
            </GridCol>
          </Grid>
        </Paper>
        <Paper bg="transparent">
          <Grid>
            <GridCol span={{ base: 12, sm: 3}}>
              <Image src="https://i.imgur.com/Cij5vdL.png" height={120} radius={25} />
            </GridCol>
            <GridCol span={{ base: 12, sm: 9}}>
              <Text size="sm" c="dimmed">17 Agustus 2024</Text>
              <Text size="lg" fw={700}>Upacara Bendera</Text>
              <Spoiler maxHeight={80} showLabel="Show more" hideLabel="Hide">
                <Text size="sm">
                  Ayo putra bangsa Harumkan negeri ini Jadikan kita bangga Indonesia Tunjukan pada dunia Bahwa ibu pertiwi Pantas jadi juara Indonesia Jayalah negaraku Tanah air tercinta Indonesia raya Jayalah negaraku Tanah air tercinta Indonesia raya Garuda di dadaku Garuda kebanggaanku Ku yakin hari ini pasti menang... Kobarkan semangatmu Tunjukkan sportivitasmu Ku yakin hari ini pasti menang...
                </Text>
              </Spoiler>
            </GridCol>
          </Grid>
        </Paper>
      </Stack>
      
      <Group my="xl" justify='left'>
        <Button variant="transparent" radius="xl" size="md" className={classes.control}
          leftSection={
            <ThemeIcon radius={50} bg="blue">
              <IconArrowRight color="white"/>
            </ThemeIcon>
          }
          onClick={() => navigate('/articles')}>
          Selengkapnya
        </Button>
      </Group>
    </Container>
    <Container style={{ position: 'absolute', top: '20%', left: '53%' }} visibleFrom='md'>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80)`}}
        className={classes.card}
      >
        <div>
          <Text className={classes.cardCategory} size="xs">
            nature
          </Text>
          <Title order={3} className={classes.cardTitle}>
            Best forests to visit in North Kalimantan
          </Title>
        </div>
        <Button variant="white" color="dark">
          Read article
        </Button>
      </Paper>
    </Container>
    </div>
  );
}