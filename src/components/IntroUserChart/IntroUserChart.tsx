import { BarChart } from '@mantine/charts';
import { Container, Space, Title } from '@mantine/core';
import { data } from './data';
import classes from './IntroUserChart.module.css';

export default function IntroUserChart() {
  return (
    <div className={classes.wrapper} id="users">
      <Container className={classes.wrapperContainer}>
        <Title className={classes.title}>Berapa banyak sih anggota kita?</Title>
        <Space h="xl" />
        <br/><br/>
        <BarChart
          h={300}
          data={data}
          dataKey="month"
          className={classes.root}
          series={[{ name: 'data', color: 'var(--bar-color)' }]}
          // yAxisLabel='data'
          // xAxisLabel='bulan'
        />
        <Space h="xl" />
      </Container>
    </div>
  );
}