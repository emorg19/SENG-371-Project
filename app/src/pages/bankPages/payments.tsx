import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useAuth } from '../../context/UserContext';
import { Box, Button, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { color } from '@mui/system';
import React, { useState } from 'react';

import Accounts from '@/components/main/payments';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function Main() {
  const userContext = useAuth();
  const router = useRouter();

  const user = userContext.currentUser();

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
          }}
        >
          <Grid container spacing={2} sx={{ paddingTop: '35px' }}>
            <Grid item xs={2}>
              <Button
                color="secondary"
                onClick={() => {
                  router.push('/main');
                }}
                variant="contained"
              >
                Back
              </Button>
            </Grid>

            <Grid item xs={12}>
              <div className={styles.description}>
                Welcome {user?.username || ''}, here are your recent and recurring payments
              </div>
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
          }}
        >
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
              height: '90%',
              padding: '10px',
              fontSize: '25',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            <Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }} container rowSpacing={1}>
              <Grid item xs={6}>
                <Item>
                  <p style={{ fontSize: '25px', textAlign: 'center' }}>Payee</p>

                  <div style={{ fontSize: '18px' }}>
                    <p>VISA</p>

                    <p>MasterCard</p>

                    <p>Telus</p>

                    <p>BC Hydro</p>

                    <p>UVIC</p>

                    <p>Lamborghini</p>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={6}>
                <Item>
                  <p style={{ fontSize: '25px', textAlign: 'center' }}>Payment Due</p>

                  <div style={{ fontSize: '18px' }}>
                    <p>$100.00</p>

                    <p>$50.00</p>

                    <p>$75.00</p>

                    <p>$200.00</p>

                    <p>$25.00</p>

                    <p>$1,500,000.00</p>
                  </div>
                </Item>
              </Grid>
            </Grid>

            <p style={{ fontSize: '14px' }}>
              **Please note that it may take up to 3 business days for the payable amount to be updated.
            </p>
          </Box>
        </Box>
      </main>
    </>
  );
}
