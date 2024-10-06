import { Button, Card, Grid, Typography } from "@mui/material"

import { useDispatch, useSelector } from "react-redux";

const GenerateBrandResearch = () => {
    const dispatch = useDispatch();

    const { brandSpecific } = useSelector((state) => state)
    const { dummy_data } = useSelector(state => state.brandSpecific)
    console.log(brandSpecific);
    return (
        <>
            <Typography
                variant="h5"
                color="initial"
                my={4}

                textAlign="center"
                sx={{
                    color: "#0c5389",
                    border: "2px solid #0c5389",  // Adds a border around the text
                    padding: "16px",              // Adds padding inside the border
                    width: "90%",                 // Occupies most of the parent width (90%)
                    margin: "50px auto",             // Centers the text block horizontally
                    borderRadius: "8px",          // Optional: Adds rounded corners to the border
                }}
            >
                {dummy_data?.Business_understanding}
            </Typography>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alginItems: "center",
                    padding: 2,
                    maxWidth: 400,
                    margin: "0 auto",
                }}>
                {/* <Typography
                    variant="h5"
                    color="initial"
                    my={4}
                    textAlign="center"
                    sx={{ color: "#0c5389" }}
                >demo text</Typography> */}
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                        // disabled={ADD_NEW_PROPERTY?.isLoading}
                        variant="contained"
                        color="inherit"
                        sx={{
                            margin: "10px"
                        }}
                    // type="submit"
                    // onClick={handleClickOpen}
                    // onClick={() => }
                    >
                        Regenerate
                    </Button>
                    <Button
                        // disabled={ADD_NEW_PROPERTY?.isLoading}
                        variant="contained"
                        color="primary"
                        sx={{
                            margin: "10px"
                        }}
                    // type="submit"
                    // onClick={handleClickOpen}
                    // onClick={() => }
                    >
                        Proceed
                    </Button>
                </Grid>
            </Card>
        </>
    )
}

export default GenerateBrandResearch