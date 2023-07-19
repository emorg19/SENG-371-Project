import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { Box, Paper, Container, Typography, Button } from "@mui/material"
import { theme } from "@/styles/appTheme"
import { useAuth } from "../context/UserContext"
import { useRouter } from "next/router"

export default function Home() {
  const user = useAuth().currentUser()
  const router = useRouter()

  const buttonDisplay = (user) => {
    if(user){
      return (
        <Box sx={{
          height: '100%',
          width: 1,
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <Button variant='contained' sx={{
            height: '50%', 
            width: '10rem'
            }} onClick={() => router.push("/bankPages/accounts")}>Accounts</Button>
          <Button variant='contained' sx={{
            height: '50%', 
            width: '10rem'
            }} onClick={() => router.push("/bankPages/budgets")}>Budget</Button>
            <Button variant='contained' sx={{
            height: '50%', 
            width: '10rem'
            }} onClick={() => router.push("/main")}>Main</Button>
            <Button variant='contained' sx={{
            height: '50%', 
            width: '10rem'
            }} onClick={() => router.push("/bankPages/payments")}>Payments</Button>
            <Button variant='contained' sx={{
            height: '50%', 
            width: '10rem'
            }} onClick={() => router.push("/bankPages/investments")}>Investments</Button>
        </Box>
      )
    }else{
      return (
        <Box sx={{
          height: '100%',
          width: 1,
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <Button variant='contained' sx={{
            height: '50%', 
            width: '10rem'
            }} onClick={() => router.push("/user/login")}>Login</Button>
          <Button variant='contained' sx={{
            height: '50%', 
            width: '10rem'
            }} onClick={() => router.push("/user/signup")}>Signup</Button>
        </Box>
      )
    }
  }

  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy Bank Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/piggy-bank.ico" />
      </Head>
      <>
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: 1,
            height: "75%",
            position: "top",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: "100%",
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontSize={75} color={"white"} textAlign="left">
              <strong>
                Welcome to PiggyBank, {user?.username || "please login"}
              </strong>
            </Typography>
          </Box>
        </Box>
        <Box sx={{
            backgroundColor: "#FFFFFF",
            width: 1,
            height: "25%",
          }}>
            {buttonDisplay(user)}
        </Box>
      </>
    </>
  )
}
