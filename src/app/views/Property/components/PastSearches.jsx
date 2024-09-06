import { Close } from "@mui/icons-material";
import { Box, Card, Grid, IconButton } from "@mui/material";
import Loading from "app/components/MatxLoading";
import { Paragraph } from "app/components/Typography";
import {
  getSearchedPropertiesAction,
  removeSavedSearchesAction,
} from "app/redux/actions/PropertyActions";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PastSearches = (props) => {
  const {
    pastSavedSearcheslist,
    resetShortlistlist,
    setpastSavedSearcheslist,
    setInitialValues,
    setshowtab,
  } = props;
  const dispatch = useDispatch();
  const { PAST_SAVE_SEARCHES } = useSelector(
    (store) => store.loadingAndError.loader
  );
  return (
    <>
      {PAST_SAVE_SEARCHES?.isLoading === true ? (
        <>
          <Box sx={{ mt: 2, p: 10 }}>
            <Loading />
          </Box>
        </>
      ) : (
        <Grid container spacing={2} paddingTop={6}>
          {pastSavedSearcheslist?.map((item, index) => {
            return (
              <Grid item xs={12} sm={12} md={4} lg={4} mb={4}>
                <Card
                  variant="outlined"
                  sx={{
                    padding: 1,
                    width: "100%",
                    boxShadow: item?.isSelected
                      ? "5px 5px 10px 0px rgb(178 201 224) !important"
                      : "unset",
                  }}
                >
                  <Box display="flex" justifyContent={"flex-end"}>
                    <IconButton
                      onClick={() =>
                        dispatch(
                          removeSavedSearchesAction({
                            search_id: item.search_id,
                          })
                        )
                      }
                    >
                      <Close />
                    </IconButton>
                  </Box>
                  <Paragraph
                    onClick={() => {
                      setshowtab(0);
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
                          min_budget: item?.search_params?.min_budget,
                          max_budget: item?.search_params?.max_budget,
                          locality: "",
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
                        <b>{moment(item.added_date).format("DD-MM-YYYY")}</b>
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
                        Min Budget: <b>{item.search_params.min_budget}</b>
                        <br />
                      </Box>
                    )}
                    {item.search_params.max_budget && (
                      <Box>
                        Max Budget: <b>{item.search_params.max_budget}</b>
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
                        No. of Properties: <b>{item.listing_ids.length}</b>
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
        </Grid>
      )}
    </>
  );
};

export default PastSearches;
