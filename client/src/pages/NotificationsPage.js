import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// sections
import {
  AppCurrentVisits,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={5}>
              <AppCurrentVisits
                title="Insurance"
                chartData={[
                  { label: 'restent', value: 4344 },
                  { label: '', value: 5435 },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.warning.main,
                ]}
              />
        </Grid>
        <Grid item xs={12} md={3} lg={5}>
              <AppCurrentVisits
                title="Visit"
                chartData={[
                  { label: 'restent', value: 4344 },
                  { label: '', value: 5435 },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.warning.main,
                ]}
              />
        </Grid>
      </Grid> 
    </>
  );
}
