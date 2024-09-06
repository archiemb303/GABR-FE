import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";

const Aboutus = () => {
  const a=useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
    <NavBar/>
    <Container sx={{backgroundColor:"white",my:2,mt:10}}>
      <Box sx={{pt:3,pb:10,px:{md:10,xs:2}}}>
          <Box>
            <Typography
             variant='h3'
             align="center"
             fontWeightRegular= '400'
             fontFamily="-webkit-body"
            >
              
              About Us
            </Typography>

            <Typography
              fontFamily="serif"
              // sx={{fontSize:{md:'20px',xs:'16px'}}}
              sx={{fontSize:{md:'15px',xs:'11px'}}}
               mt={3}
            >
              TenantOwner, a brand owned entirely by AMRR TechSols Pvt Ltd is an
              endeavour to normalize and standardize renting process in India,
              starting from finding the right property and tenants for home
              seekers and owners respectivvely all the way to managing the
              properties, tenancy, and its termination. It is an edeavour to
              make renting simple, easy, and transparent.
            </Typography>
          </Box>
          <Box>
            <Typography
               variant='h5'
               align="left"
               fontWeightRegular= '400'
               mt={3}
               fontFamily="-webkit-body"
            >
              How it works?
            </Typography>

            <Typography
            fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}
               mt={3}
            >
              In TenantOwner, property owners and agents can place their
              properties an ad to find tenants, and home seekers search for
              places to rent. Once they meet each other and finalize to enter
              into a tenancy contract, they can generate and sign rental
              agreements all within the portal.
            </Typography>
          </Box>
          <Box>
            <Typography
               variant='h5'
               align="left"
               fontWeightRegular= '400'
               mt={3}
               fontFamily="serif"
            >
              How is it different from other property search places?
            </Typography>

            <Typography
            fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}
                mt={3}
            >
              All property listed are verified and recent. Auto expiry feature
              of the portal ensures that home seekers see active and latest ad
              placements only. Also there is one package that fits all, with no
              confusing terms and conditions is what differnetiates us from
              others. Finding property is a hassled process with property serach
              being too complicated and frustrating. TenantOwner wants to make
              renting process butter smooth.
            </Typography>
          </Box>

          <Box>
            <Typography
               variant='h5'
               align="left"
               fontWeightRegular= '400'
               mt={3}
               fontFamily="-webkit-body"
            >
              Do I need to pay to use TenantOwner?
            </Typography>

            <Typography
                fontSize='16px'
                mt={3}
                fontFamily="serif"
                sx={{fontSize:{md:'15px',xs:'11px'}}}
            >
              <Typography
                 fontSize='20px'
                 mt={3}
              >
                Yes and No
              </Typography>
              If you just want to search then you do not have to pay anything.
              However if you want to try our premium service, you will not only
              browse through 3X the listing, but also get free rental agreement
              and stamp paper.
            </Typography>
          </Box>
          </Box>
        </Container>
        <Footer/>
    </>
  );
};

export default Aboutus;
