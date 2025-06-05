import React from "react";
import {Box, Grid, Paper, Typography} from "@mui/material";
import {
    AttachMoney as MoneyIcon,
    ShowChart as ChartIcon,
    TrendingUp as TrendUpIcon,
    TrendingDown as TrendDownIcon,
    Lock as LockIcon,
    AccountBalanceWallet as WalletIcon,
    Payments as PaymentsIcon,
    Sync as SyncIcon,
} from "@mui/icons-material"

export default function SummaryResources()
{
    const profit = 1;

    return (
        <Grid size={12}>
            <Grid container>
                <Grid size={{xs: 6, sm:6, md:6}}>
                    <Paper sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <MoneyIcon color="primary" fontSize="small" />
                            <Typography sx={{lineHeight: 1.2, fontSize: "0.75rem"}} variant="subtitle1">Вложено средств</Typography>
                        </Box>
                        <Typography sx={{lineHeight: 1.2, fontSize: "1rem"}} variant="h6">150 000 ₽</Typography>
                    </Paper>
                </Grid>
                <Grid size={{xs: 6, sm:6, md:6}}>
                    <Paper sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <ChartIcon color="success" fontSize="small" />
                            <Typography sx={{lineHeight: 1.2, fontSize: "0.75rem"}} variant="subtitle1">Стоимость активов</Typography>
                        </Box>
                        <Typography sx={{lineHeight: 1.2, fontSize: "1rem"}} variant="h6" color={profit >= 0 ? "success.main" : "error.main"}>
                            140 000 ₽ (10)%
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <Paper sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            {profit >= 0 ? <TrendUpIcon color="success" /> : <TrendDownIcon color="error" />}
                            <Typography sx={{lineHeight: 1.2, fontSize: "0.75rem"}} variant="subtitle1">Доходность</Typography>
                        </Box>
                        <Typography sx={{lineHeight: 1.2, fontSize: "1rem"}} variant="h6" color={profit >= 0 ? "success.main" : "error.main"}>
                            {profit >= 0 ? "+" : ""}{profit.toLocaleString()} ₽
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container>
                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <Paper sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <LockIcon color="info" fontSize="small" />
                            <Typography sx={{lineHeight: 1.2, fontSize: "0.75rem"}} variant="subtitle1">Зарезервировано</Typography>
                        </Box>
                        <Typography variant="subtitle1">45 200 ₽</Typography>
                    </Paper>
                </Grid>

                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <Paper sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <WalletIcon color="info" fontSize="small" />
                            <Typography sx={{lineHeight: 1.2, fontSize: "0.75rem"}} variant="subtitle1">Фактический остаток</Typography>
                        </Box>
                        <Typography variant="subtitle1">78 500 ₽</Typography>
                    </Paper>
                </Grid>

                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <Paper sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <PaymentsIcon color="info" fontSize="small" />
                            <Typography sx={{lineHeight: 1.2, fontSize: "0.75rem"}} variant="subtitle1">Свободные средства</Typography>
                        </Box>
                        <Typography variant="subtitle1">33 300 ₽</Typography>
                    </Paper>
                </Grid>

                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <Paper sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <SyncIcon color="info" fontSize="small" />
                            <Typography sx={{lineHeight: 1.2, fontSize: "0.75rem"}} variant="subtitle1">Изменение</Typography>
                        </Box>
                        <Typography variant="subtitle1" color="success.main">
                            +2 100 ₽ (↑6.7%)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>

);
}