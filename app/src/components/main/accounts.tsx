import { Button, Modal, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from "@/styles/appTheme"
import { useAcc } from "@/context/AccountContext"
import { useRouter } from "next/router"
import React from "react"
import AddFunds from "./AddFunds"


export const accountComponent = (value: number, title: string) => {
  return (
    <Paper elevation={1}>
      <Box
        m={2}
        sx={{
          flexGrow: 0,
          display: { xs: "none", md: "flex" },
        }}
      >
        <Box
          p={4}
          sx={{
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Typography fontSize={40} color={"black"} textAlign="left">
            {title}
          </Typography>
        </Box>
        <Box
          p={4}
          sx={{
            flexGrow: 0,
            height: "100%",
          }}
        >
          <Typography
            fontSize={40}
            color={theme.palette.primary.main}
            textAlign="left"
          >
            ${value}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
export default function Accounts() {
  const accountContext = useAcc()
  const router = useRouter()

  const account = accountContext.currentAccount()

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddFunds handleClose={handleClose} />
      </Modal>
      <Paper elevation={1}>
        <Box p={4}>
          <Button onClick={() => router.push("/bankPages/accounts")}>
            <Typography fontSize={20} color={"black"} textAlign="left">
              Bank accounts
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "15px" }}
            onClick={handleOpen}
          >
            Transfer Between Accounts
          </Button>
          {accountComponent(account?.checking || 0.0, "Chequing")}
          {accountComponent(account?.savings || 0.0, "Savings")}
        </Box>
      </Paper>
    </>
  )
}