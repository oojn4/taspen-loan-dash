import { Button, Container, Grid, GridCol, Group, Image, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import classes from './IntroHaisstis.module.css';
import image from './image.svg';

export default function IntroHaisstis() {
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper} id="home">
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Halo Warga HAISSTIS!
          </Title>
          <Text c="dimmed" mt="md">
            Himpunan Alumni AIS/STIS(HAISSTIS) merupakan organisasi yang dibentuk sebagai wadah silaturahmi alumni Akademi Ilmu Statistik (AIS) / Sekolah Tinggi Ilmu Statistik (STIS) / Politeknik Statistika STIS (Polstat STIS). HAISSTIS dibentuk untuk menjaga jalinan hubungan kekeluargaan para alumni yang berasal dari beragam suku, agama, dan budaya melalui sinergi yang memberikan dampak bagi sesama alumni maupun masyarakat.
          </Text>

          <Group my="md">
            <Button variant="transparent" radius="xl" size="md" className={classes.control}
              leftSection={
                <ThemeIcon bg='blue' radius={50}>
                  <IconArrowRight color='white' />
                </ThemeIcon>} 
              onClick={() => navigate('/about')}>
              Selengkapnya
            </Button>
          </Group>

          <Grid>
            <GridCol span={{ base: 12, md: 3 }}>
              <Stack gap={0}>
                <Text size="xl" fw={500}>1234</Text>
                <Text size="xs">Peserta terdaftar</Text>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 3 }}>
              <Stack gap={0}>
                <Text size="xl" fw={500}>304</Text>
                <Text size="xs">Kegiatan berlangsung</Text>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 3 }}>
              <Stack gap={0}>
                <Text size="xl" fw={500}>10jt</Text>
                <Text size="xs">Donasi diberikan</Text>
              </Stack>
            </GridCol>
          </Grid>
          
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
    </div>
  );
}