import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from "react";
import { UIContext } from "../../context/ui";
import NextLink from "next/link";

export const Navbar = () => {

    const { openSideMenu } = useContext(UIContext);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    onClick={openSideMenu}
                >
                    <MenuOutlinedIcon />
                </IconButton>

                <NextLink href="/" passHref>
                    <Typography variant="h6" color="white" >OpenJira</Typography>
                </NextLink>
            </Toolbar>
        </AppBar>
    )
}
