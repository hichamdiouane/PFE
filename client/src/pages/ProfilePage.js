import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import DashboardLayout from '../layouts/dashboardUser';
import { AccountProfile } from '../sections/@dashboard/account/Account-profile';
import { AccountProfileDetails } from '../sections/@dashboard/account/Account-profile-details';

const ProfiePage = () => (
  <>
    <Helmet>
      <title> Profile | Hicham   </title>
    </Helmet>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

ProfiePage.getLayout = (ProfiePage) => (
  <DashboardLayout>
    {ProfiePage}
  </DashboardLayout>
);

export default ProfiePage;