import { Button, TextField } from "@mui/material";
import React from "react";

interface ToolbarProps {
  onSearch: (keyword: string) => void;
  onSort: () => void; // thêm prop sắp xếp
  isShow: (key: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSearch, onSort, isShow }) => {
  const [keyword, setKeyword] = React.useState("");

  const handleClick = () => {
    isShow("ON");
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="flex justify-between mb-4">
      <Button variant="contained" color="primary" onClick={handleClick}>
        Thêm mới sinh viên
      </Button>
      <div className="flex gap-2">
        <TextField
          size="small"
          placeholder="Search Here"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Tìm kiếm
        </Button>
        <Button variant="outlined" onClick={onSort}>
          Sắp xếp
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
