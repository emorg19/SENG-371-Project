import { useState } from "react";
import { useAcc } from "@/context/AccountContext";
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function AddInvestment() {
  const accountContext = useAcc();
  const router = useRouter();
  const [investmentName, setInvestmentName] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    accountContext.addInvestment(investmentName, investmentAmount);
    router.push("/main");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" color="#000000">
        Add New Investment
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ m: 1 }}>
          <TextField
            required
            id="outlined-basic"
            label="Investment Name"
            variant="outlined"
            value={investmentName}
            onChange={(e) => setInvestmentName(e.target.value)}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <TextField
            required
            id="outlined-basic"
            label="Investment Amount"
            variant="outlined"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
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
