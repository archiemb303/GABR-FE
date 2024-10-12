import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import PricingPage from "../Modal/pricing/pricingModal";
import AddParty from "../Party/AddParty";
import TenancyTerm from "../Party/TenancyTerm";
import AddProperties from "./AddProperties";
import PropertyInclusion from "./PropertyInclusion";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Container } from "@mui/system";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import PropertyItem from "./PropertyItem";
import {
  Box,
  Paper,
  Button,
  Typography,
  Card,
  IconButton,
  Divider,
  Tooltip,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import CustomHorizontalLinearStepper from "app/components/CustomHorizontalLinearStepper";
import AddNewPropertyListing from "./AddNewPropertyListing";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  addListingImagesAction,
  createNewTenancyAction,
  fetchAllRentalPaymentReceipts,
  fetchMyInvitationsAction,
  fetchMyPropertyAction,
  getAllTenanciesAction,
  getIndividualPropertyAction,
} from "app/redux/actions/PropertyActions";
import Location from "../location/Location";
import ViewPropertyBasicDetails from "./ViewPropertyBasicDetails";
import ViewPropertyListingDetails from "./ViewPropertyListingDetails";
import ViewTenantPreference from "./ViewTenantPreference";
import ListingPerformance from "./ListingPerformance";
import ViewTenancyTerms from "./ViewTenancyTerms";
import {
  getAllStatesAction,
  getAllStatesByCountryAction,
} from "app/redux/actions/LocationActions";
import ViewPropertyParties from "./ViewPropertyParties";
import VerificationAndConfirmation from "./VerificationAndConfirmation";
import RentalAgreementSigning from "./RentalAgreementSigning";
import { ClassNames, useTheme } from "@emotion/react";
import { themeColors } from "app/components/MatxTheme/themeColors";
import Communications from "./Communications";
import { xhr2 } from "qwest";
import Loading from "app/components/MatxLoading";
import ViewTenancyFittings from "./ViewTenancyFittings";
import RentalAgreement from "./RentalAgreement";
import { CustomImageToBase64 } from "app/components";
import ViewContactInfo from "./ViewContactInfo";
import { HorizontalRule, InfoOutlined } from "@mui/icons-material";
import PackagePreference from "./PackagePreference";
import CreateNewTenancy from "./CreateNewTenancy";
import {
  setCreateNewTenancyModal,
  setDeactivateTenancyModal,
  setInvitationPropertyInfoModal,
  setOpenPayMonthlyRentModal,
  setOpenViewAllReceiptModal,
  setOpenViewReceiptModal,
  setPropertyImagesWarningModal,
  setUpdatePropertyModal,
  setUpdatePropertyPicModal,
  setUploadPropertyImagesModal,
} from "app/redux/actions/ModalActions";
import ExistingTenancy from "./ExistingTenancy";
import { FetchMyWalletTransactionsAction } from "app/redux/actions/WalletActions";
import DeactivateTenancyModal from "./DeactivateTenancyModal";
import VideoTutorialModal from "./VideoTutorialModal";
import PropertyImages from "./PropertyImages";
import { fetchUserProfileAction } from "app/redux/actions/UserProfileActions";
import InvitationPropertyInfo from "./InvitationPropertyInfo";
import { makeStyles } from "@mui/styles";
import { debounce, entries } from "lodash";
import { throttle } from "lodash";
import { useCallback } from "react";
import CustomSnackbar from "app/components/CustomSnackbar";
import UpdatePropertyModal from "./UpdatePropertyModal";
import UpdatePropertyImages from "./UpdatePropartyImages";
import UploadPropertyImagesModal from "./uploadPropertyImagesModal";
import AgreementSigningWarningModal from "./AgreementSigningWarningModal";
import AgreementSigningConfirmationModal from "./AgreementSigningConfirmationModal";
import { getScrollAction } from "app/redux/actions/ScrollAction";
import EditContactInfoModal from "./EditContactInfoModal";
import PackagePreferenceSuccessModal from "./PackagePreferenceSuccessModal";
import PackagePreferenceModal from "./PackagePreferenceModal";
import PremiumPackageStatus from "./PremiumPackageStatus";
import AddPartyConfirmModal from "./components/AddPartyConfirmModal";
import AddUserPartyModal from "./components/AddUserPartyModal";
import AddPropertyPartiesModal from "./AddPropertyParties";
import AddPropertyImages from "./components/AddPropertyImages";
import UpdatePropertyPic from "./UpdatePropertyPic";
import ViewRentReceiptModal from "./components/ViewRentReceiptModal";
import PayMonthlyRentModal from "./components/PayMonthlyRentModal";
import ViewAllRentalReceipts from "./components/ViewAllRentalReceipts";
import PayMonthlyRentReciptModal from "./components/PayMonthlyRentReciptModal";

import { fetchMyBrandAction } from "app/redux/actions/BrandSpecificActions";
import AddNewBrand from "./AddNewBrand";
import GenerateBrandResearch from "./GenerateBrandResearch";
import IndustryPage from "./IndustryReportSegments";
import BrandDetailsPage from "./BrandDetails";

