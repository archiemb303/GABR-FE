import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

export default function HamburgerMenu(props) {
  const { setshowtab } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <MenuIcon onClick={handleClick} />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            setshowtab(0);
            handleClose();
          }}
        >
          Search
        </MenuItem>
        <MenuItem
          onClick={() => {
            setshowtab(1);
            handleClose();
          }}
        >
          Shortlisted Properties
        </MenuItem>
        <MenuItem
          onClick={() => {
            setshowtab(2);
            handleClose();
          }}
        >
          Past Searches
        </MenuItem>
        <MenuItem
          onClick={() => {
            setshowtab(3);
            handleClose();
          }}
        >
          Contact
        </MenuItem>
        <MenuItem
          onClick={() => {
            setshowtab(4);
            handleClose();
          }}
        >
          Appointment
        </MenuItem>
      </Menu>
    </div>
  );
}
