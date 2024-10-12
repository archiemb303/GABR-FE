import { Button, Card, Grid, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const GenerateBrandResearch = ({ setBrandDetails, setGenerating, setDisplayMenu }) => {
    const dispatch = useDispatch();

    const { brandSpecific } = useSelector((state) => state);
    const { message } = useSelector(state => state.brandSpecific);
    console.log(brandSpecific);

    const [openRegenerate, setOpenRegenerate] = useState(false); // State to manage regenerate text box
    const [openConfirm, setOpenConfirm] = useState(false); // State to manage confirmation dialog
    const [newUnderstanding, setNewUnderstanding] = useState(""); // State for new business understanding

    const handleRegenerateClick = () => {
        setOpenRegenerate(true); // Show the regenerate input box
    };

    const handleProceedClick = () => {
        setOpenConfirm(true); // Open the confirmation dialog
    };

    const handleOkClick = () => {
        // Here you can dispatch an action to update the state with the new understanding if needed
        console.log("New Business Understanding:", newUnderstanding);
        setOpenRegenerate(false); // Close the regenerate input box
    };

    const handleConfirmProceed = () => {
        // Close the confirmation dialog
        setOpenConfirm(false);
        // Proceed to set brand details and display menu
        setGenerating(false);
        setBrandDetails(true);
        setDisplayMenu(true);
    };

    return (
        <>
            <Typography
                variant="h5"
                color="initial"
                my={4}
                textAlign="center"
                sx={{
                    color: "#0c5389",
                    border: "2px solid #0c5389",
                    padding: "16px",
                    width: "90%",
                    margin: "50px auto",
                    borderRadius: "8px",
                }}
            >
                {message?.brand_understanding}
            </Typography>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                    maxWidth: 400,
                    margin: "0 auto",
                }}
            >
                <Grid item xs={12} display="flex" justifyContent="center">
                    {/* Render buttons only if the regenerate input box is not open */}
                    {!openRegenerate && (
                        <>
                            <Button
                                variant="contained"
                                color="inherit"
                                sx={{
                                    margin: "10px"
                                }}
                                onClick={handleRegenerateClick} // Show regenerate text box
                            >
                                Regenerate
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    margin: "10px"
                                }}
                                onClick={handleConfirmProceed} // Open confirmation dialog on click
                            >
                                Proceed
                            </Button>
                        </>
                    )}
                </Grid>
            </Card>

            {/* Regenerate Text Box */}
            {openRegenerate && (
                <Card sx={{ maxWidth: 400, margin: "20px auto", padding: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Business Understanding"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newUnderstanding}
                        onChange={(e) => setNewUnderstanding(e.target.value)} // Update state on input change
                    />
                    <Button
                        onClick={handleOkClick}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        OK
                    </Button>
                </Card>
            )}

            {/* Confirmation Dialog */}
            
        </>
    );
};

export default GenerateBrandResearch;




// onClick={() => {
                            
//     setGenerating(false)
//     setBrandDetails(true);
//     setDisplayMenu(true);
// }}