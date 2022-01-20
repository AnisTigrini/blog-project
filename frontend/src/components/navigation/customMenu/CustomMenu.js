import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const CustomMenu = () => {
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
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon sx={{ color: "white" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "600",
            }}
            to="/"
          >
            Posts
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "600",
            }}
            to="/create-post"
          >
            Create Post
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default CustomMenu;
