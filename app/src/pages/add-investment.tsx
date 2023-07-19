import { useState } from 'react';
import { useAcc } from '@/context/AccountContext';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function AddInvestment() {
  const accountContext = useAcc();
  const router = useRouter();
  const [investmentName, setInvestmentName] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    accountContext.addInvestment(investmentName, investmentAmount);
    router.push('/main');
  };

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
      <Typography color="#000000" variant="h3">
        Add New Investment
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ m: 1 }}>
          <TextField
            id="outlined-basic"
            label="Investment Name"
            onChange={(e) => setInvestmentName(e.target.value)}
            required
            value={investmentName}
            variant="outlined"
          />
        </Box>

        <Box sx={{ m: 1 }}>
          <TextField
            id="outlined-basic"
            label="Investment Amount"
            onChange={(e) => setInvestmentAmount(e.target.value)}
            required
            value={investmentAmount}
            variant="outlined"
          />
        </Box>

        <Box sx={{ m: 1 }}>
          <Button type="submit" variant="contained">
            Add Investment
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
