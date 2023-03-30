import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
  AppWebsiteVisits,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Fuel Consomption Chart"
              subheader="(+23%) than last year"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
                '12/01/2023',
              ]}
              chartData={[
                {
                  name: 'Car 1',
                  type: 'line',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 40],
                },
                {
                  name: 'Car 2',
                  type: 'line',
                  fill: 'solid',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 53],
                },
                {
                  name: 'Car 3',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 40, 30],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
