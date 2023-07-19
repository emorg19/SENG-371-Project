import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useAuth } from '../../context/UserContext';
import { Box, Button, Grid, LinearProgress, Typography, linearProgressClasses } from '@mui/material';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import React from 'react';
import Accounts from '@/components/main/accounts';
import getTips from '@/helpers/tips';
import { useAcc } from '@/context/AccountContext';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginTop: '15px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
  }
}));

export default function Main() {
  const userContext = useAuth();
  const router = useRouter();
  const accountContext = useAcc();

  const user = userContext.currentUser();
  const account = accountContext.currentAccount();

  const total = Number(account?.savings) + Number(account?.checking);

  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta content="Piggy Bank bank account" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/piggy-bank.ico" rel="icon" />
      </Head>
      <main className={styles.accountPage}>
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
                color="secondary"
                onClick={() => {
                  router.push('/main');
                }}
                variant="contained">
                Back
              </Button>
            </Grid>
            <Grid item xs={12}>
              <div className={styles.description}>Welcome {user?.username || ''}, here are your account balances</div>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            height: '60%',
            width: 1,
            paddingTop: '25px',
            paddingLeft: '25px',
            paddingRight: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Grid container direction="column" spacing={2} sx={{ justifyContent: 'flex-start', width: '60%', height: 1 }}>
            <Grid item sx={{ height: '33%' }} xs={4}>
              <Accounts />
            </Grid>
          </Grid>
          <Box
            sx={{
              bgcolor: '#ffffff',
              color: '#000000',
              borderRadius: 2,
              width: '35%',
              height: '80%',
              padding: '15px',
              fontSize: '25'
            }}>
            <Button onClick={() => router.push('/bankPages/budgets')}>Budget info</Button>
            <Box
              p={4}
              sx={{
                flexGrow: 5,
                height: '100%'
              }}>
              {getTips(total)}
              <Typography color="1a90ff" fontSize={20} sx={{ paddingTop: '25px' }} textAlign="center">
                You have {Math.round((Number(account?.spent) / Number(account?.budget)) * 100)}% (${Number(account?.budget) - Number(account?.spent)}) left in your
                budget for this month!
              </Typography>
              <BorderLinearProgress value={Math.round((Number(account?.spent) / Number(account?.budget)) * 100)} variant="determinate" />
              <Typography color="1a90ff" fontSize={20} sx={{ paddingTop: '25px' }} textAlign="center">
                You have spent ${Number(account?.spent)} of ${Number(account?.budget)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
}
