import { Center, Container, Grid, GridCol, Paper, SimpleGrid, Text, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MEMBERSDUMMY } from '../../data/members';
import { RootState } from '../../store/store';
import { showWarningNotification } from '../../utils/notifications';
import classes from './IntroUsers.module.css';
import UserBadge from './UserBadge';

export default function IntroUsers() {
  const user = useSelector((state: RootState) => state.auth.user)
  // const searchParams = useSearchParams();
  // const search = searchParams.get('s')
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')
  const [members, setMembers] = useState<any>()

  useEffect(() => {
    setMembers(MEMBERSDUMMY)
  }, [])

  return (
    <div className={classes.wrapper} id="users">
    <Container className={classes.wrapperContainer}>
      <Title className={classes.title}>Cari Rekan HAISSTIS di sini!</Title>
      <Text size="sm" className={classes.description}>
        Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ala ala 
      </Text>

      <Container size="560" mt="lg">
        <Grid>
          <GridCol>
            <form onSubmit={(e) => {
              e.preventDefault();
              if(!user){
                setSearchValue('')
                showWarningNotification(
                  'Warning',
                  'Silakan login terlebih dahulu!',
                  3000
                );
              } else {
                navigate(`/user-search?s=${searchValue}`)
              }
            }}>
              <TextInput placeholder='Cari rekanmu ...' rightSection={<IconSearch />} radius={25} value={searchValue} onChange={(e) => setSearchValue(e.target.value) }/>
            </form>
          </GridCol>
        </Grid>
      </Container>
      
      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 5 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {members &&
          members.map((member: any, idx: number) => 
            <UserBadge key={idx} member={member} />
          )
        }
        <Center>
          <Paper radius='50%' style={{textAlign:'center', justifyContent:'end', cursor: 'pointer', 'width': 'calc(6.75rem * var(--mantine-scale))', height: 'calc(6.75rem * var(--mantine-scale))'}}
            onClick={() => {
              if(!user){
                setSearchValue('')
                showWarningNotification(
                  'Warning',
                  'Silakan login terlebih dahulu!',
                  3000
                );
              } else {
                navigate('/user-search')
              }
            }}>
            <Text mt="calc(1.7rem * var(--mantine-scale))">+1000</Text>
            <Text c="dimmed" fs='xs'>Lainnya</Text>
          </Paper>
        </Center>
      </SimpleGrid>
    </Container>
    </div>
  );
}