const Property = () => {
  const routeLocation = useLocation();
  const { GET_INDIVIDUAL_PROPERTY, FETCH_MY_PROPERTY } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const { notification } = useSelector((store) => store.scroll);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    fetchMyInvitations,
    addNewProperty,
    fetchMyProperty,
    individualProperty,
    newTenancy,
    getAllTenancies,
  } = useSelector((state) => state.property);
  const { userProfile } = useSelector((state) => state);
  const [sortedMyProperties, setSortedMyProperties] = useState(null);
  const [filteredMyProperties, setFilteredMyProperties] = useState(null);
  const [addOwnerasParty, setAddOwnerasParty] = useState(false);

  const [filteredType, setFilteredType] = useState("All");
  const location = useSelector((state) => state.location);
  const preloginState = useSelector((state) => state.prelogin);
  const [showSidebar, setShowSidebar] = useState(false);
  const { custom } = useTheme();
  const { customTheme } = themeColors;
  const routePropertyId = useRef(routeLocation?.state?.property_id);
  const setAddingParty = (flag) => {
    setAddOwnerasParty(flag);
  };
  const [tenancyId, setTenancyId] = useState();
  useEffect(() => {
    if (individualProperty) {
      setTenancyId(
        individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id
      );
    }
  }, [individualProperty]);
  const currentParty =
    individualProperty?.tenancy_details?.party_details?.filter(
      (party) => party.party_profile_id === preloginState.userProfileId
    )[0];
  // const useStyles = makeStyles((theme) => ({
  //     scrollBar: {
  //         '&::-webkit-scrollbar': {
  //             width: '0.4em',
  //         },
  //         '&::-webkit-scrollbar-thumb': {
  //             backgroundColor: 'rgba(0,0,0,.1)',
  //         },
  //     },
  // }));

  // const classes = useStyles();

  useEffect(() => {
    dispatch(fetchMyBrandAction({
      authentication_params: {
        user_profile_id: preloginState.userProfileId,
        refresh_token: preloginState.refreshToken,
      },
      // setBrandTypes(brandSpecific.brands.brands)
    }));

  }, [])
  const {brandSpecific} = useSelector(state=> state);
  console.log(brandSpecific)
  const { brands } = useSelector(state => state.brandSpecific);
  const [adding, setAdding] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [industryReport, setIndustryReport] = useState(false);
  const [brandDetails, setBrandDetails] = useState(false);
  const [selectedBrandSegment, setSelectedBrandSegment] = useState(null);
  const [displayMenu, setDisplayMenu] = useState(false)
  const handleBrandSelection = (e) => {
    setSelectedBrandSegment(e.target.value); // Set the selected segment id
  };
  // console.log(brands)

  const isIntoView = useRef([
    {
      viewType: "basicDetails",
    },
    {
      viewType: "listingDetails",
    },
    {
      viewType: "tenantPreference",
    },
    {
      viewType: "contactDetails",
    },
    {
      viewType: "propertyImages",
    },
    {
      viewType: "packagePreference",
    },
    {
      viewType: "listingPerformance",
    },

    {
      viewType: "parties",
    },
    {
      viewType: "tenancyTerms",
    },
    {
      viewType: "tenancyFittings",
    },
    {
      viewType: "propertyInclusion",
    },
    {
      viewType: "rentalAgreement",
    },
    {
      viewType: "verificationAndConfirmation",
    },
    {
      viewType: "signingOfRentalAgreement",
    },
    {
      viewType: "communications",
    },
  ]);

  const { CREATE_NEW_TENANCY, UPDATE_USER_PROFILE } = useSelector(
    (store) => store.loadingAndError.loader
  );

  const stepsDummy = [
    {
      name: "one",
      isActive: true,
      url: "/details1",
    },
    {
      name: "two",
      isActive: false,
      url: "/details2",
    },
    {
      name: "thee",
      isActive: false,
      url: "/details3",
    },
    {
      name: "four",
      isActive: false,
      url: "/details4",
    },
    {
      name: "five",
      isActive: false,
      url: "/details5",
    },
    {
      name: "six",
      isActive: false,
      url: "/details6",
    },
    {
      name: "seven",
      isActive: false,
      url: "/details7",
    },
    {
      name: "eight",
      isActive: false,
      url: "/details8",
    },
    {
      name: "nine",
      isActive: false,
      url: "/details9",
    },
  ];

  const [progress, setProgress] = useState(0); // manage the stepper progress

  // small devise right side bar display non

  const useStyles = makeStyles((theme) => ({
    hiddenSm: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  }));

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        entries?.map((entry) => {
          var viewElement;
          var btnElement;
          if (entry.isIntersecting) {
            viewElement = document.querySelector(`#${entry.target.id}`);
            btnElement = document.querySelector(`#${entry.target.id}Btn`);
            viewElement?.style.setProperty(
              "box-shadow",
              "5px 5px 10px 0px rgb(178 201 224)",
              "important"
            );
            btnElement?.style.setProperty("background-color", custom.c10);
          } else {
            viewElement = document.querySelector(`#${entry.target.id}`);
            btnElement = document.querySelector(`#${entry.target.id}Btn`);
            viewElement?.style.setProperty(
              "box-shadow",
              "0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)",
              "important"
            );
            btnElement?.style.setProperty("background-color", "white");
          }
          return;
        });
      },
      { root: null, rootMargin: "-30% 0% -68% 0%" }
    )
  );

  const handleScroll = (scrollId) => {
    const anchor = document.querySelector(scrollId);
    if (anchor) {
      anchor.style.position = "relative";
      anchor.style.top = "-100px";
      anchor.scrollIntoView({ behavior: "smooth" });
      anchor.style.position = "static";
    }
  };

  const handleToggleSidebar = () => {
    setShowSidebar((prevState) => {
      return !prevState;
    });
  };

  const openCreateNewTenancyModal = () => {
    dispatch(setCreateNewTenancyModal(true));
  };

  var partyStatusId;
  var partyTypeId;

  (function setPartyTypeAndStatusIds() {
    const selectedProperty = sortedMyProperties?.filter(
      (property) =>
        property?.property_id === individualProperty?.basic_details?.property_id
    )[0];
    partyStatusId = selectedProperty?.party_status_id;
    partyTypeId = selectedProperty?.party_type_id_id;
  })();

  const getSelectedPropertyItem = () => {
    var propertyIndex = 0;
    return sortedMyProperties?.map((sortedProperty, i) => {
      if (sortedProperty.isSelected === true) {
        propertyIndex = i;
        return (
          <PropertyItem place="right" props={sortedProperty}></PropertyItem>
        );
      }
      return null;
    })[propertyIndex];
  };
  const [BrandTypes, setBrandTypes] = useState([
  ]);

  useEffect(() => {
    dispatch(
      fetchMyPropertyAction({
        authentication_params: {
          user_profile_id: preloginState.userProfileId,
          refresh_token: preloginState.refreshToken,
        },
      })
    );

    // Get all the states
    if (!location?.states) {
      dispatch(
        getAllStatesByCountryAction({
          country_id: "1",
        })
      );
    }
    if (!location?.statesList) {
      dispatch(getAllStatesAction({}));
    }

    // When user added new property - open the current property
    if (routeLocation?.state?.property_id) {
      dispatch(
        getIndividualPropertyAction({
          property_id: routeLocation?.state?.property_id,
        })
      );
    }
    //
    // if (routeLocation?.state?.imageList) {
    //   dispatch(
    //     addListingImagesAction({
    //       listing_id: individualProperty?.listing_details?.listing_id
    //         ? individualProperty?.listing_details?.listing_id
    //         : "",
    //       property_id: routeLocation?.state?.property_id,
    //       images: routeLocation?.state?.imageList,
    //     })
    //   );
    // }

    // Check if the userProfile state of store is empty or not
    if (!userProfile.profile_id) {
      const params = {
        user_profile_id: preloginState.userProfileId,
        to_view_profile_id: preloginState.userProfileId,
        desired_output: "full",
      };
      dispatch(fetchUserProfileAction(params));
    }

    dispatch(fetchMyInvitationsAction({}));
  }, []);

  useEffect(() => {
    // sort my properties in lexicographical order
    if (fetchMyProperty) {
      let sortedList = [...fetchMyProperty];
      // let storeIndividualPropertyId =
      //   individualProperty?.basic_details.property_id; // store the data stored in redux store
      // let currentPropertyId = storeIndividualPropertyId; // used in the conditional expression to set the isSelected property
      // // This means the user has came from addNewProperty Component
      // if (routePropertyId.current
      //   &&
      //   fetchMyProperty.some(
      //     (property) => routePropertyId.current === property.property_id)) {
      //   currentPropertyId = routePropertyId.current;
      //   routePropertyId.current = null;
      // }

      // sortedList = fetchMyProperty.map((el) => {
      //   if (el?.property_id === currentPropertyId) {
      //     return {
      //       ...el,
      //       isSelected: true,
      //     };
      //   }
      //   return {
      //     ...el,
      //     isSelected: false,
      //   };
      // });

      // sortedList.sort(function (a, b) {
      //   return a.property_name
      //     .toLowerCase()
      //     .localeCompare(b.property_name.toLowerCase());
      // });
      sortedList.sort(function (a, b) {
        return new Date(b.added_date) - new Date(a.added_date);
      });
      setSortedMyProperties(sortedList);
      setFilteredMyProperties(sortedList);
    }
  }, [fetchMyProperty]);
  useEffect(() => {
    if (fetchMyProperty) {
      if (filteredType === "All") {
        setFilteredMyProperties(sortedMyProperties);
      } else {
        let sortedList = [...sortedMyProperties];
        sortedList = sortedList.filter(
          (property) => property.party_type_name === filteredType
        );

        // sortedList.sort(function (a, b) {
        //   return a.property_name
        //     .toLowerCase()
        //     .localeCompare(b.property_name.toLowerCase());
        // });
        sortedList.sort(function (a, b) {
          return new Date(b.added_date) - new Date(a.added_date);
        });
        // setSortedMyProperties(sortedList);
        setFilteredMyProperties(sortedList);
      }
    }
  }, [filteredType]);

  useLayoutEffect(() => {
    if (
      routeLocation?.state?.property_id &&
      sortedMyProperties?.some((property) => {
        return property.property_id === routeLocation?.state?.property_id;
      })
    ) {
      const newPropertyAnchor = document.querySelector(
        `#boxId${routeLocation?.state?.property_id}`
      );
      newPropertyAnchor?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      navigate(".", { state: null });
    }
  }, [sortedMyProperties]);

  useEffect(() => {
    dispatch(FetchMyWalletTransactionsAction({}));
  }, [individualProperty?.listing_details?.package_preference]);

  useLayoutEffect(
    () => {
      if (
        isIntoView.current?.some((view) =>
          document.querySelector(`#${view.viewType}`)
        )
      ) {
        for (let i = 0; i < isIntoView.current.length; i++) {
          if (document.querySelector(`#${isIntoView.current[i].viewType}`)) {
            observer.current.observe(
              document.querySelector(`#${isIntoView.current[i].viewType}`)
            );
          }
        }
      }
      return () => {
        observer.current?.disconnect();
      };
    },
    isIntoView.current.map((view) =>
      document.querySelector(`#${view.viewType}`)
    )
  );

  const openAddPropertyImageModal = () => {
    // individualProperty?.listing_details?.listing_id
    //   ? dispatch(setUploadPropertyImagesModal(true))
    //   : dispatch(setPropertyImagesWarningModal(true));
    dispatch(setUploadPropertyImagesModal(true));
  };

  const openUpdatePropertyComponent = async () => {
    dispatch(setUpdatePropertyModal(true));
  };

  useEffect(() => {
    if (individualProperty) {
      setFilteredMyProperties((prevState) => {
        // Reset the selected state for all properties
        return prevState?.map((state) => {
          if (
            state.property_id === individualProperty.basic_details.property_id
          ) {
            return { ...state, isSelected: true };
          } else {
            return { ...state, isSelected: false };
          }
        });
      });
      setSortedMyProperties((prevState) => {
        // Reset the selected state for all properties
        return prevState?.map((state) => {
          if (
            state.property_id === individualProperty.basic_details.property_id
          ) {
            return { ...state, isSelected: true };
          } else {
            return { ...state, isSelected: false };
          }
        });
      });
    }
  }, [individualProperty, fetchMyProperty]);

  useEffect(() => {
    if (notification && notification?.property_id) {
      if (
        individualProperty?.basic_details?.property_id !==
        notification?.property_id
      ) {
        dispatch(
          getIndividualPropertyAction({
            property_id: notification?.property_id,
          })
        );
      } else if (notification?.redirection_section_id) {
        handleScroll(`#${notification?.redirection_section_id}`);
        dispatch(getScrollAction(null));
      }
    }
  }, [notification, individualProperty]);

  // replace this Party types with data comming from backend

  const handleSubmit = () => {
    dispatch(setCreateNewTenancyModal(true));
    dispatch(
      createNewTenancyAction({
        property_id: individualProperty?.basic_details?.property_id,
      })
    );
  };

  //Fetch all tenancies
  useEffect(() => {
    dispatch(getAllTenanciesAction({}));
  }, []);

  // small device right side bar display non
  const classes = useStyles();
  const [imageList, setImageList] = useState([]);
  return (
    <>
      <AddUserPartyModal />
      <AddPartyConfirmModal
        setAddingParty={setAddingParty}
        addOwnerasParty={addOwnerasParty}
      />
      <AddPropertyPartiesModal
        setAddingParty={setAddingParty}
        addOwnerasParty={addOwnerasParty}
      />
      <UpdatePropertyPic />
      <PackagePreferenceModal />
      <PackagePreferenceSuccessModal />
      <PremiumPackageStatus />
      <EditContactInfoModal />
      <AgreementSigningConfirmationModal />
      <AgreementSigningWarningModal />
      <InvitationPropertyInfo />
      <UpdatePropertyModal></UpdatePropertyModal>
      <ViewRentReceiptModal />
      <PayMonthlyRentModal />
      <ViewAllRentalReceipts />
      <PayMonthlyRentReciptModal />

      <UploadPropertyImagesModal></UploadPropertyImagesModal>
      <CustomSnackbar
        loaderChild={UPDATE_USER_PROFILE}
        successMessage="Profile Details Updated Successfully !"
      />

      <>
        <VideoTutorialModal />
        <Container>
          <Grid my={2} container columnSpacing={2}>
            <Grid item md={3} sm={5} xs={8}>
              <Box
                sx={(themes) => ({
                  [themes.breakpoints.down("md")]: {
                    // border: 'medium dashed green',
                    position: "absolute",
                  },
                  position: "sticky",
                  top: "0",
                })}
              >
                <IconButton
                  id="burger-icon"
                  sx={(themes) => ({
                    [themes.breakpoints.down("md")]: {
                      // border: 'medium dashed green',
                      display: "block",
                      position: "fixed",
                      top: 10,
                      left: 10,
                      zIndex: 100,
                    },
                    display: "none",
                  })}
                  onClick={handleToggleSidebar}
                >
                  <MenuIcon />
                </IconButton>

                <Box
                  onClick={handleToggleSidebar}
                  id="dropdown-background"
                  sx={(themes) => ({
                    [themes.breakpoints.down("md")]: {
                      // border: 'medium dashed green',
                      display: showSidebar ? "block" : "none",
                      position: "fixed",
                      top: 0,
                      left: 0,
                      zIndex: 99,
                      backdropFilter: "blur(4px)",
                      height: "100%",
                      width: "100%",
                    },
                  })}
                ></Box>
                <Paper
                  sx={(themes) => ({
                    [themes.breakpoints.down("md")]: {
                      // border: 'medium dashed green',
                      display: showSidebar ? "flex" : "none",
                      position: "fixed",
                      top: 40,
                      left: 0,
                      width: "60%",
                      zIndex: 100,
                    },
                    top: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2,
                    height: "90vh",
                    overflow: "auto",
                  })}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      // navigate("/property/addNewPropertyListing");
                      setAdding(true);
                      setBrandDetails(false);
                      setIndustryReport(false);
                      setDisplayMenu(false)
                    }}
                    sx={(themes) => ({
                      [themes.breakpoints.down("md")]: {
                        // border: 'medium dashed green',
                        mb: 2,
                      },
                    })}
                  >
                    Add New Brand
                  </Button>

                  <TextField
                    select
                    sx={{ mr: 1 }}
                    // name="propertyType"
                    label="My Brands" //Filter Properties
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(e) => {
                      //Nullify getIndividual property
                      dispatch({
                        type: "GET_INDIVIDUAL_PROPERTY",
                        payload: null,
                      });
                      //deselect any selected property
                      setSortedMyProperties((prevState) => {
                        return prevState?.map((state) => {
                          console.log(state);
                          return { ...state, isSelected: false };

                        });

                      });
                      setFilteredType(e.target.value);
                      setBrandDetails(true);
                      handleBrandSelection(e);
                      setDisplayMenu(true);
                      setAdding(false);
                    }}
                  // onChange={(e) => {
                  //   // handleChange(e);
                  //   setFieldValue("propertyType", e.target.value);
                  // }}
                  //   onBlur={handleBlur}
                  //   helperText={touched.propertyType && errors.propertyType}
                  //   error={Boolean(
                  //     touched.propertyType && errors.propertyType
                  //   )}
                  >
                    {brands?.brands?.map((item) => (
                      <MenuItem key={item.segment} value={item.segment}>
                        {item.details}
                      </MenuItem>
                    ))}
                  </TextField>
                  {displayMenu && <Box>
                    <Button
                      fullWidth
                      color="inherit"
                      onClick={() => {
                        setAdding(false);
                        setGenerating(false);
                        setIndustryReport(false);
                        setBrandDetails(true);
                      }}
                    >
                      Dashboard
                    </Button>

                    <Button
                      fullWidth
                      color="inherit"
                      onClick={() => {
                        setIndustryReport(true);
                        setBrandDetails(false);
                      }}
                    >
                      Industry Report
                    </Button>

                    <Button
                      fullWidth
                      color="inherit"
                    // onClick={() => {
                    //   // Navigate to Business Plan
                    //   navigate("/business-plan");
                    // }}
                    >
                      Business Plan
                    </Button>
                  </Box>}

                  {/* {FETCH_MY_PROPERTY?.isLoading === true ? (
                    <Box
                      height="100vh"
                      sx={{
                        background: "white",
                        width: "100%",
                      }}
                    >
                      <Loading />
                    </Box>
                  ) : ( */}
                  {/* <> */}
                  {/* {sortedMyProperties &&
                        sortedMyProperties.map((item, index) => (
                          <Box
                            key={item.property_id}
                            id={"boxId" + item.property_id}
                            onClick={() => {
                              // setSortedMyProperties((prevState) => {
                              //   // Reset the selected state for all properties
                              //   const newState = [
                              //     ...prevState.map((el) => ({
                              //       ...el,
                              //       isSelected: false,
                              //     })),
                              //   ];
                              //   // Set the selected state true for the current property
                              //   newState[index].isSelected = true;
                              //   return newState;
                              // });
                            }}
                          >
                            <PropertyItem props={item} />
                          </Box>
                        ))} */}
                  {/* {filteredMyProperties &&
                        filteredMyProperties.map((item, index) => (
                          <Box
                            key={item.property_id}
                            id={"boxId" + item.property_id}
                            onClick={() => {
                              // setSortedMyProperties((prevState) => {
                              //   // Reset the selected state for all properties
                              //   const newState = [
                              //     ...prevState.map((el) => ({
                              //       ...el,
                              //       isSelected: false,
                              //     })),
                              //   ];
                              //   // Set the selected state true for the current property
                              //   newState[index].isSelected = true;
                              //   return newState;
                              // });
                            }}
                          >
                            <PropertyItem props={item} />
                          </Box>
                        ))}
                    </>
                  )} */}
                </Paper>
              </Box>
            </Grid>
            {/* If user didn't clicked on any listed property */}
            {/* {!individualProperty ? (
              GET_INDIVIDUAL_PROPERTY?.isLoading === true ? (
                <Grid
                  item
                  md={9}
                  sm={12}
                  sx={{ height: 100 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Loading />
                </Grid>
              ) : ( */}
            <Grid item md={9} sm={12}>
              {!adding && !generating && !industryReport && !brandDetails &&
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alginItems: "center",
                    padding: 2,
                    margin: "0 auto",
                  }}
                >
                  <Typography
                    variant="h5"
                    textAlign={"center"}
                    color="GrayText"
                  >
                    {/* Please select a brand from the left menu! */}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign={"center"}
                    color="GrayText"
                  >
                    {/* OR */}
                  </Typography>

                  <Typography
                    variant="h5"
                    textAlign={"center"}
                    color="GrayText"
                  >
                    <Link
                      href="/property/addNewPropertyListing"
                      underline="none"
                    >
                      {/* Please add a new Brand to begin! */}
                    </Link>
                  </Typography>
                </Card>}
              <Card>{
                brandDetails && <BrandDetailsPage
                  segment={selectedBrandSegment}
                  setIndustryReport={setIndustryReport}
                  setBrandDetails={setBrandDetails} />
              }
              </Card>
              <Card>
                {
                  adding && <AddNewBrand setAdding={setAdding} setGenerating={setGenerating} />
                }
              </Card>
              <Card>
                {generating &&
                  <GenerateBrandResearch setBrandDetails={setBrandDetails} setGenerating={setGenerating} setDisplayMenu={setDisplayMenu} />
                }
              </Card>
              <Card>
                {industryReport &&
                  <IndustryPage />
                }
              </Card>
            </Grid>
            {/* )
            ) : (
              !(partyStatusId === 1 || partyStatusId === 2) && (
                <>
                  {GET_INDIVIDUAL_PROPERTY?.isLoading === true ? (
                    <Grid item md={9} sx={{ height: 100 }}>
                      <Loading />
                    </Grid>
                  ) : (
                    <>
                      <Grid item md={6} sm={12}> */}
            {/* <Paper sx={{ p: 2 }}>
                                     <Box>
                                         <Stepper
                                             activeStep={progress}
                                             sx={{
                                                 display: 'grid',
                                                 gridTemplateColumns:
                                                     'auto auto auto',
                                                 '.MuiStepConnector-root': {
                                                     display: 'none',
                                                 },
                                             }}
                                         >
                                             {stepsDummy.map((item, index) => (
                                                 <Step key={item.name + index}>
                                                     <Button
                                                         variant="text"
                                                         color="primary"
                                                         onClick={() => {
                                                             setProgress(index);
                                                         }}
                                                     >
                                                         <StepLabel>
                                                             {item.name}
                                                         </StepLabel>
                                                     </Button>
                                                 </Step>
                                             ))}
                                         </Stepper>
                                     </Box>
                                 </Paper> */}

            {/* <>
                          <ViewPropertyBasicDetails /> */}

            {/* Commented Listing Details for Phase 1 */}
            {/* <Divider
                            sx={{
                              marginTop: "20px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                fontWeight={400}
                                color={customTheme.custom.text.disabled}
                                textAlign="center"
                                variant="h6"
                              >
                                Listing Details
                              </Typography>
                              <Tooltip
                                title="Once you put your property up for rent to find tenants, this is the information that will be visible to home-seekers."
                                arrow
                              >
                                <InfoOutlined
                                  sx={{
                                    ml: 1,
                                    color: custom.text.disabled,
                                  }}
                                />
                              </Tooltip>
                            </Box>
                          </Divider>
                          <ViewPropertyListingDetails />
                          <ViewTenantPreference />
                          <ViewContactInfo />
                          <PropertyImages />
                          {!(partyTypeId === 2) && (
                            <>
                              <PackagePreference isIntoView={isIntoView[5]} />
                              <ListingPerformance />
                            </>
                          )} */}
            {/* <Divider
                            sx={{
                              marginTop: "20px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                fontWeight={400}
                                color={customTheme.custom.text.disabled}
                                textAlign="center"
                                variant="h6"
                              >
                                Renting Details/Tenancy Details
                              </Typography>
                              <Tooltip
                                title="you can add details about the parties involved, specify the fittings and fixtures included in the property, and list any additional inclusions provided with the rental. Once all details are filled in, you can generate your personalized rental agreement. "
                                arrow
                              >
                                <InfoOutlined
                                  sx={{
                                    ml: 1,
                                    color: custom.text.disabled,
                                  }}
                                />
                              </Tooltip>
                            </Box>
                          </Divider>

                          <CreateNewTenancy
                            addOwnerasParty={addOwnerasParty}
                            setAddOwnerasParty={setAddOwnerasParty}
                          />
                          <DeactivateTenancyModal />
                          {!individualProperty?.tenancy_details?.tenancy_terms
                            ?.tenancy_id ? (
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={handleSubmit}
                              sx={{ my: 2 }}
                            >
                              Create new tenancy and rental agreement
                            </Button>
                          ) : (
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                dispatch(setDeactivateTenancyModal(true));
                              }}
                              sx={{ my: 2 }}
                            >
                              Deactivate the Tenancy
                            </Button>
                          )}
                          {individualProperty?.tenancy_details?.all_tenancy
                            ?.length > 0 &&
                            !individualProperty?.tenancy_details?.all_tenancy?.some(
                              (tenancy) => tenancy.status === 1
                            ) && (
                              <>
                                <Card
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alginItems: "center",
                                    padding: 2,
                                    margin: "10px auto",
                                    width: "100%",
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    textAlign={"center"}
                                    color="GrayText"
                                  >
                                    You do not have any active tenancy at the
                                    moment. Click on any of the past tenancy
                                    listed below to view their details.
                                    Otherwise, create a new tenancy to manage
                                    your upcoming tenants and every associated
                                    thing.
                                  </Typography>
                                </Card>
                                {individualProperty?.tenancy_details && (
                                  <ExistingTenancy
                                    allTenancy={
                                      individualProperty?.tenancy_details
                                        ?.all_tenancy
                                    }
                                  />
                                )}
                              </>
                            )}
                          {!individualProperty?.tenancy_details
                            ?.all_tenancy && (
                            <Card
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alginItems: "center",
                                padding: 2,
                                margin: "0 auto",
                                width: "100%",
                              }}
                            >
                              <Typography
                                variant="body1"
                                textAlign={"center"}
                                color="GrayText"
                              >
                                You do not have any active tenancy at the
                                moment. Please create a new tenancy to manage
                                your upcoming tenants and every associated
                                thing.
                              </Typography>
                            </Card>
                          )}
                          <Box position="relative">
                            <Box
                              sx={{
                                display:
                                  individualProperty?.tenancy_details?.all_tenancy?.some(
                                    (tenancy) => tenancy.status === 1
                                  )
                                    ? "none"
                                    : "block",
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                zIndex: 2,
                              }}
                            />
                            <Grid
                              sx={{
                                filter:
                                  individualProperty?.tenancy_details?.all_tenancy?.some(
                                    (tenancy) => tenancy.status === 1
                                  )
                                    ? "unset"
                                    : "blur(2.5px) grayscale(60%)",
                              }}
                            >
                              <ViewPropertyParties
                                setAddingParty={setAddingParty}
                                addOwnerasParty={addOwnerasParty}
                              />

                              <ViewTenancyTerms />
                              <ViewTenancyFittings />
                              <PropertyInclusion />
                              <RentalAgreement />
                              <VerificationAndConfirmation />
                              <RentalAgreementSigning />
                              <Communications />
                            </Grid>
                          </Box>
                        </>
                      </Grid>
                      <Grid item md={3} sm={12} className={classes.hiddenSm}>
                        <Paper
                          sx={{
                            position: "sticky",
                            top: "0",
                            p: 2,
                            height: "90vh",
                            overflow: "auto",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          > */}
            {
              //getSelectedPropertyItem()
              // sortedMyProperties?.some(
              //     (sortedProperty) => sortedProperty.isSelected === true)
              // &&
              // <PropertyItem
              //     props={sortedMyProperties?.filter(
              //         (sortedProperty) => sortedProperty.isSelected === true)[0]}
              //     setPartyStatusIdRef={
              //         setPartyStatusIdRef
              //     }
              // ></PropertyItem>
            }
            {/* Commented the below code for Phase 1 */}
            {/* {individualProperty?.listing_details?.listing_images
                              ?.length === 0 ? (
                              <Typography
                                variant="body2"
                                sx={(theme) => ({
                                  color: "#fff",
                                  padding: "4px 4px",
                                  margin: "0 auto",
                                  borderRadius: "4px",
                                  backgroundColor: "#1565C0",
                                  cursor: "pointer",
                                })}
                                onClick={openAddPropertyImageModal}
                              >
                                Update image
                              </Typography>
                            ) : (
                              <Typography
                                variant="body2"
                                sx={(theme) => ({
                                  color: "#fff",
                                  padding: "4px 4px",
                                  margin: "0 auto",
                                  borderRadius: "4px",
                                  backgroundColor: "#1565C0",
                                  cursor: "pointer",
                                })}
                                onClick={openUpdatePropertyComponent}
                              >
                                Update image
                              </Typography>
                            )} */}

            {/* <Typography
                              variant="body2"
                              sx={(theme) => ({
                                color: "#fff",
                                padding: "4px 4px",
                                margin: "0 auto",
                                borderRadius: "4px",
                                backgroundColor: "#1565C0",
                                cursor: "pointer",
                              })}
                              onClick={() => {
                                dispatch(setUpdatePropertyPicModal(true));
                              }}
                            >
                              Update image
                            </Typography>

                            {tenancyId ===
                              individualProperty?.tenancy_details?.tenancy_terms
                                ?.tenancy_id &&
                              (currentParty?.status === 3 ||
                                currentParty?.status === 4) &&
                              currentParty?.party_type_id === 2 && (
                                <Typography
                                  onClick={() =>
                                    dispatch(setOpenPayMonthlyRentModal(true))
                                  }
                                  variant="body2"
                                  sx={(theme) => ({
                                    color: "#fff",
                                    padding: "5px 20px",
                                    margin: "0 auto",
                                    borderRadius: "4px",
                                    backgroundColor: "#1565C0",
                                    cursor: "pointer",
                                    marginTop: 1,
                                  })}
                                >
                                  Pay Rent
                                </Typography>
                              )} */}

            {/* <Typography
                              variant="h6"
                              color="initial"
                              marginTop={3}
                            >
                              Current Listing Details
                            </Typography> */}
            {/* <Typography
                              variant="h6"
                              color="initial"
                              marginTop={3}
                            >
                              Current Property Details
                            </Typography>
                            <Card
                              sx={{
                                width: "100%",
                                backgroundColor: custom.c12,
                                my: 2,
                                borderRadius: "10px",
                                padding: "10px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  backgroundColor: custom.c12,
                                  my: 2,
                                  borderRadius: "10px",
                                  padding: "10px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    letterSpacing: "0.05rem",
                                  }}
                                  variant="body"
                                  color="initial"
                                >
                                  All Tenancies
                                </Typography>
                                <FormControl fullWidth>
                                  <Select
                                    defaultValue={
                                      individualProperty?.tenancy_details
                                        ?.tenancy_terms?.tenancy_id
                                    }
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tenancyId}
                                    onChange={(e) => {
                                      setTenancyId(e.target.value);
                                    }}
                                  >
                                    {getAllTenancies?.map((tenancy) => {
                                      return (
                                        <MenuItem value={tenancy?.tenancy_id}>
                                          {tenancy?.tenancy_id}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </FormControl>
                              </Box>
                              <Box
                                sx={{
                                  width: "100%",
                                  backgroundColor: custom.c12,
                                  my: 2,
                                  borderRadius: "10px",
                                  padding: "10px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    letterSpacing: "0.05rem",
                                  }}
                                  variant="body"
                                  color="initial"
                                >
                                  Current Tenancy Id
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    letterSpacing: "0.05rem",
                                    marginTop: "5px",
                                  }}
                                  variant="body1"
                                  color="grayText"
                                >
                                  {
                                    individualProperty?.tenancy_details
                                      ?.tenancy_terms?.tenancy_id
                                  }
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  width: "100%",
                                  backgroundColor: custom.c12,
                                  marginBottom: 2,
                                  borderRadius: "10px",
                                  padding: "10px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    marginBottom: 2,
                                    fontSize: "13px",
                                    letterSpacing: "0.05rem",
                                  }}
                                  variant="body"
                                  color="initial"
                                >
                                  Current Tenancy Period
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "5px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      letterSpacing: "0.05rem",
                                    }}
                                    variant="body1"
                                    color="grayText"
                                  >
                                    {
                                      individualProperty?.tenancy_details
                                        ?.tenancy_terms?.start_date
                                    }
                                  </Typography>
                                  <HorizontalRule fontSize="0.8rem" />
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      letterSpacing: "0.05rem",
                                    }}
                                    variant="body1"
                                    color="grayText"
                                  >
                                    {
                                      individualProperty?.tenancy_details
                                        ?.tenancy_terms?.end_date
                                    }
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                  marginBottom: 2,
                                }}
                              >
                                {tenancyId ===
                                  individualProperty?.tenancy_details
                                    ?.tenancy_terms?.tenancy_id &&
                                  (currentParty?.status === 3 ||
                                    currentParty?.status === 4) &&
                                  currentParty?.party_type_id === 2 && (
                                    <Button
                                      onClick={() =>
                                        dispatch(
                                          setOpenPayMonthlyRentModal(true)
                                        )
                                      }
                                      color="primary"
                                      variant="outlined"
                                    >
                                      Pay Rent
                                    </Button>
                                  )}
                                <Button
                                  onClick={() => {
                                    dispatch(
                                      fetchAllRentalPaymentReceipts({
                                        tenancy_id:
                                          individualProperty?.tenancy_details
                                            ?.tenancy_terms?.tenancy_id,
                                      })
                                    );
                                    dispatch(setOpenViewAllReceiptModal(true));
                                  }}
                                  color="primary"
                                  variant="outlined"
                                >
                                  Rent Receipts
                                </Button>
                              </Box>
                            </Card>
                            <Button
                              id="basicDetailsBtn"
                              onClick={() => handleScroll("#basicDetails")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Basic Details
                            </Button> */}
            {/* Commented the below code for Phase 1 */}
            {/* <Button
                              id="listingDetailsBtn"
                              onClick={() => handleScroll("#listingDetails")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Listing Details
                            </Button>
                            <Button
                              id="tenantPreferenceBtn"
                              onClick={() => handleScroll("#tenantPreference")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Tenant Preference
                            </Button>
                            <Button
                              id="contactDetailsBtn"
                              onClick={() => handleScroll("#contactDetails")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Contact Details
                            </Button>
                            <Button
                              id="propertyImagesBtn"
                              onClick={() => handleScroll("#propertyImages")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Property Images
                            </Button> 
                            {!(partyTypeId === 2) && (
                              <>
                                <Button
                                  id="packagePreferenceBtn"
                                  onClick={() =>
                                    handleScroll("#packagePreference")
                                  }
                                  color="primary"
                                  sx={{
                                    "&.MuiButton-text": {
                                      textAlign: "left",
                                    },
                                  }}
                                >
                                  Package Preference
                                </Button>
                                <Button
                                  id="listingPerformanceBtn"
                                  onClick={() =>
                                    handleScroll("#listingPerformance")
                                  }
                                  color="primary"
                                  sx={{
                                    "&.MuiButton-text": {
                                      textAlign: "left",
                                    },
                                  }}
                                >
                                  Listing Performance
                                </Button>
                              </>
                            )}*/}
            {/* </Box>
                          <Box
                            sx={{
                              my: 4,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography variant="h6" color="initial">
                              Current Tenancy Details
                            </Typography>

                            <Button
                              id="partiesBtn"
                              onClick={() => handleScroll("#parties")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Parties
                            </Button>
                            <Button
                              id="tenancyTermsBtn"
                              onClick={() => handleScroll("#tenancyTerms")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Tenancy Terms
                            </Button>
                            <Button
                              id="tenancyFittingsBtn"
                              onClick={() => handleScroll("#tenancyFittings")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Tenancy Fittings
                            </Button>
                            <Button
                              id="propertyInclusionBtn"
                              onClick={() => handleScroll("#propertyInclusion")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Property Inclusions
                            </Button>
                            <Button
                              id="rentalAgreementBtn"
                              onClick={() => handleScroll("#rentalAgreement")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Rental Agreement
                            </Button>
                            <Button
                              id="verificationAndConfirmationBtn"
                              onClick={() =>
                                handleScroll("#verificationAndConfirmation")
                              }
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Verification and Confirmation
                            </Button>
                            <Button
                              id="signingOfRentalAgreementBtn"
                              onClick={() =>
                                handleScroll("#signingOfRentalAgreement")
                              }
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Signing of Rental Agreement
                            </Button>
                            <Button
                              id="communicationsBtn"
                              onClick={() => handleScroll("#communications")}
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Communications
                            </Button>
                          </Box>
                          <Box
                            sx={{
                              my: 4,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          > */}
            {/* <Typography variant="h6" color="initial">
                              Past Listings
                            </Typography>

                            <Button
                              color="primary"
                              sx={{
                                "&.MuiButton-text": {
                                  textAlign: "left",
                                },
                              }}
                            >
                              Address 2
                            </Button> */}
            {/* </Box>
                          <Box
                            sx={{
                              my: 4,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography variant="h6" color="initial">
                              Past Tenancies
                            </Typography>
                            {individualProperty?.tenancy_details?.all_tenancy?.map(
                              (item) => (
                                <Button
                                  key={item.tenancy_id}
                                  color="primary"
                                  sx={{
                                    "&.MuiButton-text": {
                                      textAlign: "left",
                                    },
                                  }}
                                >
                                  [ {item.start_date} - {item.end_date} ]
                                </Button>
                              )
                            )}
                          </Box>
                        </Paper>
                      </Grid>
                    </>
                  )}
                </>
              ) 
            ){/*}*/}
          </Grid>
        </Container>
      </>
    </>
  );
};

export default Property;
