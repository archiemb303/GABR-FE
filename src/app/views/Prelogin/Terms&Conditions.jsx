import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import "./swiper.css";
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar'
import Footer from './Footer';

export default function TermsandConditions() {
  const a=useLocation().pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
          {(a==="/session/termsandconditions")?<NavBar/>:('')}

    <Container sx={{backgroundColor:"white",my:2,mt:10}}>
    <Box sx={{pt:3,pb:10,px:{md:10,xs:2}}}>
        <Box>
          <Typography
            variant="h3"
            align="center"
            fontWeightRegular="400"
            mt={3}
            mb={6}
            fontFamily="-webkit-body"
          >
            Acceptance of Terms and Conditions
          </Typography>

          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
            TenantOwner is a fully owned brand of AMRR TechSols Private Limited
            having its office at Bhubaneswar, Odisha, India. This legal
            agreement is between you, the user, and AMRR TechSols Private
            Limited. The brand TenantOwner and AMRR TechSols Private Limited may
            be used interchangeably throughout this document. You are required
            to read both as the one and same entity, unless otherwise mentioned
            specifically. You are also required to read mention of Terms of
            Services, Terms and Conditions, or simple Terms as one and same
            meaning phrase.
            <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <br/>
              By creating an account with TenantOwner either through our mobile
              applications, or through this website, or through any other
              channel, you are required and bound by our Terms of Services,
              Cookie Policy, and Privacy policy elaborated in the respective
              documents. Please be informed that any changes to this terms and
              conditions would be communicated to our users either through in
              application notifications or through email communications or both.
              If any of our subsequent updates are not acceptable to you, then
              you are advised to communicate the same to us and delete your
              account.
            </Typography>
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
            A. Who can use (eligibility)
          </Typography>

          <Typography mt={3}>
            <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              You are required to be at least 18 years old or as limited by the
              jurisdictions your State of residence whichever is higher. You are
              also required to have no criminal background and are of good
              mental state so as to be able to get into a legal agreement. You
              are also required to not be restricted by the legal jurisdiction
              of any State to enter into any contract with anybody. People with
              any history that would restrict them from contacting other people
              are required not to create an account with TenantOwner and/or
              delete any account already created.
            </Typography>
            <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <br/>
              You are required not to create any fake profile or impersonate
              someone else. In the event where you are authorized to manage
              someone else’s TenantOwner profile, a situation that is acceptably
              practiced by high networth individuals (HNI / HNWI), you are
              required to inform the TenantOwner team about such an arrangement.
            </Typography>

            <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <br/>
              TenantOwner does not discriminate people on the basis of caste,
              creed, race, sex, age, nationality, religious practices, political
              affiliations, food habits, sexual orientation, disabilities, or
              anything of that matter that is deemed as personal preferences or
              based on birth or things beyond an individual’s control.
              TenantOwner also does not tolerate indulgence in any acts that
              could be termed discriminatory, derogatory, offensive, or in
              general in bad taste. In the event of TenantOwner team finding any
              such breach, your account will be immediately suspended and the
              incident may be notified to your local governing body.
            </Typography>
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
            B. Your rights and responsibilities
          </Typography>
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}} mt={3}>
            By registering with TenantOwner via any means specified earlier in
            this document, you gain limited rights to use our services
            world-wide. Limits of these rights are as follows:
          </Typography>

          <Box>
            <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <br/>
             <Box component="span"  fontWeight="bold">1.</Box> To use your data/media and display them to people around pursuant
              to the service of TenantOwner.
            </Typography>
          </Box>
          <Box display="flex">
            <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">2. </Box>
              To analyze your data that may or may not include images/media
              uploaded by you, individually and/or collectively for our research
              and development purposes.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">3. </Box>
              To capture screenshots that may or may not include data uploaded
              by you.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">4. </Box>
              To share collective inferences arising out of analysis of your
              data either individually or collectively with third party for
              better service deliverability.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">5. </Box>
              {" "}
              To conduct periodic and random audits for content appropriateness
              and other necessary requirements.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">6. </Box>
              To share your information with local jurisdiction and legal
              authorities as and when required by the latter.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">7. </Box>
              To collect and use information provided by Facebook / Google or
              other third party GUID service providers for easy registration,
              when you choose to signup/sign-in using their GUID services.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">8. </Box>
              {" "}
              To send you promotional and non-promotional communication messages
              either to your email address/phone numbers as provided by you.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">9. </Box>
              To read your SMS inbox in case you permit our mobile application
              to do so for quick sign-in options.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">10. </Box>
              To create derivative work that may or may not take data provided
              by you/uploaded in the portal as inputs. Data provided by you
              includes all information uploaded by you in the portal in any form
              including media files.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">11. </Box>
              To process information collected from you including your usage
              statistics of our services as elaborated in our Privacy Policy
              documents.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">12.</Box>
              To showcase, display, make public, or otherwise transmit
              information uploaded by you in TenantOwner portal.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">13.</Box>
              {" "}
              To host, publish, replicate, recreate, modify, transmit content to
              other users for shareable content authorized by you.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">14.</Box>
              To monitor your account pursuant to complaints arising against you
              by other members.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">15.</Box>
              {" "}
              To suspend/terminate your account for breach of any term enlisted
              in our terms of services, privacy policy, cookie policy, and other
              necessary documents.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">16.</Box>
              To display and/or advertise content generated by us or our third
              party partners that would be targeted based on analysis user data
              either individually or collectively.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">17.</Box>
              To collect and share information like credit and debit card
              details with payment gateway partners for collection of payments.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">18.</Box>
              To collect money/charge your credit/debit card for auto renewal of
              subscription/installment payments.
            </Typography>
          </Box>
          <Box display="flex">
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <Box component="span"  fontWeight="bold">19.</Box>
              To collect and share contact information like phone, email, and
              address in order to fulfill logistical and order fulfilment
              obligations. Please be noted that TenantOwner may access, store,
              and share your information with local governing, jurisdiction, and
              law enforcement agencies if, and as and when required to do so.
            </Typography>
          </Box>
        </Box>
        <Box>
        <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
        D. General rules and guidelines of usage
          </Typography>
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
          TenantOwner is a platform for owners, agents, and tenants to find each other and manage their entire tenancy tenure.
          It is required that you maintain the following guidelines while posting anything the portal
          </Typography>
          <Box>
          <Typography variant="h6" marginTop='15px'fontFamily="-webkit-body">
          1. Keep it factual:
          </Typography>
          <Typography marginTop='10px' fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
          You are required actual images and other details and not try to put any information that is not factual and/is incorrect or misleading
          </Typography>
          </Box>
          <Box marginTop='10px'>
          <Typography variant="h6" fontFamily="-webkit-body">
          2. Keep it specific:
          </Typography>
          <Typography marginTop='10px' fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
          We have tried to design our forms as specific as possible with few places where you can add descriptions to properties. You are requested to not fill this place with unnecessary information that is not directly indirectly related to the facts of the property.
          </Typography>
          </Box>
          <Box marginTop='10px'>
          <Typography variant="h6" fontFamily="-webkit-body">
          3. Keep it comfortable:
          </Typography>
          <Typography marginTop='10px' fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
          We are all social beings; connecting and conversing with other human beings is a core part of being social. You would not talk to anyone you don’t want to talk to; please expect that may happen the other way round. There is nothing personal about it. Hence respect others’ privacy and refrain from trying to communicate with anyone who is not interested in communicating with you.
          </Typography>
          </Box>
          <Box marginTop='10px'>
          <Typography variant="h6" fontFamily="-webkit-body">
          4. Keep it genuine:
          </Typography>
          <Typography marginTop='10px' fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
          As property owners, you may be approached by agents to manage your property. Although we do have a feature where you can check whether you would want ot be contacted by agents or not, there still could be few agents who would disregard your preference. Under such situation, you are advised to raise a complaint with us, and we would first warne the agent and if they do not refrain from such action in the furuter, then we would block them.
          </Typography>
          </Box>
        </Box>
        <Box>
        <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
        E. Disclaimer on our responsibilities
          </Typography>
          <Typography marginTop='10px' fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
          Terms and conditions as listed in this document is formalized as per the date mentioned in the document. In the event of any changes to the Terms of Services, Privacy Policy, Cookie Policy or any other policy required for accessing TenantOwner services, the revised policy will be considered acceptable and agreed by you unless otherwise specifically communicated by you to TenantOwner about your disagreement. You are advised to delete your account with TenantOwner in such events. Any changes to the policy will be communicated through one or more electronic communication methods, viz. notification within our website, notifications in our mobile application, email communication, notification through SMS, general press release.

