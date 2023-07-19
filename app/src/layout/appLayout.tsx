import Footer from "../components/footer"
import Navbar from "../components/navbar"
import styles from "../../styles/Home.module.css"
import { Box, Container, Grid } from "@mui/material"

export default function Layout({ children }: any) {
  return (
    
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      textAlign={"center"}
      justifyContent={"center"}
    >
      <Box sx={{ height: "5vh" }}>
        <Navbar />
      </Box>
      <Box sx={{ display: "flex", flex: 1 }}>
      <Container maxWidth={"xl"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}
