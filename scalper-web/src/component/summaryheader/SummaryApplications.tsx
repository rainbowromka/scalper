import React from 'react';
import {Box, Grid, Paper, Typography} from "@mui/material";
import {
    AccountBalanceWallet as WalletIcon,
    AttachMoney as MoneyIcon, Lock as LockIcon,
    ShowChart as ChartIcon, Sync as SyncIcon,
    TrendingDown as TrendDownIcon,
    TrendingUp as TrendUpIcon
} from "@mui/icons-material";
import AppStore from "../../store/AppStore";
import {inject, observer} from "mobx-react";
import {SummaryCurrency} from "../../store/model/Model";

interface Props {
}

interface InjectedProps extends Props {
    store: AppStore;
}


@inject("store")
@observer
export default class SummaryApplications extends React.Component<Props, any>
{
    get injected() {
        return this.props as InjectedProps;
    }

    render() {
        const { store } = this.injected;
        const { summaryCurrency } = store;

        return (
            <SummaryApplicationsFunc summaryCurrency={summaryCurrency}/>
        );
    }
}

interface FuncProps {
    summaryCurrency: SummaryCurrency;
}

const TradePaper = (props: {title: string, value?: string, customIcon: any, color: any}) =>
{
    return (
        <Paper sx={{ p: 1 }}>
            <Box display="flex" alignItems="center" gap={0.5}>
                {props.customIcon}
                <Typography sx={{lineHeight: 1.2, fontSize: "0.75rem"}} variant="subtitle1">{props.title}</Typography>
            </Box>
            <Typography
                sx={{lineHeight: 1.2, fontSize: "0.9rem"}}
                variant="h6"
                color={props.color}
            >
                {props.value}
            </Typography>
        </Paper>
    )
}


const SummaryApplicationsFunc = (props: FuncProps) =>
{
    const {summaryCurrency} = props;
    const {
        foundsInvested, valueAllAssets, reserved, balanceOfFounds, freeCurrency,
        lastChange
    } = summaryCurrency;

    const profitability = ((valueAllAssets && foundsInvested)
        ? valueAllAssets - foundsInvested
        : 0
    );

    const profitabilityPer = foundsInvested
        ? Math.round(profitability / foundsInvested * 100) : 0;

    return (
    <>
        <Grid size={2}>
            <Grid container>
                <Grid size={{xs: 6, sm:6, md:6}}>
                    <TradePaper
                        title="Вложено средств"
                        customIcon={<MoneyIcon color="primary" fontSize="small" />}
                        value={foundsInvested?.toLocaleString("ru-Ru", {minimumFractionDigits:2,}) + " ₽"}
                        color={"black"}
                    />
                </Grid>
                <Grid size={{xs: 6, sm:6, md:6}}>
                    <TradePaper
                        title="Стоимость активов"
                        customIcon={<ChartIcon color="success" fontSize="small" />}
                        value={valueAllAssets?.toLocaleString("ru-Ru", {minimumFractionDigits:2,}) + " ₽"}
                        color={profitability >= 0 ? "success.main" : "error.main"}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <TradePaper
                        title={"Доходность"}
                        customIcon={profitability >= 0 ? <TrendUpIcon color="success" /> : <TrendDownIcon color="error" />}
                        value={profitability.toLocaleString("ru-Ru", {minimumFractionDigits: 2}) + " ₽(" + profitabilityPer + "%)"}
                        color={profitability >= 0 ? "success.main" : "error.main"}
                    />
                </Grid>
            </Grid>
        </Grid>
        <Grid size={8}>
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
        <Grid size={2}>
            <Grid container>
                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <TradePaper
                        title="Зарезервировано"
                        customIcon={<LockIcon color="info" fontSize="small" />}
                        value={reserved?.toLocaleString("ru-Ru", {minimumFractionDigits:2,}) + " ₽"}
                        color={"black"}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <TradePaper
                        title="Остаток"
                        customIcon={<WalletIcon color="info" fontSize="small" />}
                        value={balanceOfFounds?.toLocaleString("ru-Ru", {minimumFractionDigits:2,}) + " ₽"}
                        color={"black"}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <TradePaper
                        title="Свободные"
                        customIcon={<WalletIcon color="info" fontSize="small" />}
                        value={freeCurrency?.toLocaleString("ru-Ru", {minimumFractionDigits:2,}) + " ₽"}
                        color={"black"}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <TradePaper
                        title="Изменения"
                        customIcon={<SyncIcon color="info" fontSize="small" />}
                        value={lastChange?.toLocaleString("ru-Ru", {minimumFractionDigits:2,}) + " ₽"}
                        color={lastChange >= 0 ? "success.main" : "error.main"}
                    />
                </Grid>
            </Grid>

        </Grid>
    </>
   )
}