TenantOwner does not take liability of damages happening out of actions by, or from your engagement with any individual, group of individual, or corporate entity, trying to represent TenantOwner without TenantOwner’s formal and/or legal arrangement.

TenantOwner does not take liability of damages arising out of misconduct carried out by any employee, staff, business partner, or any third party.

TenantOwner does not take responsibility of the content uploaded and/or shared by you or other members that may be termed offensive, discriminatory, illegal, or in simple terms, in bad taste.         
          </Typography>
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}}>
              <br/>
          TenantOwner takes necessary, utmost and industry accepted and practiced standards of care to access, store and process your information. However TenantOwner does not guarantee complete protection of data from malicious attacks.

TenantOwner does not guarantee uninterrupted, continuous, zero downtime, error free service at all times.

TenantOwner does not take responsibilities on any products or services and associated respective guarantees and/or warranties for products and services provided by our third party business partners.

TenantOwner does not take responsibility on the authenticity, ingenuity, and relevance of content uploaded and/or shared by its users.

TenantOwner does not take responsibility of any content uploaded or downloaded by you from within its platform and outside, during, before, and after your usage of our services.   
          </Typography>
        </Box>
        <Box>
        <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
        F. Purchases and Pricing
          </Typography>
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}} marginTop='10px'>
          TenantOwner provides its users some of its features for free. For the entire suite of products, users can buy credits which will then be consumed against each property that is to be managed for one tenancy. Price of each credit point would be fixed and would be revised as per the prevailing business deicisions.

