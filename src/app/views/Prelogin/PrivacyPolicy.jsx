import React, { useEffect } from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useLocation } from 'react-router-dom';
import NavBar from "./NavBar";
import Footer from './Footer';
export default function PrivacyPolicy() {
    const a=useLocation().pathname;
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [])
  return (
    <>
    {(a==="/session/privacypolicy")?<NavBar/>:('')}
    <Container sx={{
        backgroundColor:"white",
        mt:10,
        mb:2,
    }}>
      <Box sx={{pt:1,pb:10,px:{md:10,xs:1}}}>
        <Box>
          <Typography
            variant="h3"
            align="center"
            fontWeightRegular="400"
            mt={3}
            fontFamily="-webkit-body"
          >
            Privacy Policy
          </Typography>

          <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}} mt={3}>
            This policy elaborates the information that we collect, process, and
            share to help TenantOwner provide its customers the best experience
            as on the 19th of August, 2022. Changes to this policy will be
            constantly updated in this page and be informed to our customers as
            and when they happen. TenantOwner is a fully owned brand of
            AMRRTechSols Pvt. Ltd. having its office in Bhubaneswar, Odisha,
            India. Details of our office can be found at the “Contact Us” page
            in our website.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="left" mt={4} fontFamily="-webkit-body">
            A. Information collected
          </Typography>

          <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}} mt={3}>
            TenantOwner provides a platform for its users in the form of both
            website as well as mobile applications available at Apple Store and
            Google Play Store, to find property on rent, find tenants, and also
            manage the entire tenancy journey of a property.
          </Typography>
          <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
                <br/>
            In order to achieve the above desired service, TenantOwner collects
            user information like their name, age, sex, location, property
            details, and more. Also in order to create an account, and in order
            to verify that accounts are created by genuine individuals,
            TenantOwner collects user contact information that include
            information like their phone numbers, email address, and social
            global unique id (in case they want to sign in using other
            applications such as Facebook, Google, etc.).
          </Typography>
          <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
            <br/>
            Broadly, information collected and/or processed by TenantOwner can
            be segregated into the following categories:
          </Typography>
          <Box>
            <Typography variant="h6" fontFamily="-webkit-body" fontWeight="bold" marginTop="15px">
              1. User provided information:
            </Typography>
            <Typography marginTop="10px" fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
              Any information that a user submits belong to this categorization.
              Information could be non-identifiable like users’ name, age, sex,
              location, and could be indefinable like email addresses, phone
              numbers, current location, pictures and videos, etcs. Such
              information are exclusively provided/uploaded by the user. Our
              services are available only to users subject to them agreeing to
              share such information with us.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" fontFamily="-webkit-body" marginTop="15px">
              2. User consented information:
            </Typography>
            <Typography marginTop="10px" fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
              In order to provide best services we need to analyse user
              behaviour while using our services. Information such as the
              browser they are using, time of day they are logged in, operating
              systems, device type, are collected for us to analyse and
              design/improve our services for users using different types of
              devices. Such information are typically collected through the
              usage of cookies. Sometimes, we may need to read user’s sms
              information in order to provide a seamless login experience. Our
              services are available only to users subject to them agreeing to
              share such information with us.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" fontFamily="-webkit-body" marginTop="15px">
              3. User Purchase Transaction Information:
            </Typography>
            <Typography marginTop="10px" fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
              Some products and services are available to our users against a
              payment. In order to avail such services, users have to provide
              their card details as needed by our payment gateway partners.
              Information thus collected are used only for that particular
              transaction which could be either one time or be based on a
              subscription model. In either scenario, we do not save any
              credit/debit card information and even any such financial
              information. However we store the invoice information that would
              be necessary enough to identify the purchases/financial
              transactions that a user has done on our portal for accounting and
              transparency purposes. Our services are available only to users
              subject to them agreeing to share such information with us.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" fontFamily="-webkit-body" marginTop="15px">
              4. User usage information:
            </Typography>
            <Typography marginTop="10px" fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
              In order to provide the best services to our users, we do analysis
              on our user’s usage pattern, in terms of the activities that they
              upload in our website, time they spend on our website, products
              they browse in our merchandize store section within our website,
              services that they are interested in that are available at
              TenantOwner.com, activities that they do, and more. Such analysis
              helps us understand what our users like the most and what products
              and/or services are of most importance and interest to our users.
              All user information regarding their usage is only pertaining to
              their usage of the TenantOwner platform. Our services are
              available only to users subject to them agreeing to share such
              information with us.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" fontFamily="-webkit-body" marginTop="15px">
              5. Information provided by users about each other:
            </Typography>
            <Typography marginTop="10px" fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
              Users are advised to not to share information both in the form of
              text, images, or videos that they deem sensitive to their privacy.
              It is to be noted that we take utmost and necessary industry
              accepted and followed care to protect your information from
              fraudulent attacks and threats. Our services are available only to
              users agreeing to our Terms and Conditions, and Privacy Policy.
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" align="left" fontFamily="-webkit-body" mt={3}>
            B. How we use the collected information
          </Typography>

          <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}} mt={3}>
            Information collected and/or generated via processing collected
            information is used to identify the products/services that are most
            beneficial/interesting to our users. Certain information are used to
            identify users when they login so as to provide them only the data
            that they have uploaded or is of use to them. Such information could
            be like their email addresses, phone numbers, and social login
            global unique ids. We also process user usage data to understand our
            user behaviour such as time of the day when they use our services,
            things they are interested in, and things that are the most popular,
            things that other users like, and so on. Information thus process
            could take user data such as demographics as input. Such information
            processing and analysis help us improve our services such that we
            provide the best user experience. We also collect and process user
            system information like the browser they are using, the operating
            information they are using, and so on, in order to improve our user
            experience for user groups using similar systems.
          </Typography>
          <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
                <br/>
            Financial information are collected to complete any purchase that a
            user would want to perform against products/services available on
            our website and/or in our mobile applications. Such information is
            collected and used only for that particular transaction and are
            handled by our third party, globally accepted and preferred payment
            gateway partners in a secure manner adhering to best industry
            standards.
          </Typography>
          <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
            <br/>
            We also process user information to advertise products and services
            that would they would be interested in. Processing of all user
            information is carried out via our proprietary algorithms and no
            information that could be used to identify our users is shared with
            anyone.
          </Typography>
          <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
                <br/>
            We also carry out statistical analysis of user data, for research
            and development purposes and output of such work could be shared in
            various forms like research reports, etc. No information that can
            personally identify any of our user is shared with anyone.
          </Typography>
        </Box>
        <Box>
          <Box>
            <Typography variant="h5" align="left" fontFamily="-webkit-body" mt={3}>
              C. Information Sharing
            </Typography>

            <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}} mt={3}>
              Under no circumstances we share user identifiable data with
              anyone, including our partners. Certain information like
              credit/debit card, etc., that is collected for transactional
              purposes and is expressively used by our third party payment
              gateway partners are collected and shared with them for that
              respective transaction only. Also in case of transactions that
              involve shipment of physical purposes, information such as user
              address and other relevant contact details would be collected.
              Such information is shared with our fulfilment and shipping
              partners.s. Our partners can access generated information that
              have resulted from processing user data so as to understand their
              and our customers, their demographics, target segments, and
              products/services provided in our platform. Such information is in
              the form of research output and cannot be used in identifying any
              of our users
            </Typography>
            <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <br/>
              User information may also be shared with government and legal
              authorities for law enforcement and legal purposes.
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" align="left" fontFamily="-webkit-body" mt={3}>
            D. Addressing concerns about your information
          </Typography>

          <Typography fontFamily="serif"
              sx={{fontSize:{md:'15px',xs:'11px'}}} mt={3}>
            Users can contact us with their concerns, queries, and doubts by
            raising a ticket done by filling up the form available at our
            support centre module both before and after they are logged in. Or
            users can simply drop an email to tech@amrrtechsols with all the
            details regarding their query. It may take a couple of days for us
            to address your concerns/queries.
          </Typography>
        </Box>
        </Box>
      </Container>
      {(a==="/session/privacypolicy")?<Footer/>:('')}
    </>
  )
}
