import React from 'react';
import {Box, Grid, Typography} from "@mui/material";

export default function SummaryApplications()
{
    return (
    <>
        <Grid size={1}></Grid>
        <Grid size={9}>
            <Grid container
                  direction="row"
                  sx={{
                      justifyContent: "center",
                      alignItems: "stretch"
                  }}
            >
            <Grid sx={{minWidth: "100px"}}>
                <Typography variant='caption' component='div' style={{flexGrow: 1}}>
                    ID
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    ASTR
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    RUSAL
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    CHMF
                </Typography>
            </Grid>
            <Grid sx={{minWidth: "120px"}}>
                <Typography variant='caption' component='div' style={{flexGrow: 1}}>
                    Имя
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    АстраЛинукс
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    Русал
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    Северсталь
                </Typography>
            </Grid>
            <Grid sx={{minWidth: "120px"}}>
                <Typography variant='caption' component='div' style={{flexGrow: 1}}>
                    Макс, шт.
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    38
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    190
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    31
                </Typography>
            </Grid>
            <Grid sx={{minWidth: "100px"}}>
                <Typography variant='caption' component='div' style={{flexGrow: 1}}>
                    Резерв
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    17952.02
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    6721.09
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    40289.72
                </Typography>
            </Grid>
            <Grid sx={{minWidth: "120px"}}>
                <Typography variant='caption' component='div' style={{flexGrow: 1}}>
                    Доля
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    32740.99(21%)
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    12257.96(8%)
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    73480.67(48%)
                </Typography>
            </Grid>
            <Grid sx={{minWidth: "120px"}}>
                <Typography variant='caption' component='div' style={{flexGrow: 1}}>
                    В хранении, шт.
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    58
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    240
                </Typography>
                <Typography variant='subtitle2' component='div' style={{flexGrow: 1}}>
                    36
                </Typography>
            </Grid>
            </Grid>
        </Grid>
        <Grid size={2}></Grid>
    </>
   )
}