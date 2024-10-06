import { useDispatch, useSelector } from "react-redux";
import {
  Home,
  Person,
  PowerSettingsNew,
  Settings,
  AccountBalanceWallet,
  Deck,
  Chair,
  Email,
  Quiz,
} from "@mui/icons-material";

import {
  Avatar,
  Button,
  Divider,
  Icon,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { FlexBetween } from "app/components/FlexBox";
import { topBarHeight } from "app/utils/constant";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import MatxMenu from "app/components/MatxMenu";
import MatxSearchBox from "app/components/MatxSearchBox";
import { NotificationProvider } from "app/contexts/NotificationContext";
import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { logoutAction } from "app/redux/actions/PreloginActions";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Span } from "../../../components/Typography";
import NotificationBar from "../../NotificationBar";
import ShoppingCart from "../../ShoppingCart";
import {
  GET_INDIVIDUAL_PROPERTY,
  RESET_PROPERTY,
} from "app/redux/actions/PropertyActions";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import {
  checkUserAdmin,
  fetchUserProfileAction,
} from "app/redux/actions/UserProfileActions";
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease",
}));

const TopbarContainer = styled(FlexBetween)(({ theme }) => ({
  height: "100%",
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 },
}));

const UserMenu = styled(Box)(() => ({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  gap: 8,
  minWidth: 185,
  display: "flex",
  alignItems: "center",
  "& a": {
    gap: 8,
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": {
    // marginRight: '10px',
    color: theme.palette.text.primary,
  },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const Layout1Topbar = () => {
  const location = useLocation();

  var index = 0;

  switch (location.pathname) {
    case "/dashboard":
      index = 0;
      break;
    case "/property":
      index = 1;
      break;

    // case "/property/addNewPropertyListing":
    //   index = 2;
    //   break;
    // case "/property/searchProperties":
    //   index = 3;
    //   break;
    // case "/property/createRentalAgreement":
    //   index = 3;
    //   break;
    case "/property/myInvitations":
      index = 2;
      break;
    default:
      index = null;
  }

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout, user } = useAuth();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { userAdminCheck } = useSelector((store) => store.userProfile);
  const preloginState = useSelector((state) => state.prelogin);
  const { userProfile } = useSelector((state) => state);
  const pathname =  useLocation().pathname;

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  useEffect(() => {
    const params = {
      user_profile_id: preloginState.userProfileId,
      to_view_profile_id: preloginState.userProfileId,
      desired_output: "full",
    };

    dispatch(fetchUserProfileAction(params));
  }, []);

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;

    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };
  useEffect(() => {
    dispatch(checkUserAdmin());
  }, []);
  return !userProfile?.first_name ||
    !userProfile?.last_name ||
    !userProfile?.phone_no || pathname === '/procureStatus' ? null : (
    <TopbarRoot id="topBar">
      <TopbarContainer>
        <Box display="flex">
          {/* <StyledIconButton onClick={handleSidebarToggle}>
                        <Icon>menu</Icon>
                    </StyledIconButton> */}

          <StyledIconButton>
            {/* <Box
                            component="img"
                            sx={{
                                height: 233,
                                width: 350,
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src=""
                        /> */}
          </StyledIconButton>
          {/* <IconBox>
                        <StyledIconButton>
                            <Icon>mail_outline</Icon>
                        </StyledIconButton>


                        <StyledIconButton>
                            <Icon>star_outline</Icon>
                        </StyledIconButton>
                    </IconBox> */}
        </Box>

        <Tabs
          value={index}
          aria-label="Navigation"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#1565c0",
            },
          }}
        >
          <Tab
            label={
              <span style={index === 0 ? { color: "#1565c0" } : {}}>Home</span>
            }
            component={Link}
            to={"/dashboard"}
          />
          <Tab
            label={
              <span style={index === 1 ? { color: "#1565c0" } : {}}>
                My {/*Propertys*/} Brands
              </span>
            }
            component={Link}
            to={"/property"}
          />
          {/* <Tab
            label={
              <span style={index === 2 ? { color: "#1565c0" } : {}}>
                Add new property
              </span>
            }
            component={Link}
            to={"/property/addNewPropertyListing"}
          /> */}
          {/* <Tab
            label={
              <span style={index === 3 ? { color: "#1565c0" } : {}}>
                Find property on rent
              </span>
            }
            component={Link}
            to={"/property/searchProperties"}
          /> */}
          {/* <Tab
            label={
              <span style={index === 3 ? { color: "#1565c0" } : {}}>
                Create rental agreement
              </span>
            }
            component={Link}
            to={"/property/createRentalAgreement"}
          /> */}
          <Tab
            label={
              <span style={index === 2 ? { color: "#1565c0" } : {}}>
                My invitations
              </span>
            }
            component={Link}
            to={"/property/myInvitations"}
          />
        </Tabs>

        <Box display="flex" alignItems="center">
          {/* <MatxSearchBox /> */}

          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>

          {/* <ShoppingCart /> */}

          <MatxMenu
            menuButton={
              <UserMenu>
                <Avatar src={user?.avatar} />
              </UserMenu>
            }
          >
            <StyledItem onClick={() => navigate("/dashboard")}>
              <Icon>home</Icon>
              <Span> Home </Span>
            </StyledItem>
            <StyledItem onClick={() => navigate("/property")}>
              <Icon>holiday_village</Icon>
              <Span> My {/*Propertys*/} Brands</Span>
            </StyledItem>
            <StyledItem
              onClick={() => navigate("/property/addNewPropertyListing")}
            >
              <Icon>add_home</Icon>
              <Span> Add New {/*Property*/} Brand</Span>
            </StyledItem>
            {/* <StyledItem onClick={() => navigate("/property/searchProperties")}>
              <Icon>travel_explore</Icon>
              <Span> Find Property on Rent </Span>
            </StyledItem>
            <StyledItem
              onClick={() => navigate("/property/createRentalAgreement")}
            >
              <Icon>handshake</Icon>
              <Span> Create Rental Agreement </Span>
            </StyledItem> */}
            <StyledItem onClick={() => navigate("/property/myInvitations")}>
              <Email fontSize="small" />
              <Span> My Invitations </Span>
            </StyledItem>
            <StyledItem onClick={() => navigate("/profile/editProfile")}>
              <Person fontSize="small" />
              <Span> Profile </Span>
            </StyledItem>

            <StyledItem onClick={() => navigate("/order")}>
              <Icon>account_balance_wallet</Icon>
              <Span> Wallet </Span>
            </StyledItem>

            {/* <StyledItem onClick={() => navigate("/page-layouts/account")}>
              <Icon>settings</Icon>
              <Span> Settings </Span>
            </StyledItem> */}
            <StyledItem onClick={() => navigate("/property/supportCenter")}>
              <Icon>support</Icon>
              <Span> Support Center </Span>
            </StyledItem>
            {userAdminCheck?.is_admin === 1 ? (
              <StyledItem onClick={() => navigate("/customerSupportExecutive")}>
                <SupportAgentIcon />
                <Span> Support Executive </Span>
              </StyledItem>
            ) : (
              ""
            )}
            <StyledItem onClick={() => navigate("/faq")}>
              <Quiz></Quiz>
              <Span>FAQ</Span>
            </StyledItem>

            <StyledItem
              onClick={() => {
                dispatch(logoutAction());
                dispatch({
                  type: RESET_PROPERTY,
                });
                navigate("/session/signin");
              }}
            >
              <Icon>power_settings_new</Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(Layout1Topbar);

// <Box sx={{ flex: 1 }}>
// <BottomNavigation
//     sx={{
//         ['@media (max-width:600px)']: {
//             '.MuiBottomNavigationAction-label': {
//                 display: 'none',
//             },
//         },

//         '.MuiBottomNavigationAction-root.Mui-selected': {
//             color: theme.palette.secondary.main,
//             borderBottom: 3,
//         },
//     }}
//     showLabels={true}
//     value={value}
//     onChange={(event, newValue) => {
//         setValue(newValue);
//     }}
// >
//     <BottomNavigationAction label="My Properties" icon={<RestoreIcon />} />
//     <BottomNavigationAction label="Add Properties" icon={<FavoriteIcon />} />
//     <BottomNavigationAction label="Add Parties" icon={<LocationOnIcon />} />
// </BottomNavigation>
// </Box>
