import { Paper, Text, Title } from '@mantine/core';
import classes from './LoanInformation.module.css';

const LoanInformation = () => {
  return (
    <Paper className={classes.headerForm}>
      <Title className={classes.title} ta="left">
        Simulasi Pinjaman Properti
      </Title>
      <Text fz="sm" ta="left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur maxime provident est molestias modi praesentium mollitia, facilis temporibus rem. Nam illo eum quia assumenda voluptas atque quis eos commodi modi.
      </Text>
    </Paper>
  )
}

export default LoanInformation