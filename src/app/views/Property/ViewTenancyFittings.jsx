import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";

import React from "react";
import {
  setAgreementSigningWarningModal,
  setEditTenancyFittingsModal,
  setVideoTutorialModal,
} from "app/redux/actions/ModalActions";
import EditTenancyFittingsModal from "./EditTenancyFittingsModal";
import Loading from "app/components/MatxLoading";
import { InfoOutlined, PlayCircleOutline } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const ViewTenancyFittings = ({ isIntoView }) => {
  const dispatch = useDispatch();
  const { individualProperty } = useSelector((state) => state.property);
  const { ADD_UPDATE_TENANCY_FITTINGS } = useSelector(
    (store) => store.loadingAndError.loader
  );

  const tenancyFittings = individualProperty?.tenancy_details?.tenancy_fittings;

  const { custom } = useTheme();

  return (
    <>
      <EditTenancyFittingsModal individualProperty={individualProperty} />
      <Card
        id="tenancyFittings"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alginItems: "center",
          padding: 2,
          // maxWidth: 400,
          margin: "0 auto",
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">Tenancy Fittings</Typography>

            <Tooltip
              title="Tenancy fittings are the fixtures, fittings, and furniture included in the property being rented."
              arrow
            >
              <IconButton sx={{ padding: 0, ml: 0.5 }}>
                <InfoOutlined
                  sx={{
                    fontSize: "1em",
                    color: custom.c4,
                  }}
                />
              </IconButton>
            </Tooltip>

            <IconButton
              sx={{ padding: 0, ml: 0.5 }}
              onClick={() =>
                dispatch(
                  setVideoTutorialModal({
                    flag: true,
                    tutorialLink: "https://www.youtube.com/embed/l7Mb-UgNNj4",
                  })
                )
              }
            >
              <PlayCircleOutline
                sx={{
                  fontSize: "1em",
                  color: custom.c4,
                }}
              />
            </IconButton>
          </Box>
          {individualProperty?.basic_details?.party_type_name !== "Witness" && (
            <IconButton
              aria-label="edit"
              onClick={() => {
                if (
                  individualProperty?.tenancy_details?.agreement_details?.[0]
                    ?.document_id
                ) {
                  dispatch(setAgreementSigningWarningModal(true));
                } else {
                  dispatch(setEditTenancyFittingsModal(true));
                }
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>

        {ADD_UPDATE_TENANCY_FITTINGS?.isLoading === true ? (
          <Grid sx={{ height: "200px" }}>
            <Loading></Loading>
          </Grid>
        ) : (
          <Grid
            container
            columnSpacing={5}
            rowSpacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
          >
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Ceiling Fans:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[0]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Standy/Table Fan:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[1]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Tubelights - LED:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[2]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Tubelights - CFL:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[3]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Tubelights - Flourescent:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[4]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Light Bulbs - LED:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[5]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Light Bulbs - CFL:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[6]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Light Bulbs - Incandescent:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[7]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Light Bulbs - fancy:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[8]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  AC - 2.5 tons:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[9]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  AC - 2 tons:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[10]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  AC - 1.5 tons:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[11]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Curtains - Doors:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[12]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Curtains - Windows:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[13]?.fitting_count}
                </Typography>
              </Box>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Geysers:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[14]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Solar Water Heater:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[15]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Kitchen Hub/Stove:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[16]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Kitchen Chimney:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[17]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Exhaust Fan - Kitchen:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[18]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" color="GrayText">
                  Exhaust Fan - Bathroom:
                </Typography>
                <Typography variant="body1" color="primary">
                  {tenancyFittings?.[19]?.fitting_count}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Card>
    </>
  );
};

export default ViewTenancyFittings;
