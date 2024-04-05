import React from "react";
import { Container, Typography, Link } from '@mui/material';

function Footer({ colors }) {
    return (
        <footer style={{ background: colors.footerBackgroundColor, color: colors.footerTextColor, padding: "20px", marginTop: "auto" }}>
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    &copy; {new Date().getFullYear()} by <Link color="inherit" href="#">Grupi Lab 1 Ubt</Link> | all rights reserved!
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;
