import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useAuth } from '../../context/UserContext';
import { useAcc } from '@/context/AccountContext';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Accounts from '@/components/main/investment';
import Invest from '@/components/main/investment';
import { theme } from '@/styles/appTheme';

export default function Main() {
  const userContext = useAuth();
  const router = useRouter();
  const accountContext = useAcc();
  const account = accountContext.currentAccount();
  const budget = account?.budget;
  const user = userContext.currentUser();

  const budgetDisplay = (budget: number | undefined) => {
    if (budget && budget > 0) {
      return (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}>
          <Typography color="#1a90ff" variant="h3">
            <strong>Your budget: {budget}</strong>
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>
        <Typography color="#1a90ff" variant="h3">
          <strong>You are broke and poor</strong>
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Head>
        <title>Piggy Bank</title>

        <meta content="Piggy Bank bank Investing" name="description" />

        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <link href="/piggy-bank.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            width: 1,
            height: '40%',
            position: 'top'
          }}>
          <Grid container spacing={2} sx={{ paddingTop: '35px' }}>
            <Grid item xs={2}>
              <Button
                color="tertiary"
                onClick={() => {
                  router.push('/main');
                }}
                variant="contained">
                Back
              </Button>
            </Grid>

            <Grid item xs={12}>
              <div className={styles.description}>
                Welcome {user?.username || ''}, here are your suggested Investments
              </div>
            </Grid>
          </Grid>
        </Box>

        <Invest />

        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            width: 1,
            height: '60%',
            position: 'top'
          }}>
          {budgetDisplay(budget)}
        </Box>
      </main>
    </>
  );
}
