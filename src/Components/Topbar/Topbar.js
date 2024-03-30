// Topbar component
import React from "react";
import { IconButton, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function Topbar({ toggleDarkMode, colors }) {
    return (
        <div className="topbar" style={{ backgroundColor: colors.backgroundColor, color: colors.textColor }}>
            <div className="topbar-row row flex align-items-center w-150" style={{ padding: "10px" }}>
                <div className="col-2 logo">
                    <a href="#" style={{ textDecoration: "none", fontWeight: "bold" }}>Education.</a>
                </div>
                <div className="col-7 search-form">
                    <form className="d-flex align-items-center">
                        <InputBase type="text" className="form-control bg-light" placeholder="Search courses..." style={{ marginRight: "10px" }} />
                        <IconButton type="submit">
                            <SearchIcon  style={{color: colors.textColor}} />
                        </IconButton>
                    </form>
                </div>
                <div className="col-3 icons d-flex justify-content-between">
                  
                    <div className="icon">
                        <IconButton>
                            <MenuIcon style={{color: colors.textColor}} />
                        </IconButton>
                    </div>
                  
                    <div className="icon">
                        <IconButton>
                            <AccountCircleIcon style={{color: colors.textColor}} />
                        </IconButton>
                    </div>
                    <div className="icon">
                        <IconButton onClick={toggleDarkMode} >
                            <WbSunnyIcon style={{color: colors.textColor}} />
                        </IconButton>
                    </div>
                </div>
            </div>
            {/* Adding a line at the bottom */}
            <div style={{ borderTop: "1px solid #ccc", margin: "0 50px" }}></div>
        </div>
    );
}

export default Topbar;
