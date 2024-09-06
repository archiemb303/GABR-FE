import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Link,
  Typography,
  TableHead,
  TableContainer,
  Table,
  Box,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  fetchMyInvitationsAction,
  getIndividualPropertyAction,
} from "app/redux/actions/PropertyActions";
import { useEffect, useRef } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import InvitationPropertyInfo from "./InvitationPropertyInfo";
import { setInvitationPropertyInfoModal } from "app/redux/actions/ModalActions";
import Paper from "@mui/material/Paper";
import InvitationButton from "./InvitationButton";
import Loading from "app/components/MatxLoading";

const MyInvitations = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const { fetchMyInvitations, individualProperty } = useSelector(
    (store) => store.property
  );
  const user = JSON.parse(localStorage.getItem("persistentState"));
  const { FETCH_MY_INVITATIONS } = useSelector(
    (store) => store.loadingAndError.loader
  );

  const handleIndividualProperty = (propertyId, index) => {
    dispatch(
      getIndividualPropertyAction({
        property_id: propertyId,
      })
    );
    dispatch(setInvitationPropertyInfoModal(true));
  };

  useEffect(() => {
    dispatch(fetchMyInvitationsAction({}));
  }, []);

  return (
    <>
      <InvitationPropertyInfo />
      {FETCH_MY_INVITATIONS?.isLoading === true ? (
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
      ) : (
        <Box
          sx={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card sx={{ width: matches ? "80vw" : "100vw" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={"30%"}>
                      Property Name
                    </TableCell>
                    <TableCell align="center" width={"25%"}>
                      Property Type
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      Inviting Party
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      Invitation Date
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fetchMyInvitations?.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {/* {row.property_name} */}
                        {row?.status_id === 1 || row?.status_id === 4 ? (
                          <Link
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              handleIndividualProperty(row.property_id_id)
                            }
                          >
                            {row.property_name}
                          </Link>
                        ) : (
                          row.property_name
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row?.property_type_name}
                      </TableCell>
                      <TableCell align="center">
                        {row?.sender_fname + " " + row?.sender_lname}
                      </TableCell>
                      <TableCell align="center">
                        {row?.last_modified_date.substring(0, 10)}
                      </TableCell>
                      <TableCell align="center">
                        <InvitationButton propertyInvitation={row} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      )}
    </>
  );
};

export default MyInvitations;
