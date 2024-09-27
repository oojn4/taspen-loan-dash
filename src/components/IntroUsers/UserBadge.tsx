import { Avatar, Center, Paper, Text } from '@mantine/core'

const UserBadge = ({ member } : { member: any }) => {
  return (
    <Paper bg='transparent' style={{textAlign:'center'}}>
      <Center>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
          size={108}
          radius="50%"
        />
      </Center>
      <Text fw="bold">{member.nama}</Text>
      <Text c="dimmed">Angkatan {member.cohort}</Text>
    </Paper>
  )
}

export default UserBadge