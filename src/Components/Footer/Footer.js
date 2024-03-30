// Footer component
import React from "react";

function Footer({ colors }) {
    return (
        <footer className="footer" style={{ background: colors.footerBackgroundColor, color: colors.footerTextColor, padding: "20px" }}>
            &copy; copyright @ 2022 by <span>mr. web designer</span> | all rights reserved!
        </footer>
    );
}

export default Footer;
