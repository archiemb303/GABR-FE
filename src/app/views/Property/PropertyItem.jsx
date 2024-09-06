import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, alpha, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualPropertyAction } from "app/redux/actions/PropertyActions";
import { useTheme } from "@emotion/react";
import { propertyStatusItems } from "./items/propertyTypes";
import { propertyCreatorItems } from "./items/propertyTypes";
import { useEffect } from "react";
import { useRef } from "react";
import Loading from "app/components/MatxLoading";
import {
  setInvitationPropertyInfoModal,
  setUpdatePropertyModal,
} from "app/redux/actions/ModalActions";
import { useLocation } from "react-router-dom";
import UpdatePropertyModal from "./UpdatePropertyModal";

const PropertyItem = ({ props, place }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const btnRef = useRef();
  const { UPDATE_PROPERTY_PROFILE_PIC } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const { individualProperty } = useSelector((state) => state.property);
  const routeLocation = useLocation();

  const getPropertyCreatorTheme = () => {
    // find the correct theme for property creator
    let result = "";
    propertyCreatorItems.forEach((item) => {
      if (props?.creator_name == item.name) {
        result = theme.custom[item.class];
        return;
      }
    });
    if (result === "") {
      return theme.custom.c6;
    } else {
      return result;
    }
  };

  const handleModal = async () => {
    dispatch(setUpdatePropertyModal(true));
  };
  const getPropertyStatusTheme = () => {
    // find the correct theme for property status
    let result = "";
    propertyStatusItems.forEach((item) => {
      if (props?.status_name == item.name) {
        result = theme.custom[item.class];
        return;
      }
    });
    if (result === "") {
      return theme.custom.c6;
    } else {
      return result;
    }
  };

  return (
    props.party_status_id !== 2 && (
      <>
        <Button fullWidth>
          <Card
            ref={btnRef}
            onClick={() => {
              if (props.party_status_id === 1 || props.party_status_id === 2) {
                dispatch(setInvitationPropertyInfoModal(true));
              }
              //Nullify previous generatedAgreementDraft
              dispatch({
                type: "GENERATE_AGREEMENT_DRAFT",
                payload: null,
              });
              //Nullify previous getIndividual property
              dispatch({
                type: "GET_INDIVIDUAL_PROPERTY",
                payload: null,
              });
              dispatch(
                getIndividualPropertyAction({
                  property_id: props.property_id,
                })
              );
            }}
            variant="outlined"
            sx={{
              boxShadow: props.isSelected
                ? "5px 5px 10px 0px rgb(178 201 224) !important"
                : "unset",
              position: "relative",
              minHeight: 140,
              height: "200px",
              width: "100%",
            }}
          >
            {individualProperty?.basic_details?.property_id ===
              props.property_id &&
            UPDATE_PROPERTY_PROFILE_PIC?.isLoading === true ? (
              <Grid
                sx={{ height: "100%", width: "100%" }}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Loading></Loading>
              </Grid>
            ) : (
              <Box sx={{}}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    background: "#f9f9f9f9",
                    p: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"left"}
                  >
                    {props?.property_name.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"left"}
                  >
                    {props?.address_line_1}
                  </Typography>

                  <CardMedia
                    component="img"
                    alt="green iguana"
                    sx={{}}
                    image={
                      props?.file_url ||
                      "http://34.36.127.104/tenantowner/twitter_header_photo_1.png"
                    }
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "0px",
                    left: "0px",
                    width: "100%",
                    background: "#f9f9f9f9",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: " wrap",
                    p: 1,
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      backgroundColor: getPropertyCreatorTheme(),
                    })}
                  >
                    {props?.party_type_name || props?.creator_name}
                    {/* {props?.creator_name} */}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      backgroundColor: getPropertyStatusTheme(),
                    })}
                  >
                    {props?.status_name}
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>
        </Button>
      </>
    )
  );
};

export default PropertyItem;
