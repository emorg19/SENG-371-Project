import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Formik } from 'formik';
import router, { useRouter } from 'next/router';
import { useAcc } from '@/context/AccountContext';
import * as Yup from 'yup';

export const transactionSchema = Yup.object().shape({
  amount: Yup.number().required('Required'),
  account: Yup.string().required('Required')
});

export default function SubtractFunds(props: { handleClose: () => void }) {
  const accountContext = useAcc();

  const sendTransaction = async (values: { amount: number; account: string }) => {
    accountContext.subtractFunds(values.amount, values.account);
    router.push('/main');
    location.reload();
  };

  return (
    <Box
      sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 4
      }}
    >
      <Typography color="black" component="h2" id="modal-modal-title" variant="h6">
        Invest Funds
      </Typography>

      <>
        <Formik
          initialValues={{ amount: 0, account: '' }}
          onSubmit={(values) => {
            sendTransaction(values);
            props.handleClose();
          }}
          validationSchema={transactionSchema}
        >
          {({ values, errors, handleChange, handleSubmit }: any) => (
            <Box>
              <Box
                p={4}
                sx={{
                  color: 'black',
                  flexGrow: 0,
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                Account Name
                <Select name="account" onChange={handleChange}>
                  <MenuItem value="checking">Chequings</MenuItem>
                  <MenuItem value="savings">Savings</MenuItem>
                </Select>
              </Box>
              <Box
                p={4}
                sx={{
                  flexGrow: 0,
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                <TextField label="Input Field" name="amount" onChange={handleChange} type="number" />
              </Box>

              <Box
                p={4}
                sx={{
                  flexGrow: 0,
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                <Button color="tertiary" onClick={handleSubmit} sx={{ padding: '5px' }} variant="contained">
                  Invest
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </>
    </Box>
  );
}
