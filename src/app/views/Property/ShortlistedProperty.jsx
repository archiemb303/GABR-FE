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
  CardMedia,
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
import { H4, H5, Paragraph, Span } from "app/components/Typography";
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
} from "app/redux/actions/PropertyActions";
import { useDispatch } from "react-redux";
import { getAllCitiesAction } from "app/redux/actions/LocationActions";
import Loading from "app/components/MatxLoading";

export default function ShortlistedProperty(props) {
  return (
    <>
      {/* <Grid item xs={24} sm={12} md={12} lg={12}> */}
        
      {/* </Grid> */}
      <Button fullWidth>
                <Card
                onClick={props?.handleClick}
                    // ref={btnRef}
                    // onClick={() => {
                    //     if (props.party_status_id === 1 || props.party_status_id === 2) {
                    //         dispatch(setInvitationPropertyInfoModal(true))
                    //     }
                    //     dispatch(
                    //         getIndividualPropertyAction({
                    //             property_id: props.property_id,
                    //         })
                    //     );
                    // }}
                    variant="outlined"
                    sx={{
                        boxShadow: (props?.item.isSelected)
                            ? '5px 5px 10px 0px rgb(178 201 224) !important'
                            : 'unset',
                        position: 'relative',
                        minHeight: 140,
                        height: '200px',
                        width: '100%',
                    }}
                >
                  <Box sx={{}}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '0px',
                                        left: '0px',
                                        width: '100%',
                                        background: '#f9f9f9f9',
                                        p: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        textAlign={'left'}
                                    >
                                        {props?.item?.property_name.toUpperCase()}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        textAlign={'left'}
                                    >
                                        {props?.item?.address_line_1}
                                    </Typography>


                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        sx={{}}
                                        image={
                                            props?.item?.file_url ||
                                            'http://34.36.127.104/tenantowner/twitter_header_photo_1.png'
                                        }
                                    />



                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: '0px',
                                        left: '0px',
                                        width: '100%',
                                        background: '#f9f9f9f9',

                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        flexWrap: ' wrap',
                                        p: 1,
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={(theme) => ({
                                            color: '#fff',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            // backgroundColor: getPropertyCreatorTheme(),
                                            backgroundColor:theme.custom.c6,
                                        })}
                                    >
                                        {props?.item.city}
                                    </Typography>
                                   
                                    <Typography
                                        variant="body2"
                                        sx={(theme) => ({
                                            color: '#fff',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            backgroundColor:theme.custom.c2,
                                            // backgroundColor: getPropertyStatusTheme(),
                                        })}
                                    >
                                      {/* 150000 */}
                                        Rs.{props?.item?.rent_amount}
                                    </Typography>
                                     
                                </Box>
                            </Box>
                </Card>
                </Button>

    </>
  );
}
