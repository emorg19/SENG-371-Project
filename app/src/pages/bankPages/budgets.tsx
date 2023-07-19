import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useAuth } from '../../context/UserContext';
import { useAcc } from '@/context/AccountContext';
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Accounts from '@/components/main/budgets';
import getTips from '@/helpers/tips';

export default function Main() {
  const userContext = useAuth();
  const router = useRouter();
  const accountContext = useAcc();
  const account = accountContext.currentAccount();
  const budget = account?.budget;
  const spent = account?.spent;
  const user = userContext.currentUser();
  const total = Number(account?.savings) + Number(account?.checking);
  console.log(account)
  /*
   * Console.log('userContext', userContext);
   * console.log('userContext.currentUser()', userContext.currentUser());
   */

  const budgetDisplay = (budget, spent) => {
    if (budget > 0) {
      return (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <Typography color="#000000" fontSize="100">
            You have spent {spent} of your {budget} budget. Happy Savings :)
          </Typography>

          <Button color="tertiary" variant="contained">Add Budget</Button>

          <Paper elevation={1}>
            <Box
              p={4}
              sx={{
                flexGrow: 0,
                height: '100%'
              }}
            >
              {getTips(total)}

              <LinearProgress value={(Number(account?.spent) / Number(account?.budget)) * 100} variant="determinate" />
            </Box>
          </Paper>
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
        }}
      >
        <Grid container direction="column" spacing={2} sx={{ justifyContent: 'flex-start', width: '60%', height: 1 }}>
          <Grid item sx={{ height: '33%' }} xs={4}>
            <Accounts />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <Head>
        <title>Piggy Bank</title>

        <meta content="Piggy Bank bank account" name="description" />

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
          }}
        >
          <Grid container spacing={2} sx={{ paddingTop: '35px' }}>
            <Grid item xs={2}>
              <Button
                color="tertiary"
                onClick={() => {
                  router.push('/main');
                }}
                variant="contained"
              >
                Back
              </Button>
            </Grid>

            <Grid item xs={12}>
              <div className={styles.description}>Welcome {user?.username || ''}, here are your budgets</div>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            width: 1,
            height: '60%',
            position: 'top'
          }}
        >
          {budgetDisplay(budget, spent)}
        </Box>
      </main>
    </>
  );
}
