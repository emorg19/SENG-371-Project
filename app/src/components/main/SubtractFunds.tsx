import { Button, Select, TextField, Typography, MenuItem, FormControl, InputLabel } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { Formik } from "formik"
import { useAcc } from "@/context/AccountContext"
import * as Yup from "yup"

export const transactionSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  account: Yup.string().required("Required"),
})

export default function SubtractFunds(props: { handleClose: () => void }) {
  const accountContext = useAcc()

  const sendTransaction = async (values: {
    amount: number
    account: string
  }) => {
    accountContext.subtractFunds(values.amount, values.account)
    location.reload()
  }

  return (
    <>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          alignItems: "center",
          justifyContent: "space-between",
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Make Payment
        </Typography>
        <>
          <Formik
            validationSchema={transactionSchema}
            initialValues={{ amount: 0, account: "" }}
            onSubmit={(values) => {
              sendTransaction(values)
              props.handleClose()
            }}
          >
            {({ values, errors, handleChange, handleSubmit }: any) => (
              <Box>
                <Box
                  p={4}
                  sx={{
                    flexGrow: 0,
                    display: { xs: "none", md: "flex" },
                    width:300,
                  }}
                >
                  <InputLabel id="accounts-label">Accounts</InputLabel>
                  <Select
                    labelId="accounts-label"
                    onChange={handleChange}
                    name="account"
                    label="Accounts"
                    variant="outlined"
                    >
                    <MenuItem value="checking">Chequings</MenuItem>
                    <MenuItem value="savings">Savings</MenuItem>
                  </Select>
                </Box>
                <Box
                  p={4}
                  sx={{
                    flexGrow: 0,
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  <FormControl>
                  <TextField
                    onChange={handleChange}
                    type="string"
                    label="Payee Account number"
                    name="amount"
                  />
                  <TextField
                    onChange={handleChange}
                    type="number"
                    label="Amount Payable"
                    name="amount"
                  />
                  </FormControl>
                </Box>

                <Box
                  p={4}
                  sx={{
                    flexGrow: 0,
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: "5px" }}
                    onClick={handleSubmit}
                  >
                    Send Funds
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </>
      </Box>
    </>
  )
}
