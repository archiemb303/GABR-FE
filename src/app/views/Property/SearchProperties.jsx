// Search properties

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  Divider,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  TextField,
  Paper,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { FlexAlignCenter } from "app/components/FlexBox";
import { H2, H4, H5, Paragraph, Span } from "app/components/Typography";
import { Formik } from "formik";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { countries } from "../ecommerce/Country";
import BasicMap from "../map/BasicMap";
import MenuIcon from "@mui/icons-material/Menu";
import {
  getSearchedPropertiesAction,
  getIndividualSearchedPropertiesDetailsAction,
  pastSaveSearchAction,
  getSavedSearches,
  PAST_SAVE_SEARCHES,
  getShortlistedProperties,
  addShortlistedProperties,
  ADD_SHORTLISTED_PROPERTY,
  getContactListingAction,
  removeShortlistedProperties,
  removeSavedSearchesAction,
  getReportTypeAction,
} from "app/redux/actions/PropertyActions";
import { useDispatch } from "react-redux";
import { getAllCitiesAction } from "app/redux/actions/LocationActions";
import Loading from "app/components/MatxLoading";
import ShortlistedProperty from "./ShortlistedProperty";
import ViewPropertyListingDetails from "./ViewPropertyListingDetails";
import {
  fetchMyInvitationsAction,
  fetchMyPropertyAction,
  getIndividualPropertyAction,
} from "app/redux/actions/PropertyActions";
import JoditEditor from "jodit-react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ScrollBar from "react-perfect-scrollbar";
import CustomSnackbar from "app/components/CustomSnackbar";
import { propertyTypeItems, PropertyTypeItems } from "./items/propertyTypes";
import * as Yup from "yup";
import {
  setPackagePreferenceModal,
  setPremiumSearchModal,
  setReportModal,
  setSupportCenterMOdal,
} from "app/redux/actions/ModalActions";
import PackagePreferenceModal from "./PackagePreferenceModal";
import PremiumPackageStatus from "./PremiumPackageStatus";
import PackagePreferenceSuccessModal from "./PackagePreferenceSuccessModal";
import BuyPremiumSearchModal from "./BuyPremiumSearchModal";
import PremiumSearchSuccessModal from "./PremiumSearchSuccessModal";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useTheme } from "@emotion/react";
import PremiumSearchStatusModal from "./PremiumSearchStatusModal";
import { Close } from "@mui/icons-material";
import SupportCenterModal from "./SupportCenterModal";
import ReportModal from "./ReportModal";
import GoogleMaps from "./GoogleMaps";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "30px",
  padding: "24px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));
const StyledImg = styled("img")(({ url }) => ({
  width: 80,
  marginLeft: 2,
  marginRight: 2,
  borderRadius: "4px",
}));
const ProductCard = styled(Card)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}));

const IMG = styled("img")(() => ({
  marginBottom: 32,
  maxWidth: "100%",
  maxHeight: "100%",
  height: "100%",
  // height: 500,
}));

const CallBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 16,
}));

function valuetext(value) {
  return `${value} $`;
}

