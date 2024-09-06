import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Divider,
  Fab,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import AppChat from "../chat-box/AppChat";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import { useRef } from "react";
import { makeStyles } from "@mui/styles";
import { themeColors } from "app/components/MatxTheme/themeColors";
import { Container } from "@mui/system";
import JoditEditor from "jodit-react";
import { RefreshOutlined, Send } from "@mui/icons-material";
import {
  getTenancyCommunicationAction,
  sendTenancyCommunicationAction,
} from "app/redux/actions/PropertyActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
    },
  },
}));

const Communications = ({ isIntoView }) => {
  const tenancyPartyIdRef = useRef();
  const { individualProperty } = useSelector((state) => state.property);
  const dispatch = useDispatch();

  const { getTenancyCommunicationsLoading } = useSelector(
    (store) => store.loadingAndError
  );

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const user = JSON.parse(localStorage.getItem("persistentState"));

  const { customTheme } = themeColors;

  const isFirstRender = useRef(true);

  const classes = useStyles();

  const agreementFlag =
    individualProperty?.tenancy_details?.agreement_details?.length > 0;

  tenancyPartyIdRef.current =
    individualProperty?.tenancy_details?.party_details?.filter(
      (party) => party?.party_profile_id === user?.userProfileId
    )?.[0]?.tenancy_party_id;

  const lastChatRef = useRef(null);

  const sendMessage = () => {
    if (individualProperty?.tenancy_details?.party_details !== null) {
      dispatch(
        sendTenancyCommunicationAction({
          property_id: individualProperty?.basic_details?.property_id,
          tenancy_party_id: tenancyPartyIdRef?.current,
          message: content,
          attachments: [],
        })
      );
    }
    setContent("");
  };

  const handleRefresh = () => {
    if (individualProperty?.tenancy_details?.party_details !== null) {
      dispatch(
        getTenancyCommunicationAction({
          property_id: individualProperty?.basic_details?.property_id,
          tenancy_party_id: tenancyPartyIdRef?.current,
        })
      );
    }
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      lastChatRef?.current?.scrollIntoView({
        smooth: true,
        block: "nearest",
      });
    }
    isFirstRender.current = false;
  }, [individualProperty?.tenancy_details?.communications]);

  return (
    <Box position="relative">
      <Box
        sx={{
          display: true ? "none" : "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 2,
        }}
      />
      <Card
        id="communications"
        sx={{
          filter: true ? "unset" : "blur(2.5px) grayscale(60%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alginItems: "center",
          padding: 2,
          margin: "0 auto",
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography marginRight={1} variant="h5">
            Communications
          </Typography>
          <Typography
            onClick={() => handleRefresh()}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "#000000c2",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              backgroundColor: "#1976d21a",
            }}
          >
            <RefreshOutlined
              onClick={() => handleRefresh()}
              sx={{ cursor: "pointer", fontSize: "12px" }}
            ></RefreshOutlined>
            Refresh
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
            className={classes.root}
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
            {individualProperty?.tenancy_details?.communications?.map(
              (communication, i) => {
                return (
                  <Grid
                    ref={i === communication.length - 1 ? lastChatRef : null}
                    marginY={1}
                    container
                    direction={
                      communication.tenancy_party_id_id ===
                      tenancyPartyIdRef?.current
                        ? "row-reverse"
                        : "row"
                    }
                  >
                    <Box
                      maxWidth={300}
                      borderRadius="15px"
                      sx={
                        communication.tenancy_party_id_id ===
                        tenancyPartyIdRef?.current
                          ? {
                              borderTopRightRadius: "0px",
                            }
                          : {
                              borderTopLeftRadius: "0px",
                            }
                      }
                      bgcolor={
                        communication.tenancy_party_id_id ===
                        tenancyPartyIdRef?.current
                          ? "#1976d21a"
                          : "#80808014"
                      }
                      paddingX={3}
                      paddingY={1}
                    >
                      <Typography fontSize={12} color="primary" variant="body1">
                        {communication.first_name}{" "}
                        <span>~{communication.party_type_name}</span>
                      </Typography>
                      <div
                        style={{
                          fontSize: "13px",
                          padding: "0px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: communication.message,
                        }}
                      ></div>
                      <Typography
                        fontSize={10}
                        color="GrayText"
                        textAlign="right"
                        variant="body1"
                      >
                        {moment(communication.added_date).format("lll")}
                      </Typography>
                    </Box>
                  </Grid>
                );
              }
            )}
          </Grid>
          <Divider sx={{ marginBottom: "10px" }}></Divider>
          <Grid container justifyContent="center" marginBottom={1}>
            <Typography
              onClick={() => handleRefresh()}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#000000c2",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                backgroundColor: "#1976d21a",
              }}
            >
              <RefreshOutlined
                onClick={() => handleRefresh()}
                sx={{ cursor: "pointer", fontSize: "12px" }}
              ></RefreshOutlined>
              Refresh
            </Typography>
          </Grid>
          <Box marginX={2}>
            <JoditEditor
              ref={editor}
              value={content}
              // config={{readOnly: false}}
              config={{
                readonly: false,
                placeholder: "Start typing...",
              }}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
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
              onClick={() => sendMessage()}
              variant="contained"
              endIcon={<Send />}
            >
              Send
            </Button>
          </Grid>
        </Card>
      </Card>
    </Box>
  );
};

export default Communications;
