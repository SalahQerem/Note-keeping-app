import { AppBar, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./computedstyles.js";

const Navbar = () => {
  let [query, setQuery] = useState("");
  const handleSearch = (e) => {
    const title = e.target.value;
    setQuery(title);
    fetchTodos(page, limit, title);
  };

  return (
    <AppBar position="static">
      <Toolbar className="flex items-center gap-8">
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          My Note Keeper
        </Typography>
        <Search
          className="bg-[rgba(0,0,0,0.05)] flex-grow max-w-[600px]"
          onChange={handleSearch}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
