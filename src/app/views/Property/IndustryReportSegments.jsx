//No Reports have been generated yet. Would you like to generate one based on the below understanding of your brand?"
// if there is are no reports display above message and the previous understanding

import React, { useState } from "react";
import { Box, Typography, Button, Container, Grid, Paper, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const segments = [
  {
    id: "requirements",
    title: "Requirements",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "industry-problems",
    title: "Problems faced by the industry",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "solutions",
    title: "Available Solutions",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const IndustryPage = () => {
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [editingSegment, setEditingSegment] = useState(null);
  const [editedContent, setEditedContent] = useState({});
  const [openDialogue, setOpenDialogue] = useState(true);
  const handleAcceptSegment = (id) => {
    if (selectedSegments.includes(id)) {
      setSelectedSegments(selectedSegments.filter((segmentId) => segmentId !== id));
    } else {
      setSelectedSegments([...selectedSegments, id]);
    }
  };

  const handleEditClick = (id) => {
    setEditingSegment(id);
    setEditedContent({}); // Clear the edited content when editing starts
  };

  const handleContentChange = (e, id) => {
    setEditedContent({ ...editedContent, [id]: e.target.value });
  };

  const handleConfirmEdit = (id) => {

    // api call

    // Reset editing segment to null
    setEditingSegment(null);
  };

  const handleFinalizeChanges = () => {
    console.log("Finalized Changes:", selectedSegments);
    alert("Changes finalized. Report generated!");
  };
  if (segments.length === 0) {
    // first of all fetch all reports associated with the brand. i.e fetch_reports with brand_id parameter.
    // if reports not found display this msg.
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h6"
        // sx={{ fontWeight: "bold" }}
        >
          No Reports have been generated yet. Would you like to generate one based on the below understanding of your brand?
        </Typography>
      </Container>
    )
  }
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>

      <Dialog open={openDialogue} onClose={() => setOpenDialogue(false)}>
        <DialogTitle>Confirm Generation</DialogTitle>
        <DialogContent>
          <Typography>
            Shall we generate the detailed industry report?
          </Typography>
          <Typography>
            You will be charged 2 Credit points.
          </Typography>
          <Typography>
            You will be getting:
            <ul>
              <li>Detailed industry report</li>
              <li>100 revisions/edits</li>
            </ul>
            Once the industry report is generated, you can create a presentation too.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogue(false)} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

      {segments.map((segment) => (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }} key={segment.id} id={segment.id}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {segment.title}
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleEditClick(segment.id)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color={selectedSegments.includes(segment.id) ? "success" : "inherit"}
                size="small"
                onClick={() => handleAcceptSegment(segment.id)}
              >
                {selectedSegments.includes(segment.id) ? "Remove Segment" : "Accept This Segment"}
              </Button>

              {selectedSegments.includes(segment.id) && (
                <IconButton>
                  <CheckCircleIcon sx={{ color: "green" }} />
                </IconButton>
              )}
            </Box>
          </Grid>


          <Typography variant="body1" sx={{ mt: 2 }}>
            {segment.content}
          </Typography>


          {editingSegment === segment.id && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={editedContent[segment.id] || ""}
                onChange={(e) => handleContentChange(e, segment.id)}
                placeholder="Enter your edits here"
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleConfirmEdit(segment.id)}
              >
                OK
              </Button>
            </Box>
          )}
        </Paper>
      ))}


      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, pt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFinalizeChanges}
          sx={{ mb: 2 }}
        >
          Finalize Changes and Generate Report
        </Button>
      </Box>
    </Container>
  );
};

export default IndustryPage;