const DialogTitleRoot = styled(MuiDialogTitle)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  "& .closeButton": {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = (props) => {
  const { children, onClose } = props;
  return (
    <DialogTitleRoot disableTypography>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className="closeButton"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitleRoot>
  );
};

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  "&.root": { padding: theme.spacing(2) },
}));

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
  "&.root": { margin: 0, padding: theme.spacing(1) },
}));
const ValidateMax_Budget = (min_b, max_b) => {
  if (parseInt(min_b) < parseInt(max_b)) return true;
  else return false;
};
const SearchProperties = () => {
  const [isFreeSearchClicked, setFreeSearchClicked] = useState(false);
  const [isPremiumSearchClicked, setPremiumSearchClicked] = useState(false);
  const { cities } = useSelector((store) => store.location);
  const { custom } = useTheme();
  const dispatch = useDispatch();
  const {
    searchedProperties,
    individualSearchedPropertiesDetails,
    pastSavedSearches,
    shortlistedProperties,
    contactlisted,
    getReportType,
  } = useSelector((store) => store.property);
  const [selectedImage, setSelectedImage] = useState(
    "http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
  );

  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("persistentState"));
  const [openshortlisted, setopenshortlisted] = useState(false);
  const [openpastsearch, setopenpastsearch] = useState(false);
  const [openrecentcontact, setopenrecentcontact] = useState(false);
  const [opencontactinfo, setopencontactinfo] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [openChatBox, setopenChatBox] = useState(false);
  const [showSaveSearch, setshowSaveSearch] = useState(false);
  const [imageList, setimageList] = useState(null);
  const [shortlistedPropertieslist, setshortlistedPropertieslist] = useState(
    []
  );
  const [pastSearchHovered, setPastSearchHovered] = useState(null);
  const [pastSavedSearcheslist, setpastSavedSearcheslist] = useState([]);

  const [initialValues, setInitialValues] = useState({
    city_id: searchedProperties?.search_params?.city_id || "",
    city: searchedProperties?.search_params?.city || "",
    area: searchedProperties?.search_params?.area || "",
    house: searchedProperties?.search_params?.house || "",
    rooms: searchedProperties?.search_params?.rooms || 0,
    min_budget: searchedProperties?.search_params?.min_budget || "5000",
    max_budget: searchedProperties?.search_params?.max_budget || "10000",
  });
  const handleToggleSidebar = () => {
    setShowSidebar((prevState) => {
      return !prevState;
    });
  };
  useEffect(() => {
    setimageList(() => {
      let list =
        individualSearchedPropertiesDetails?.listing_details?.listing_images?.map(
          (item, index) => {
            if (index === 0) {
              return {
                ...item,
                isSelected: true,
              };
            } else {
              return {
                ...item,
                isSelected: false,
              };
            }
          }
        );
      return list;
    });
  }, [individualSearchedPropertiesDetails]);

  //Set modal open and show fetch individual property detail
  const openProperty = (item) => {
    setOpen(true);
    let pastsavelist = pastSavedSearcheslist.filter((m) => m.isRouted);
    let shortlistlist = shortlistedPropertieslist.filter((m) => m.isRouted);
    dispatch(
      getIndividualSearchedPropertiesDetailsAction({
        property_id: item?.property_id,
        listing_id: item?.listing_id,
        search_id: 0,
        shortlisted_search_id: item?.shortlisted_search_id,
        saved_search_id: item?.search_id,
      })
    );
  };

  const handleClick = (item) => {
    setOpen(true);
    let pastsavelist = pastSavedSearcheslist?.filter((m) => m.isRouted);
    let shortlistlist = shortlistedPropertieslist?.filter((m) => m.isRouted);
    dispatch(
      getIndividualSearchedPropertiesDetailsAction({
        property_id: item?.property_id_id,
        listing_id: item?.listing_id,
        search_id:
          pastsavelist?.length > 0
            ? 0
            : shortlistlist?.length > 0
            ? 0
            : searchedProperties?.search_id,
        shortlisted_search_id:
          shortlistlist?.length > 0
            ? shortlistlist[0].shortlisted_search_id
            : "",
        saved_search_id:
          pastsavelist?.length > 0
            ? pastsavelist[0].search_id
            : shortlistlist?.length > 0
            ? shortlistlist[0].search_id
            : 0,
      })
    );
  };

  const handleClose = () => {
    setopencontactinfo(false);
    setOpen(false);
  };

  const MessageTime = styled("span")(({ theme }) => ({
    fontSize: "13px",
    fontWeight: "500",
    color: theme.palette.text.secondary,
  }));
  const ChatImgContainer = styled("div")(() => ({
    padding: "20px",
    display: "flex",
    justifyContent: "flex-end",
  }));

  const [selectedTopic, setSelectedTopic] = useState({
    id: 454546,
    topic_id: 2454545,
    messages: [
      {
        message: "hello",
        time: "10:20am",
        name: "Jhone",
        date: "10/30/2022",
        isAuthor: true,
      },
      {
        message: "How are you please tell me how can i help me",
        time: "10:25am",
        name: "Nikhil",
        date: "11/8/2022",
        isAuthor: false,
      },
      {
        message:
          "amet consectetur adipisicing elit. Nesciunt cupiditate dolorem rem ratione quisquam tenetur consequatur quasi accusantium",
        time: "10:30am",
        name: "Ajaydev",
        date: "11/8/2022",
        isAuthor: true,
      },
      {
        message:
          " Nesciunt cupiditate dolorem rem ratione quisquam tenetur consequatur quasi accusantium",
        time: "3:12am",
        name: "Ranbir",
        date: "05/9/2022",
        isAuthor: true,
      },
    ],
  });
  const StyledScrollBar = styled(ScrollBar)(() => ({
    flexGrow: 1,
  }));
  const preloginState = useSelector((state) => state.prelogin);

  useEffect(() => {
    dispatch(getShortlistedProperties());
    dispatch(getSavedSearches());
    dispatch(getAllCitiesAction({}));
  }, []);
  const {
    GET_INDIVIDUAL_SEARCHED_PROPERTIES_DETAILS,
    GET_SEARCHED_PROPERTIES,
    SHORTLISTED_PROPERTIES,
    ADD_SHORTLISTED_PROPERTY,
    ADD_SAVED_SEARCHES,
    PAST_SAVE_SEARCHES,
    REMOVE_SAVED_SEARCHES,
    GET_CONTACT_LISTING,
    ADD_REPORTED_lISTING,
    REMOVE_SHORTLISTED_PROPERTY,
  } = useSelector((store) => store.loadingAndError.loader);

  let items = [
    {
      file_id_id: "350",
      file_name: "Not Defined",
      file_order: "3",
      file_url:
        "https://d2moxygiq43y7d.cloudfront.net/static/media/de151d32-8583-4600-bf22-695fab3009c8-woman-gebc0fe19b_1280-2023-01-02.jpg",
      image_id: "4d958893-08bc-436b-b36a-68f36da45f58",
      location: "Street Number 30",
      property_id_id: "801249b5-3a09-4de0-bf60-35818039f8bc",
      property_name: "Delhi 02",
      shortlisted_property_id: "1",
    },
    {
      creator_type: "Owner",
      creator_type_id: "1",
      file_description: "",
      file_id_id: "350",
      file_name: "Not Defined",
      file_order: "3",
      file_url:
        "https://d2moxygiq43y7d.cloudfront.net/static/media/de151d32-8583-4600-bf22-695fab3009c8-woman-gebc0fe19b_1280-2023-01-02.jpg",
      image_id: "4d958893-08bc-436b-b36a-68f36da45f58",
      listing_status_id: "2",
      listing_status_name: "listed-free",
      location: "Street Number 30",
      location_coordinates_x: "12.971599",
      location_coordinates_y: "77.594566",
      maintenance_included: true,
      posted_on: "2023-01-02T14:48:48.343170Z",
      property_description:
        "This house is unfurnished at the moment, some flooring work is going on. Adding emoji here 🚫⚡✅👺🤖🦭🟢🅿️🔃",
      property_id_id: "801249b5-3a09-4de0-bf60-35818039f8bc",
      property_name: "Delhi 02",
      property_status_id: "4",
      property_status_name: "Active-Listed",
      rent: "15000",
      security: "80000",
    },
  ];

  useEffect(() => {
    if (
      ADD_SAVED_SEARCHES?.isLoading === false ||
      REMOVE_SAVED_SEARCHES?.isLoading === false
    )
      dispatch(getSavedSearches());
    else if (
      ADD_SHORTLISTED_PROPERTY?.isLoading === false ||
      REMOVE_SHORTLISTED_PROPERTY?.isLoading === false
    )
      dispatch(getShortlistedProperties());
  }, [
    ADD_SAVED_SEARCHES?.isLoading,
    REMOVE_SAVED_SEARCHES?.isLoading,
    ADD_SHORTLISTED_PROPERTY?.isLoading,
    REMOVE_SHORTLISTED_PROPERTY?.isLoading,
  ]);
  const shortlistbtn = () => {
    dispatch(
      addShortlistedProperties({
        listing_id:
          individualSearchedPropertiesDetails?.listing_details?.listing_id,
        listing_status:
          individualSearchedPropertiesDetails?.listing_details?.listing_status,
        search_id: searchedProperties?.search_id,
      })
    );
    handleClose();
  };

  useEffect(() => {
    if (ADD_SHORTLISTED_PROPERTY?.isLoading === false)
      dispatch(getShortlistedProperties());
  }, [ADD_SHORTLISTED_PROPERTY?.isLoading]);

  useEffect(() => {
    setshortlistedPropertieslist(() => {
      let list = shortlistedProperties?.map((item, index) => {
        return {
          ...item,
          isRouted: false,
          isSelected: false,
        };
      });
      return list;
    });
  }, [SHORTLISTED_PROPERTIES?.isLoading]);

  useEffect(() => {
    setpastSavedSearcheslist(() => {
      let list = pastSavedSearches?.map((item, index) => {
        return {
          ...item,
          isRouted: false,
          isSelected: false,
        };
      });
      return list;
    });
  }, [PAST_SAVE_SEARCHES?.isLoading]);
  const [citiesArray, setcitiesArray] = useState([]);
  useEffect(() => {
    let l = cities?.map((obj) => {
      return obj.city_name;
    });
    setcitiesArray(l);
  }, [cities]);

  const resetpastSavedlist = () => {
    setpastSavedSearcheslist((prevState) => {
      // Reset the selected state for all properties
      const newState = prevState?.map((el) => ({
        ...el,
        isRouted: false,
      }));
      // Set the selected state true for the current property
      return newState;
    });
  };
  const resetShortlistlist = () => {
    setshortlistedPropertieslist((prevState) => {
      // Reset the selected state for all properties
      const newState = prevState?.map((el) => ({
        ...el,
        isRouted: false,
      }));

      // Set the selected state true for the current property
      return newState;
    });
  };
  const validationSchema = Yup.object().shape({
    max_budget: Yup.number()
      .min(2000, "Field value must be less than or equal to 2000")
      .required("Field is required"),
  });
  useEffect(() => {
    if (
      GET_SEARCHED_PROPERTIES?.error === "Please purchase a premium plan first"
    ) {
      dispatch(setPremiumSearchModal(true));
    }
  }, [GET_SEARCHED_PROPERTIES?.error]);

  return (
    <>
      {ADD_REPORTED_lISTING?.isLoading === false && (
        <CustomSnackbar
          loaderChild={ADD_REPORTED_lISTING}
          successMessage="Report Added  Successfully !"
        />
      )}
      <ReportModal></ReportModal>
      <BuyPremiumSearchModal />
      {/* <PremiumPackageStatus /> */}
      <PremiumSearchStatusModal />
      <PremiumSearchSuccessModal />
      <SupportCenterModal></SupportCenterModal>
      {ADD_SAVED_SEARCHES?.isLoading === false && (
        <CustomSnackbar
          loaderChild={ADD_SAVED_SEARCHES}
          successMessage="Search Saved Successfully !"
        />
      )}
      {ADD_SHORTLISTED_PROPERTY?.isLoading === false && (
        <CustomSnackbar
          loaderChild={ADD_SHORTLISTED_PROPERTY}
          successMessage="Property Shortlisted Successfully !"
        />
      )}
      {REMOVE_SHORTLISTED_PROPERTY?.isLoading === false && (
        <CustomSnackbar
          loaderChild={REMOVE_SHORTLISTED_PROPERTY}
          successMessage="Property Removed from Shortlist !"
        />
      )}
      <Grid
        columnSpacing={2}
        container
        style={{
          background: "rgb(4 8 47 / 37%)",
          height: "100%",
          width: { md: "102%", xs: "104%" },
        }}
      >
        <Grid item sx={{ mt: 2, width: "40%" }} md={2} sm={5} xs={8}>
          <Box
            sx={(themes) => ({
              [themes.breakpoints.down("md")]: {
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
                height: "89vh",
                overflow: "auto",
              })}
            >
              {SHORTLISTED_PROPERTIES?.isLoading === true ? (
                <Box sx={{ mt: 2, p: 10 }}>
                  <Loading />
                </Box>
              ) : (
                <>
                  <MenuItem
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={(themes) => ({
                      [themes.breakpoints.down("md")]: {
                        mb: 2,
                      },
                    })}
                    onClick={() => {
                      setopenshortlisted(!openshortlisted);
                    }}
                  >
                    Shortlisted (
                    {shortlistedProperties ? shortlistedProperties.length : "0"}
                    )
                  </MenuItem>
                  {openshortlisted &&
                    shortlistedPropertieslist?.map((item, index) => {
                      return (
                        <ShortlistedProperty
                          item={item}
                          handleClick={() => {
                            resetpastSavedlist();
                            setshortlistedPropertieslist((prevState) => {
                              // Reset the selected state for all properties
                              const newState = prevState?.map((el) => ({
                                ...el,
                                isRouted: false,
                                isSelected: false,
                              }));
                              // Set the selected state true for the current property
                              newState[index].isSelected = true;
                              newState[index].isRouted = true;
                              return newState;
                            });
                            setSelectedImage(
                              item.file_url === null
                                ? "http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
                                : item.file_url
                            );
                            openProperty(item);
                          }}
                          setopenChatBox={setopenChatBox}
                        />
                      );
                    })}
                  <MenuItem
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={(themes) => ({
                      [themes.breakpoints.down("md")]: {
                        mb: 2,
                      },
                    })}
                    onClick={() => {
                      setopenpastsearch(!openpastsearch);
                    }}
                  >
                    Past Searches (
                    {pastSavedSearches ? pastSavedSearches?.length : "0"})
                  </MenuItem>
                  {openpastsearch && (
                    <>
                      {pastSavedSearcheslist?.map((item, index) => {
                        return (
                          <Grid
                            item
                            xs={24}
                            sm={12}
                            md={10}
                            lg={10}
                            mb={2}
                            sx={{ minWidth: "100%" }}
                          >
                            <Card
                              variant="outlined"
                              sx={{
                                padding: 1,
                                // width: "100%",
                                boxShadow: item?.isSelected
                                  ? "5px 5px 10px 0px rgb(178 201 224) !important"
                                  : "unset",
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                              }}
                              onMouseEnter={() => {
                                setPastSearchHovered(index);
                              }}
                              onMouseLeave={() => {
                                setPastSearchHovered(-1);
                              }}
                              onMouseEnter={() => {
                                setPastSearchHovered(index);
                              }}
                              onMouseLeave={() => {
                                setPastSearchHovered(-1);
                              }}
                            >
                              <Box
                                display={`${
                                  pastSearchHovered === index ? "flex" : "none"
                                }`}
                                justifyContent="end"
                              >
                                <IconButton
                                  onClick={() => {
                                    dispatch(
                                      removeSavedSearchesAction({
                                        search_id: item.search_id,
                                      })
                                    );
                                    setopenpastsearch(false);
                                  }}
                                >
                                  <Close fontSize="small" />
                                </IconButton>
                              </Box>
                              <Paragraph
                                onClick={() => {
                                  resetShortlistlist();
                                  setpastSavedSearcheslist((prevState) => {
                                    // Reset the selected state for all properties
                                    const newState = prevState?.map((el) => ({
                                      ...el,
                                      isRouted: false,
                                      isSelected: false,
                                    }));
                                    // Set the selected state true for the current property
                                    newState[index].isSelected = true;
                                    newState[index].isRouted = true;
                                    return newState;
                                  });
                                  setInitialValues(item.search_params);
                                  dispatch(
                                    getSearchedPropertiesAction({
                                      city: item?.search_params?.city,
                                      city_id: item?.search_params?.city_id,
                                      area: item?.search_params?.area,
                                      house: item?.search_params?.house,
                                      rooms: item?.search_params?.rooms,
                                      min_budget:
                                        item?.search_params?.min_budget,
                                      max_budget:
                                        item?.search_params?.max_budget,
                                      search_type: "free",
                                    })
                                  );
                                }}
                                style={{
                                  height: "100%",
                                  "font-size": "13px",
                                  cursor: "pointer",
                                }}
                                mb={1}
                              >
                                {item.added_date && (
                                  <Box>
                                    Added on:{" "}
                                    <b>
                                      {moment(item.added_date).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </b>
                                    <br />
                                  </Box>
                                )}
                                {item.search_params.city && (
                                  <Box>
                                    City: <b>{item.search_params.city}</b>
                                    <br />
                                  </Box>
                                )}
                                {item.search_params.min_budget && (
                                  <Box>
                                    Min Budget:{" "}
                                    <b>{item.search_params.min_budget}</b>
                                    <br />
                                  </Box>
                                )}
                                {item.search_params.max_budget && (
                                  <Box>
                                    Max Budget:{" "}
                                    <b>{item.search_params.max_budget}</b>
                                    <br />
                                  </Box>
                                )}

                                {item.search_params.area && (
                                  <Box>
                                    Area: <b>{item.search_params.area}</b>
                                    <br />
                                  </Box>
                                )}
                                {item.listing_ids && (
                                  <Box>
                                    No. of Properties:{" "}
                                    <b>{item.listing_ids.length}</b>
                                    <br />
                                  </Box>
                                )}
                                {
                                  <Box>
                                    Rooms:
                                    <b>{item.search_params.rooms}</b>
                                  </Box>
                                }
                              </Paragraph>


                            </Card>
                          </Grid>
                        );
                      })}
                    </>
                  )}
                  <MenuItem
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setopenrecentcontact(!openrecentcontact);
                    }}
                    sx={(themes) => ({
                      [themes.breakpoints.down("md")]: {
                        mb: 2,
                      },
                    })}
                  >
                    Contact (2)
                  </MenuItem>
                  {openrecentcontact &&
                    items.map((item, index) => (
                      <Grid item xs={24} sm={12} md={10} lg={10}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "220px" }}
                        >
                          <Box display="flex">
                            <ImageList
                              height="69px"
                              style={{ width: "90px" }}
                              cols={2}
                            >
                              <ImageListItem>
                                <img
                                  src={
                                    item.file_url == ""
                                      ? "/assets/images/laptop-2.png"
                                      : item.file_url
                                  }
                                  alt={"property image"}
                                  loading="lazy"
                                  style={{ width: "70px", height: "69px" }}
                                />
                              </ImageListItem>
                            </ImageList>
                            <Box>
                              <H5 fontSize={"14px"} sx={{ my: 1 }}>
                                Rent: <b>{item.rent}</b>
                              </H5>
                              <H5
                                fontSize={"13px"}
                                text
                                sx={{ my: 1 }}
                                style={{ "text-overflow": "ellipsis" }}
                              >
                                <b>{item.location}</b>
                              </H5>
                              <Button
                                onClick={() => {
                                  setopenChatBox(true);
                                  handleClick(
                                    "801249b5-3a09-4de0-bf60-35818039f8bc"
                                  );
                                }}
                              >
                                Chat Now
                              </Button>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  <MenuItem
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={(themes) => ({
                      [themes.breakpoints.down("md")]: {
                        mb: 2,
                      },
                    })}
                  >
                    Appointment (0)
                  </MenuItem>
                </>
              )}
            </Paper>
          </Box>
        </Grid>
        {/* Search Property Starts here */}
        <Grid md={9} mt={2} sx={{ ml: { xs: "4%", md: "0" } }}>
          {openChatBox ? (
            <Box
              display="flex"
              sx={{ flexDirection: { md: "row", xs: "column" } }}
            >
              {GET_INDIVIDUAL_SEARCHED_PROPERTIES_DETAILS?.isLoading ===
              true ? (
                <Grid item md={12} sx={{ height: 100 }}>
                  <Loading />
                </Grid>
              ) : (
                <>
                  <Grid item xs={22} md={9.5}>
                    <Box>
                      <Card
                        id="communications"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          padding: 2,
                          margin: "0 auto",
                          ml: "7%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: "2",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginRight: "5px",
                            }}
                          >
                            <H5>Chat History</H5>
                          </Typography>
                        </Box>
                        <Card
                          variant="outlined"
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0 auto",
                            width: "100%",
                          }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              padding: 2,
                              margin: "0 auto",
                              my: 2,
                              width: "100%",
                              height: "450px",
                              overflowY: "scroll",
                            }}
                          >
                            <StyledScrollBar id="chat-scroll">
                              {selectedTopic.messages.map((m) => (
                                <Box>
                                  {!m.isAuthor ? (
                                    <ChatImgContainer
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <Box>
                                        <Box
                                          sx={{
                                            backgroundColor: "#e8e8e8",
                                            padding: "10px",
                                            with: "100%",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              margin: "2px",
                                              padding: "3px",
                                              bgcolor: "#d2d2d2",
                                              display: "inline",
                                            }}
                                          >
                                            {m.name}
                                          </Typography>
                                          <Typography>{m.message}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex" }}>
                                          <MessageTime
                                            sx={{ marginRight: "4px" }}
                                          >
                                            {m.time}
                                          </MessageTime>
                                          <Typography>{m.date}</Typography>
                                        </Box>
                                      </Box>
                                    </ChatImgContainer>
                                  ) : (
                                    <ChatImgContainer
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <Box>
                                        <Box
                                          sx={{
                                            backgroundColor: "#e8e8e8",
                                            padding: "10px",
                                            marginTop: "20px",

                                            with: "100%",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              margin: "2px",
                                              padding: "3px",
                                              bgcolor: "#d2d2d2",
                                              display: "inline",
                                            }}
                                          >
                                            {m.name}
                                          </Typography>
                                          <Typography>{m.message}</Typography>
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            margin: "0px",
                                            padding: "0px",
                                          }}
                                        >
                                          <MessageTime
                                            sx={{ marginRight: "4px" }}
                                          >
                                            {m.time}
                                          </MessageTime>
                                          <Typography>{m.date}</Typography>
                                        </Box>
                                      </Box>
                                    </ChatImgContainer>
                                  )}
                                </Box>
                              ))}
                            </StyledScrollBar>
                          </Grid>
                          <Divider sx={{ marginBottom: "10px" }}></Divider>

                          <Box marginX={2}>
                            <JoditEditor
                              config={{
                                readonly: false,
                                placeholder: "Start typing...",
                              }}
                              tabIndex={1} // tabIndex of textarea
                              onChange={(newContent) => {}}
                            />
                          </Box>
                          <Grid
                            width="auto"
                            marginX={2}
                            marginY={1}
                            container
                            justifyContent="flex-end"
                          >
                            <Button
                              sx={{
                                borderRadius: "30px",
                              }}
                              variant="contained"
                            >
                              Send
                            </Button>
                          </Grid>
                        </Card>
                      </Card>
                    </Box>
                  </Grid>
                  <Paper
                    sx={(themes) => ({
                      [themes.breakpoints.down("md")]: {
                        width: "60%",
                        ml: "34%",
                      },
                      ml: "1%",
                      top: "0",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      p: 2,
                      height: "817px",
                      overflow: "auto",
                    })}
                  >
                    <Typography variant="h5">Listing Details </Typography>
                    <Grid>
                      <Grid item xs={24} sm={12} md={10} lg={10} mb={2}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "147px" }}
                        >
                          <Typography>
                            <b>Listing Date:</b>
                          </Typography>
                          {moment(
                            individualSearchedPropertiesDetails?.listing_details
                              ?.added_date
                          ).format("DD-MM-YYYY")}
                        </Card>
                      </Grid>
                      <Grid item xs={24} sm={12} md={10} lg={10} mb={2}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "147px" }}
                        >
                          <Typography>
                            <b>Listing ID:</b>{" "}
                            {individualSearchedPropertiesDetails?.listing_details?.listing_id?.substring(
                              31,
                              36
                            )}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={24} sm={12} md={10} lg={10} mb={2}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "147px" }}
                        >
                          <Typography>
                            <b>Property ID:</b>{" "}
                            {individualSearchedPropertiesDetails?.listing_details?.property_id?.substring(
                              31,
                              36
                            )}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={24} sm={12} md={10} lg={10} mb={2}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "147px" }}
                        >
                          <Typography>
                            <b>Rent Per Month:</b>
                          </Typography>
                          {
                            individualSearchedPropertiesDetails?.listing_details
                              ?.rent_per_month
                          }
                        </Card>
                      </Grid>
                      <Grid item xs={24} sm={12} md={10} lg={10} mb={2}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "147px" }}
                        >
                          <Typography>
                            <b>Security Deposit:</b>
                          </Typography>
                          {
                            individualSearchedPropertiesDetails?.listing_details
                              ?.security_deposit
                          }
                        </Card>
                      </Grid>
                      <Grid item xs={24} sm={12} md={10} lg={10} mb={2}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "147px" }}
                        >
                          <Typography>
                            <b>Amenities:</b>
                          </Typography>
                          {individualSearchedPropertiesDetails?.listing_details?.amenities?.map(
                            (amenity, index) => (
                              <Box component="div" sx={{ p: 0.5 }}>
                                ⊛ {amenity.amenity_name}
                              </Box>
                            )
                          )}
                        </Card>
                      </Grid>
                      <Grid item xs={24} sm={12} md={10} lg={10} mb={2}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "147px" }}
                        >
                          <Typography>
                            <b>Furnishing Details:</b>
                          </Typography>
                          {individualSearchedPropertiesDetails?.listing_details?.furnishing_details?.map(
                            (item, index) => (
                              <Box component="div" marginBottom="0" sx={{}}>
                                {item.is_selected === 1
                                  ? item.furnishing_name
                                  : ""}
                              </Box>
                            )
                          )}
                        </Card>
                      </Grid>
                      <Grid item xs={24} sm={12} md={10} lg={10} mb={2}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "147px" }}
                        >
                          <Typography>
                            <b>Maintainence:</b>
                          </Typography>
                          {individualSearchedPropertiesDetails?.listing_details
                            ?.maintenance_included
                            ? "Included"
                            : "Not Included"}
                        </Card>
                      </Grid>
                      <Grid item xs={24} sm={12} md={10} lg={10} mb={2}>
                        <Card
                          variant="outlined"
                          sx={{ padding: 1, width: "147px" }}
                        >
                          <Typography>
                            <b>Property Description:</b>
                          </Typography>
                          {
                            individualSearchedPropertiesDetails?.listing_details
                              ?.property_description
                          }
                        </Card>
                      </Grid>
                    </Grid>
                  </Paper>
                </>
              )}
            </Box>
          ) : (
            <StyledCard style={{ "margin-top": "0" }}>
              <div>
                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                  sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "970px", // Set your width here
                        overflowY: "auto",
                      },
                    },
                  }}
                >
                  {GET_INDIVIDUAL_SEARCHED_PROPERTIES_DETAILS?.isLoading ===
                  true ? (
                    <DialogContent>
                      <Grid item md={12} sx={{ height: 100 }}>
                        <Loading />
                      </Grid>
                    </DialogContent>
                  ) : (
                    <>
                      <DialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                      >
                        <Box
                          sx={{
                            justifyContent: "space-between",
                            display: "flex",
                            width: "92%",
                          }}
                        >
                          <Paragraph sx={{ display: "inline-block" }}>
                            {"Modified On: " +
                              moment(
                                individualSearchedPropertiesDetails?.last_modified_date
                              ).format("DD-MMM-YYYY")}
                          </Paragraph>
                          {individualSearchedPropertiesDetails?.is_shortlisted_property ===
                          1 ? (
                            <Button
                              // onClick={() => {
                              //   shortlistbtn();
                              // }}
                              // variant="body2"
                              sx={(theme) => ({
                                color: "#fff",
                                padding: "4px 7px",
                                borderRadius: "4px",
                                backgroundColor: "#5ca9ff",
                                cursor: "pointer",
                              })}
                              variant="contained"
                              // color="error"
                              onClick={() => {
                                dispatch(
                                  removeShortlistedProperties({
                                    shortlisted_search_id:
                                      individualSearchedPropertiesDetails
                                        ?.user_source?.shortlisted_search_id,
                                  })
                                );
                                handleClose();
                                setopenshortlisted(false);
                              }}
                              // color="error"
                            >
                              Remove From Shortlist
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="contained"
                              disabled={
                                individualSearchedPropertiesDetails?.is_shortlisted_property ===
                                1
                              }
                              onClick={() => {
                                shortlistbtn();
                                setopenshortlisted(false);
                              }}
                              sx={(theme) => ({
                                color: "#fff",
                                padding: "4px 7px",
                                borderRadius: "4px",
                                // backgroundColor:
                                //   individualSearchedPropertiesDetails?.is_shortlisted_property ===
                                //   1
                                //     ? theme.custom.text.disabled
                                //     : theme.custom.c6,
                                cursor: "pointer",
                              })}
                              // color="submit"
                              style={{ "background-color": custom.c6 }}
                            >
                              Shortlist
                            </Button>
                          )}
                          {/* <Button
                            disabled={
                              individualSearchedPropertiesDetails?.is_shortlisted_property ===
                              1
                            }
                            onClick={() => {
                              shortlistbtn();
                            }}
                            color="error"
                          >
                            Shortlist
                          </Button> */}
                        </Box>
                      </DialogTitle>

                      <DialogContent dividers>
                        <Grid container>
                          <Grid container spacing={3}>
                            <Grid item md={12} xs={12}>
                              <ProductCard sx={{ p: 2 }}>
                                <Box
                                  sx={{ height: { md: "500px", xs: "auto" } }}
                                >
                                  <IMG src={selectedImage} alt="laptop" />
                                </Box>
                                <Box
                                  gap={2}
                                  py={2}
                                  sx={{
                                    width: "100%",
                                    overflowX: "auto",
                                    display: "flex",
                                  }}
                                >
                                  {imageList?.map((item, index) => (
                                    <>
                                      <StyledImg
                                        src={item.file_url}
                                        style={{
                                          cursor: "pointer",
                                        }}
                                        sx={{
                                          boxShadow: item.isSelected
                                            ? "rgb(0 200 255) 2px 1px 10px 1px !important"
                                            : "unset",
                                        }}
                                        onClick={() => {
                                          setimageList((prevState) => {
                                            // Reset the selected state for all properties
                                            const newState = prevState?.map(
                                              (el) => ({
                                                ...el,
                                                isSelected: false,
                                              })
                                            );
                                            // Set the selected state true for the current property
                                            newState[index].isSelected = true;
                                            return newState;
                                          });
                                          setSelectedImage(item.file_url);
                                        }}
                                      />
                                    </>
                                  ))}
                                </Box>
                              </ProductCard>
                            </Grid>
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <Card
                              variant="outlined"
                              sx={{
                                p: 2,
                                mt: 2,
                                mb: 2,
                                overflowY: "auto",
                                height: "auto",
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{ mt: 0, mb: 2, textAlign: "center" }}
                              >
                                Property Details
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: { md: "row", xs: "column" },
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box component="span" sx={{ mt: 0, mb: 1 }}>
                                  Property Name:{" "}
                                  <span style={{ color: "rgb(12, 83, 137)" }}>
                                    {
                                      individualSearchedPropertiesDetails
                                        ?.basic_details.property_name
                                    }
                                  </span>
                                </Box>
                                <Box component="span">
                                  Property Type:{" "}
                                  <span style={{ color: "rgb(12, 83, 137)" }}>
                                    {
                                      individualSearchedPropertiesDetails
                                        ?.basic_details.property_type_name
                                    }
                                  </span>
                                </Box>
                                <Box component="span">
                                  City:{" "}
                                  <span style={{ color: "rgb(12, 83, 137)" }}>
                                    {
                                      individualSearchedPropertiesDetails
                                        ?.basic_details.city_name
                                    }
                                  </span>
                                </Box>
                              </Box>
                            </Card>
                            <Card
                              variant="outlined"
                              sx={{
                                p: 2,
                                mb: 2,
                                overflowY: "auto",
                                height: "auto",
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{ mt: 0, mb: 1, textAlign: "center" }}
                              >
                                Description
                              </Typography>
                              <Paragraph sx={{ mt: 0, mb: 1 }}>
                                {
                                  individualSearchedPropertiesDetails
                                    ?.listing_details?.property_description
                                }
                              </Paragraph>
                            </Card>

                            <Card
                              variant="outlined"
                              sx={{
                                display: "flex",
                                flexFlow: "wrap",
                                justifyContent: "space-between",
                                p: 2,
                              }}
                            >
                              <Box sx={{ display: "inline-block" }}>
                                <Box display="flex">
                                  <Icon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                    color="primary"
                                  >
                                    payments
                                  </Icon>
                                  <Box sx={{ mt: 0, mb: 1 }}>
                                    Rent Per Month (₹)
                                  </Box>
                                </Box>
                                <CallBox>
                                  <H4 sx={{ m: 0, ml: 4 }}>
                                    {
                                      individualSearchedPropertiesDetails
                                        ?.listing_details?.rent_per_month
                                    }
                                  </H4>
                                </CallBox>
                              </Box>

                              <Box sx={{ display: "inline-block" }}>
                                <Box display="flex">
                                  <Icon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                    color="primary"
                                  >
                                    savings
                                  </Icon>
                                  <Box sx={{ mt: 0, mb: 1 }}>
                                    Security Deposit (₹)
                                  </Box>
                                </Box>
                                <CallBox>
                                  <H4 sx={{ m: 0, ml: 4 }}>
                                    {
                                      individualSearchedPropertiesDetails
                                        ?.listing_details?.security_deposit
                                    }
                                  </H4>
                                </CallBox>
                              </Box>

                              <Box sx={{ display: "inline-block" }}>
                                <Box display="flex">
                                  <Icon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                    color="primary"
                                  >
                                    handyman
                                  </Icon>
                                  <Box sx={{ mt: 0, mb: 1 }}>Maintenance</Box>
                                </Box>
                                <CallBox>
                                  <H4 sx={{ m: 0, ml: 4 }}>
                                    {individualSearchedPropertiesDetails
                                      ?.listing_details?.maintenance_included
                                      ? "Included"
                                      : "Not included"}
                                  </H4>
                                </CallBox>
                              </Box>

                              <Box
                                sx={{
                                  display: "inline-block",
                                  width: { md: "20%", xs: "100%" },
                                }}
                              >
                                <Box display="flex">
                                  <Icon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                    color="primary"
                                  >
                                    call
                                  </Icon>
                                  <Box sx={{ mt: 0, mb: 1, pr: "14px" }}>
                                    Contact Info
                                  </Box>
                                </Box>
                                <CallBox
                                  sx={{ mb: !opencontactinfo ? "17px" : "0" }}
                                >
                                  {opencontactinfo ? (
                                    <H4
                                      sx={{ m: 0, ml: 2 }}
                                      onClick={() => {
                                        setopencontactinfo(false);
                                      }}
                                    >
                                      {GET_CONTACT_LISTING?.isLoading ===
                                      true ? (
                                        <Grid item md={12} sx={{ height: 80 }}>
                                          <Loading />
                                        </Grid>
                                      ) : (
                                        <>
                                          {contactlisted?.map((item, index) => {
                                            return (
                                              <>
                                                <Box>
                                                  {item.contact_info.length >
                                                  20 ? (
                                                    <>
                                                      <span>
                                                        {
                                                          item.contact_info.split(
                                                            "@"
                                                          )[0]
                                                        }
                                                      </span>
                                                      <br />
                                                      <span>
                                                        @
                                                        {
                                                          item.contact_info.split(
                                                            "@"
                                                          )[1]
                                                        }
                                                      </span>
                                                    </>
                                                  ) : (
                                                    <span>
                                                      {item.contact_info}
                                                    </span>
                                                  )}
                                                  <Tooltip title="Verified">
                                                    {item.contact_status ===
                                                    1 ? (
                                                      <span
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      >
                                                        <VerifiedOutlinedIcon
                                                          sx={{
                                                            color: "green",
                                                          }}
                                                        />
                                                      </span>
                                                    ) : (
                                                      <span></span>
                                                    )}
                                                  </Tooltip>
                                                </Box>
                                                <Divider />
                                              </>
                                            );
                                          })}
                                        </>
                                      )}
                                    </H4>
                                  ) : (
                                    <Button
                                      onClick={() => {
                                        setopencontactinfo(true);
                                        dispatch(
                                          getContactListingAction({
                                            listing_id:
                                              individualSearchedPropertiesDetails
                                                ?.listing_details?.listing_id,
                                            view_id:
                                              individualSearchedPropertiesDetails?.view_id,
                                          })
                                        );
                                      }}
                                      style={{
                                        "margin-left": "14px",
                                        "padding-top": "0",
                                      }}
                                      color="info"
                                    >
                                      View
                                    </Button>
                                  )}
                                </CallBox>
                              </Box>
                            </Card>

                            <Card
                              variant="outlined"
                              sx={{
                                my: 2,
                                overflowY: "auto",
                                p: 2,
                                height: "auto",
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{ mt: 0, mb: 1, textAlign: "center" }}
                              >
                                Rooms
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: " wrap",
                                  justifyContent: "space-between",
                                }}
                              >
                                {individualSearchedPropertiesDetails?.basic_details?.space_details?.map(
                                  (space, index) => (
                                    <Paragraph sx={{ p: 1, m: 1 }}>
                                      {space.space_type} :{" "}
                                      <b style={{ color: "#0c5389" }}>
                                        {space.space_count}
                                      </b>
                                    </Paragraph>
                                  )
                                )}
                              </Box>
                            </Card>

                            <Card
                              variant="outlined"
                              sx={{
                                my: 2,
                                overflowY: "auto",
                                height: "auto",
                                p: 2,
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{ mt: 0, mb: 1, textAlign: "center" }}
                              >
                                Amenities
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: " wrap",
                                  justifyContent: "space-between",
                                }}
                              >
                                {individualSearchedPropertiesDetails?.listing_details?.amenities?.map(
                                  (amenity, index) => (
                                    <Paragraph sx={{ p: 1, m: 1 }}>
                                      {amenity.amenity_name}{" "}
                                      {amenity.availability === 1 ? (
                                        <Tooltip title="Available">
                                          <span style={{ cursor: "pointer" }}>
                                            ✅
                                          </span>
                                        </Tooltip>
                                      ) : (
                                        <Tooltip title="Unavailable">
                                          <span style={{ cursor: "pointer" }}>
                                            ❌
                                          </span>
                                        </Tooltip>
                                      )}
                                    </Paragraph>
                                  )
                                )}
                              </Box>
                            </Card>

                            <Card
                              variant="outlined"
                              sx={{
                                my: 2,
                                overflowY: "auto",
                                height: "auto",
                                p: 2,
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{ mt: 0, mb: 1, textAlign: "center" }}
                              >
                                Tenant Preference
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: " wrap",
                                  justifyContent: "space-between",
                                }}
                              >
                                {individualSearchedPropertiesDetails?.listing_details?.tenant_preference?.map(
                                  (tenant, index) => (
                                    <Paragraph sx={{ p: 1, m: 1 }}>
                                      {tenant.preference_name} :
                                      {tenant.preference_options.map(
                                        (item, index) => {
                                          if (item.is_selected === 1)
                                            return (
                                              <span
                                                style={{ color: "#0c5389" }}
                                              >
                                                {" "}
                                                <b>{item.option_name}</b>
                                              </span>
                                            );
                                        }
                                      )}
                                    </Paragraph>
                                  )
                                )}
                              </Box>
                            </Card>
                          </Grid>
                          <Grid item md={12} xs={12} sx={{ my: 2 }}>
                            <Card sx={{ width: "100%", height: "100%" }}>
                              {/* <BasicMap
                                lat={
                                  individualSearchedPropertiesDetails
                                    ?.basic_details?.location_coordinates_x
                                }
                                lng={
                                  individualSearchedPropertiesDetails
                                    ?.basic_details?.location_coordinates_y
                                }
                              /> */}
                              {/* <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.003947290227!2d77.582377314822!3d12.971598990855911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1d5915b39a5ad179!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnMDQuNCJF!5e0!3m2!1sen!2sin!4v1672905024600!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: "0", cursor: "move" }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                          ></iframe> */}
                              {/* /> */}

                              <GoogleMaps></GoogleMaps>
                            </Card>
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions
                        sx={{
                          justifyContent: "end",
                          flexDirection: "row-reverse",
                        }}
                      >
                        {/* onClick={handleClose} */}
                        <Button
                          onClick={() => {
                            dispatch(setReportModal(true));
                            dispatch(getReportTypeAction());
                          }}
                          color="error"
                        >
                          Report
                        </Button>
                        {individualSearchedPropertiesDetails?.is_shortlisted_property ===
                        1 ? (
                          <>
                            <Button
                              onClick={() => {
                                dispatch(
                                  removeShortlistedProperties({
                                    shortlisted_search_id:
                                      individualSearchedPropertiesDetails
                                        ?.user_source?.shortlisted_search_id,
                                  })
                                );
                                handleClose();
                              }}
                              // onClick={() => {
                              //   shortlistbtn();
                              // }}
                              // variant="body2"
                              sx={(theme) => ({
                                color: "#fff",
                                padding: "4px 7px",
                                borderRadius: "4px",
                                backgroundColor: "#5ca9ff",
                                cursor: "pointer",
                              })}
                              variant="contained"
                              // color="error"
                            >
                              Remove From Shortlist
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              disabled={
                                individualSearchedPropertiesDetails?.is_shortlisted_property ===
                                1
                              }
                              type="button"
                              variant="contained"
                              onClick={() => {
                                shortlistbtn();
                                setopenshortlisted(false);
                              }}
                              sx={(theme) => ({
                                color: "#fff",
                                padding: "4px 7px",
                                borderRadius: "4px",
                                // backgroundColor:
                                //   individualSearchedPropertiesDetails?.is_shortlisted_property ===
                                //   1
                                //     ? theme.custom.text.disabled
                                //     : theme.custom.c6,
                                cursor: "pointer",
                                marginRight: { md: "2%", xs: "0" },
                              })}
                              style={{ "background-color": custom.c6 }}
                            >
                              Shortlist
                            </Button>
                          </>
                        )}
                        {/* )} */}
                        {/* <Button
                          disabled={
                            individualSearchedPropertiesDetails?.is_shortlisted_property ===
                            1
                          }
                          onClick={() => {
                            shortlistbtn();
                          }}
                          style={{ mr: "2%" }}
                          color="error"
                        >
                          Shortlist
                        </Button> */}
                      </DialogActions>
                    </>
                  )}
                </Dialog>
              </div>

              <Box mx="auto" ml={2}>
                <H4 p={2}>Search Property</H4>

                <Divider sx={{ mb: 2 }} />

                <Formik
                  initialValues={initialValues}
                  enableReinitialize={true}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setSubmitting,
                    setFieldValue,
                    validateForm,
                    handleReset,
                  }) => (
                    <form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            select
                            sx={{ mr: 0 }}
                            name="city"
                            label="City"
                            value={values.city}
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={handleChange}
                            // helperText={
                            //   values.city === ""
                            //     ? "Please Choose your City"
                            //     : ""
                            // }
                            // error={values.city === ""}
                          >
                            {cities?.map((city) => {
                              return (
                                <MenuItem
                                  key={city.city_id}
                                  value={city.city_name}
                                >
                                  {city.city_name}
                                </MenuItem>
                              );
                            })}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            sx={{ mr: 0 }}
                            name="area"
                            label="Area"
                            value={values.area}
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            select
                            sx={{ mr: 0 }}
                            name="house"
                            label="House / Gated Communities / Builder Floor"
                            value={values.house}
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={handleChange}
                          >
                            {propertyTypeItems.map((item) => (
                              <MenuItem key={item.code} value={item.code}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            sx={{ mr: 3 }}
                            type="number"
                            name="rooms"
                            label="Number of Rooms"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.rooms}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            sx={{ mr: 3 }}
                            name="min_budget"
                            label="Minimum Budget"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.min_budget}
                            onChange={handleChange}
                            helperText={
                              !ValidateMax_Budget(
                                values.min_budget,
                                values.max_budget
                              )
                                ? "This Should be less than Maximum Budget"
                                : ""
                            }
                            error={
                              !ValidateMax_Budget(
                                values.min_budget,
                                values.max_budget
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            sx={{ mr: 3 }}
                            name="max_budget"
                            label="Maximum Budget"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={values.max_budget}
                            onChange={handleChange}
                            helperText={
                              !ValidateMax_Budget(
                                values.min_budget,
                                values.max_budget
                              )
                                ? "This Should be more than Minimum Budget"
                                : ""
                            }
                            error={
                              !ValidateMax_Budget(
                                values.min_budget,
                                values.max_budget
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        sx={{ flexDirection: { md: "row", xs: "column" } }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { md: "row", xs: "column" },
                            alignItems: "flex-start",
                          }}
                        >
                          <Tooltip title="you can only view properties that are being listed for premium by the owner/agent.">
                            <Button
                              sx={{ my: 2, mx: { md: 2, xs: 0 } }}
                              color="success"
                              variant="contained"
                              type="button"
                              onClick={() => {
                                setFreeSearchClicked(true);
                                if (
                                  ValidateMax_Budget(
                                    values.min_budget,
                                    values.max_budget
                                  ) &&
                                  values.city !== ""
                                ) {
                                  resetpastSavedlist();
                                  resetShortlistlist();
                                  setshowSaveSearch(true);
                                  dispatch(
                                    getSearchedPropertiesAction({
                                      ...values,
                                      city_id: cities
                                        .find(
                                          (city) =>
                                            city.city_name === values.city
                                        )
                                        .city_id.toString(),
                                      search_type: "free",
                                    })
                                  );
                                }
                              }}
                            >
                              Free Search
                            </Button>
                          </Tooltip>
                          <Tooltip title="This will be available soon.">
                            <Button
                              sx={{ my: 2 }}
                              color="success"
                              variant="contained"
                              type="button"
                              onClick={() => {
                                setPremiumSearchClicked(true);
                                if (
                                  ValidateMax_Budget(
                                    values.min_budget,
                                    values.max_budget
                                  ) &&
                                  values.city !== ""
                                ) {
                                  setshowSaveSearch(true);
                                  dispatch(
                                    getSearchedPropertiesAction({
                                      ...values,
                                      city_id: cities
                                        .find(
                                          (city) =>
                                            city.city_name === values.city
                                        )
                                        .city_id.toString(),
                                      search_type: "premium",
                                    })
                                  );
                                }
                              }}
                            >
                              Premium Search
                            </Button>
                          </Tooltip>
                          {(isFreeSearchClicked || isPremiumSearchClicked) &&
                            GET_SEARCHED_PROPERTIES?.isLoading !== true && (
                              <Button
                                sx={{ my: 2, mx: { md: 2, xs: 0 } }}
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  isPremiumSearchClicked && setPremiumSearchClicked(false);
                                  isFreeSearchClicked && setFreeSearchClicked(false)

                                  if (
                                    ValidateMax_Budget(
                                      values.min_budget,
                                      values.max_budget
                                    )
                                  ) {
                                    dispatch(
                                      pastSaveSearchAction({
                                        search_params: {
                                          ...values,
                                          city_id: cities
                                            .find(
                                              (city) =>
                                                city.city_name === values.city
                                            )
                                            .city_id.toString(),
                                        },
                                        listing_ids:
                                          searchedProperties?.listed_properties?.map(
                                            (el) => {
                                              return {
                                                listing_id: el.listing_id,
                                                listing_status:
                                                  el.listing_status_id,
                                              };
                                            }
                                          ),
                                        search_saved: 1,
                                        search_type: 1,
                                        premium_seeker_id: "",
                                      })
                                    );
                                  }
                                }}
                              >
                                Save Search
                              </Button>
                            )}
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          {searchedProperties?.listed_properties?.length >= 0 &&
                            GET_SEARCHED_PROPERTIES?.isLoading !== true && (
                              <span
                                style={{
                                  display: "flex",
                                  "align-items": "center",
                                }}
                              >
                                <b>
                                  Available Properties:{" "}
                                  {
                                    searchedProperties?.listed_properties
                                      ?.length
                                  }
                                </b>
                              </span>
                            )}
                          <Button
                            sx={{
                              my: 2,
                              mx: { md: 2, xs: 0 },
                            }}
                            style={{ backgroundColor: "#ffd166" }}
                            variant="contained"
                            // onClick={() => {
                            //   // let l = {
                            //   //   city_id: "",
                            //   //   city: "",
                            //   //   area: "",
                            //   //   house: "",
                            //   //   rooms: 0,
                            //   //   min_budget: "0",
                            //   //   max_budget: "1",
                            //   // };
                            //   // setInitialValues(l);
                            // }}
                            onClick={handleReset}
                          >
                            Clear
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  )}
                </Formik>
                <Divider sx={{ mb: 4 }} />
                {GET_SEARCHED_PROPERTIES?.isLoading === true ? (
                  <Grid item md={12} sx={{ height: 100 }}>
                    <Loading />
                  </Grid>
                ) : (
                  <>
                    <Grid container spacing={4} display={"flex"}>
                      {searchedProperties?.listed_properties?.map(
                        (item, index) => (
                          <Grid
                            item
                            xs={24}
                            sm={6}
                            md={4}
                            lg={4}
                            xl={3}
                            key={index}
                          >
                            <Card variant="outlined" sx={{ padding: 1 }}>
                              <ImageList sx={{ height: 240 }} cols={1}>
                                <ImageListItem>
                                  <img
                                    src={
                                      item.file_url == ""
                                        ? "http://34.36.127.104/tenantowner/twitter_header_photo_1.png?h=50&fit=crop&auto=format"
                                        : item.file_url
                                    }
                                    alt={"property image"}
                                    loading="lazy"
                                    style={{ width: "100%" }}
                                  />
                                </ImageListItem>
                              </ImageList>
                              <H5 sx={{ my: 1 }}>
                                Rent:{" ₹ "}
                                <span style={{ "font-weight": "700" }}>
                                  {item.rent}
                                </span>
                              </H5>
                              <H5 sx={{ my: 1 }}>
                                Area:{" "}
                                <span style={{ "font-weight": "700" }}>
                                  {item.area}
                                </span>
                              </H5>
                              <H5 sx={{ my: 1 }}>
                                Number of Rooms:{" "}
                                <span
                                  style={{
                                    "font-size": "16px",
                                    "font-weight": "700",
                                  }}
                                >
                                  {item.space_details[0].space_count}
                                </span>
                              </H5>
                              <H5 sx={{ my: 1 }}>
                                Posted On:{" "}
                                <span
                                  style={{
                                    "font-size": "16px",
                                    "font-weight": "700",
                                  }}
                                >
                                  {moment(item?.posted_on).format("DD-MM-YYYY")}
                                </span>
                              </H5>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "end",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    setSelectedImage(
                                      item.file_url == ""
                                        ? "http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
                                        : item.file_url
                                    );
                                    setopencontactinfo(false);
                                    handleClick(item);
                                  }}
                                >
                                  More Info
                                </Button>
                              </Box>
                            </Card>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </>
                )}
              </Box>
            </StyledCard>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchProperties;