As promotional activities, we may provide our users with free credit points that they can consume against our core services. Users are required to consume these points before they expire.

Under no circumstances, promotional credit points, or points purchased to consume core services are refundable.

   
          </Typography>
          
          <Box>
        <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
        G. Copyright infringement
          </Typography>
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}} marginTop='10px'>
          You shall not use directly or indirectly any material available at TenantOwner that constitute its trademark, trade name, copyrights, logo, design, and any intellectual property of TenantOwner without prior written permission of TenantOwner for purposes including but not limited to recreating, creating derivative work, reverse engineering, misrepresenting, manipulating, and showcasing TenantOwner in bad light.

In case you feel your copyrighted material has been shared by any unauthorized member on TenantOwner platform you are required to inform the same to TenantOwner with appropriate proofs of your ownership of the copyright, details if infringement such that it is possible for TenantOwner the location of such material and take appropriate action. TenantOwner will notify the infringing party to remove such copyrighted material and introduce you with such party and vice versa. Under no circumstances TenantOwner takes the liability or responsibility of discussions, arbitration, disputes, and settlements between you and the infringing party.        
          </Typography>
          
        </Box>

        </Box>
        <Box>
        <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
        H. Third party services
          </Typography>
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}} marginTop='10px'>
          TenantOwner services may contain endorsements, advertisements, and even services from third party service providers. Any such content may redirect you to the respective third party service providers’ pages. Under such events of redirection, your experience at those pages, or the lack of it, would entirely and solely be upon the third part provider. In case you want to take service from such providers, you will be governed by their Terms of Services. Under no circumstances, TenantOwner takes the responsibility nor shall indemnify any damages arising out of any claims or service offering or the lack of it mentioned by such third party agencies. You are advised to read their Terms of Services, Privacy Policy and all other necessary policy documents available at their websites to avail their services.        
          </Typography>
         
        </Box>
        <Box>
        <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
        I. Indemnification by you
          </Typography>
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}} marginTop='10px'>
          By creating an account with TenantOwner you agree to the terms mentions in this document and TenantOwner’s privacy policy, and Cookie policy. You also agree to indemnify TenantOwner and its employees, staff, principals, agents, affiliates, and partners of damages resulting from any event arising out of the content uploaded and/or shared by you, or resultant of your usage of TenantOwner services.         
          </Typography>
          <Box>
        <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
        J. Limitations of liabilities
          </Typography>
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}} marginTop='10px'>
          TenantOwner and its principals, employees, agents, partners, affiliates, and third party providers will not be liable for any direct or indirect damages that may be of tangible or intangible nature, resulting out of 1) your access and use or the absence of the same of its services and products, 2) content uploaded and published by other users, business partners, affiliates, third party service providers, 3) unauthorized access of TenantOwner systems that may contain data uploaded/shared you by malicious programs, individuals, or group of individuals. In no event TenantOwner will be liable for damages more than the unconsumed monetary value of the services purchased by you.         
          </Typography>
        </Box>
        </Box>
        <Box>
        <Typography variant="h5" align="left" fontWeightRegular="400" mt={3} fontFamily="-webkit-body">
        K. Arbitration and jurisdiction
          </Typography>
          <Typography fontFamily="serif"
            sx={{fontSize:{md:'15px',xs:'11px'}}} marginTop='10px'>
          All concerns, differences, disputes, and contests shall be subject to the arbitration and jurisdiction of local courts of Bangalore, Karnataka, India.        
          </Typography>
          
        </Box>
        </Box>
      </Container>
      {(a==="/session/termsandconditions")?<Footer/>:('')}
    </>
  )
}
