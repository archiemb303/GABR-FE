import React from "react";
import ShortlistedProperty from "../ShortlistedProperty";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Loading from "app/components/MatxLoading";

const ShortlistedProperties = (props) => {
  const {
    shortlistedPropertieslist,
    resetpastSavedlist,
    setshortlistedPropertieslist,
    setSelectedImage,
    openProperty,
  } = props;
  const { SHORTLISTED_PROPERTIES } = useSelector(
    (store) => store.loadingAndError.loader
  );
  return (
    <>
      {SHORTLISTED_PROPERTIES?.isLoading === true ? (
        <>
          <Box sx={{ mt: 2, p: 10 }}>
            <Loading />
          </Box>
        </>
      ) : (
        <Grid container spacing={2} paddingTop={6}>
          {shortlistedPropertieslist?.map((item, index) => {
            return (
              <Grid item md={4} xs={12}>
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
                  // setopenChatBox={setopenChatBox}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default ShortlistedProperties;
