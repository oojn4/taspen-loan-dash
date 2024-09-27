import { Button, Container, Group, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import classes from './IntroCourses.module.css';

export default function IntroCourses() {
  const navigate = useNavigate()

  return (
    <div className={classes.wrapper} id="courses">
    <Container className={classes.wrapperContainer}>
      <Title className={classes.title}>Yuk, tingkatkan kemampuanmu di sini!</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Ikuti berbagai macam kelas GRATIS pengembangan kompetensi sesuai dengan minat dan passion-mu!
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, md: 2 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        <ArticleCard />
        <ArticleCard />
      </SimpleGrid>
      <Group my="xl" justify='center'>
        <Button variant="transparent" radius="xl" size="md" className={classes.control}
          leftSection={
            <ThemeIcon radius={50} bg="blue">
              <IconArrowRight color="white"/>
            </ThemeIcon>
          }
          onClick={() => navigate('/courses')}>
          Selengkapnya
        </Button>
      </Group>
    </Container>
    </div>
  );
}