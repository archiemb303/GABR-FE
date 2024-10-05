import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  Card,
  Grid,
  Icon,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Box, Container, styled, useTheme } from "@mui/system";
import { H3, Paragraph } from "app/components/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardNavigations } from "app/navigations";
import {
  checkUserAdmin,
  fetchUserProfileAction,
} from "app/redux/actions/UserProfileActions";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "../Profile/EditProfile";
import CustomSnackbar from "app/components/CustomSnackbar";
import DashboardVideoModal from "./DashboardVideoModal";
import { setDashboardVideoModal } from "app/redux/actions/ModalActions";
import { height } from "@mui/system";
import Loading from "app/components/MatxLoading";
import { testApiAction } from "app/redux/actions/TestApiActions";
import { async } from "@firebase/util";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette, custom } = useTheme();
  const textMuted = palette.text.secondary;
  const preloginState = useSelector((state) => state.prelogin);
  const { userProfile } = useSelector((state) => state);
  const { userAdminCheck } = useSelector((store) => store.userProfile);
  const { UPDATE_USER_PROFILE, FETCH_USER_PROFILE } = useSelector(
    (store) => store.loadingAndError.loader
  );

  const statList = [
    // {
    //   title: "Find Tenants",
    //   description:
    //     "Add one or more properties, find tenants for each, and manage everything thereafter",
    //   icon: "people_alt_icon ",
    // path: '/property/addNewPropertyListing',
    // },

    // {
    //   title: "Find a House",
    //   description:
    //     "Find your preferred home to live in, create and sign rental agreement, pay rent, and more",
    //   icon: "home_work_icon ",
    // path: '/property/searchProperties',
    // },

    {
      title: "Brand Specific Research Portal:",
      description:
        "For companies,investors, and researchers that want to do an industry research particular to their offerings. Research scope includes but is not limited to",
      icon: "assignment_icon",
      path: "/property",
    },
    {
      title: "Manage My Brands",
      description:
        "Search tenants, sign rent agreements, manage documents, communicate, etc. Research scope includes but is not limited to",
      icon: "self_improvement_icon ",
      path: "/property",
    },
  ];

  const statListVideos = [
    {
      src: "https://i.ibb.co/2qSmTCm/Thumnail.png",
      title: "Creating a Brand",
    },
    {
      src: "https://i.ibb.co/qk3CFmd/Thumnil2.png",
      title: "creating Rental Agreement",
    },
    {
      src: "https://i.ibb.co/BsqsgrZ/Thumnail3.png",
      title: "Adding Parties",
    },
    {
      src: "https://i.ibb.co/48st7hm/Tumnail4.png",
      title: "Signing Rental Agreement",
    },
  ];

  // useEffect(() => {
  //   const params = {
  //     user_profile_id: preloginState.userProfileId,
  //     to_view_profile_id: preloginState.userProfileId,
  //     desired_output: "full",
  //   };

  //   dispatch(fetchUserProfileAction(params));
  // }, []);

  const youTubeLink = [
    "https://www.youtube.com/embed/J828uvG8xC4?autoplay=1",
    "https://www.youtube.com/embed/l7Mb-UgNNj4?autoplay=1",
    "https://www.youtube.com/embed/VMZ_rg4JuyM?autoplay=1",
    "https://www.youtube.com/embed/XLdyvyVUz1A?autoplay=1",
  ];

  return FETCH_USER_PROFILE?.isLoading === true ? (
    <Loading></Loading>
  ) : (
    <>
      <DashboardVideoModal></DashboardVideoModal>
      {UPDATE_USER_PROFILE?.isLoading === false && (
        <CustomSnackbar
          loaderChild={UPDATE_USER_PROFILE}
          successMessage="User Profile updated Successfully !"
        />
      )}

      {!userProfile?.first_name ||
      !userProfile?.last_name ||
      !userProfile?.phone_no ? (
        <>
          <Box sx={{ mx: "auto", width: "50%", my: 4 }}>
            <Typography variant="h5" color="initial">
              Please fill your details before proceeding{" "}
            </Typography>
            <EditProfile />
          </Box>
        </>
      ) : (
        <Container>
          <Typography
            variant="h5"
            color="initial"
            my={4}
            textAlign="center"
            sx={{ color: "#0c5389" }}
          >
            Welcome to {/*Tenant Owner*/} GABR. What do you want to do today?
          </Typography>

          <Grid container justifyContent={"center"} spacing={3}>
            {statList.map((item, ind) => (
              <Grid
                container
                key={item.title}
                item
                md={6}
                sm={12}
                xs={12}
                sx={{ flex: 1 }}
              >
                <Card
                  onClick={() => navigate(item.path)}
                  sx={{
                    height: "100%",
                    "&:hover": {
                      backgroundColor: "rgba(113, 101, 232, 0.1)",
                    },
                  }}
                >
                  <CardActionArea>
                    <CardContent
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Icon
                          sx={{
                            color: custom.c2,
                            fontSize: "80px !important",
                          }}
                        >
                          {item.icon}
                        </Icon>
                      </Typography>

                      <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{
                          fontSize: "22px",
                          mt: 1,
                          textAlign: "center",
                          color: custom.heading.primary,
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 2,
                          fontSize: "18px",
                          textAlign: "center",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="h5"
            color="initial"
            mt={8}
            textAlign="center"
            sx={{ color: "#0c5389" }}
          >
            

          </Typography>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={3} justifyContent="center">
              {statListVideos.map((item, i) => (
                <Grid
                  key={item.title}
                  item
                  sm={"auto"}
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Box sx={{ width: "322px", height: "152px" }}>
                          <Box
                            style={{ width: "100%", height: "100%" }}
                            component="img"
                            src={item.src}
                            onClick={() => {
                              dispatch(
                                setDashboardVideoModal({
                                  flag: true,
                                  tutorialLink: youTubeLink[i],
                                  src: null,
                                })
                              );
                            }}
                          ></Box>
                        </Box>

                        <Typography
                          variant="h6"
                          color="text.secondary"
                          textAlign="center"
                          mt={1}
                        >
                          {item.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
