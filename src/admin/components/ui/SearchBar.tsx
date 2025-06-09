"use client"
import { useState } from "react";
import { Box, IconButton, InputBase, styled, alpha } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  transition: theme.transitions.create(["max-width", "opacity"], {
    duration: theme.transitions.duration.short,
  }),
  width: "auto",
  minWidth: "40px",
  maxWidth: "40px",
  overflow: "hidden",
  flexGrow: 1,
  "&.active": {
    maxWidth: "200px",
    paddingLeft: theme.spacing(1),
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
  },
}));

interface SearchBarProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

export const SearchBar = ({searchValue, setSearchValue, id}: SearchBarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box display="flex" alignItems="center">
      <SearchContainer className={open ? "active" : ""}>
        {open && (
          <StyledInputBase
            id={id}
            name={id}
            autoFocus
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            onBlur={() => setOpen(false)}
          />
        )}
        <IconButton onClick={() => setOpen(!open)}>
          <SearchOutlined />
        </IconButton>
      </SearchContainer>
    </Box>
  );
};
