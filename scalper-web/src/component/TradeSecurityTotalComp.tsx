import React, {useEffect, useRef} from "react";
import {
    AppBar,
    Box, Grid, IconButton,
    Toolbar,
    useMediaQuery,
    useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SummaryApplications from "./summaryheader/SummaryApplications";

export default class TradeSecurityTotalComp
extends React.Component<any, any>
{
    render() {
        return (
            <TradeSecurityTotalFunc/>
        );
    }
}

const TradeSecurityTotalFunc = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery('(min-height:600px)')
    const header = useRef<HTMLDivElement>(null);
    const spacer = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        if (header.current && spacer.current) {
            const height = header.current.offsetHeight;
            spacer.current.style.height = `${height}px`;
        }
    }, [isSmallScreen])

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    display: "block",
                    top: 0,
                    transition: 'transform 0.3s ease-in-out',
                }}
            >
                {isSmallScreen && (
                    <Toolbar ref={header}>
                        <Box sx={{flexGrow: 1}}>
                            <Grid container>
                                <SummaryApplications/>
                            </Grid>
                        </Box>
                    </Toolbar>
                )}
            </AppBar>
            { !isSmallScreen && <IconButton
                color="inherit"
                sx={{
                    position: "fixed",
                    top: 10,
                    right: 10,
                    zIndex: theme.zIndex.appBar + 1,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover':{
                        backgroundColor: theme.palette.primary.dark,
                    }
                }}
            >
                <MenuIcon/>
            </IconButton>
            }
            {isSmallScreen && (
                <Toolbar ref={spacer} sx={{display: "block"}}/>
            )}
        </>
    );
}

