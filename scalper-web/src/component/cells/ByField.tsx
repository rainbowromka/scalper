import React, {useState} from "react";
import {Button, ButtonGroup, TableCell, Tooltip} from "@mui/material";
import {
    Application,
    AppStatus,
    TradeSecurity,
    TradeType
} from "../../store/model/Model";
import {
    styleCellDone,
    styleCellOpenPlanned,
    styleCellOpenToOpen,
    styleCellPlanned
} from "./FieldStyles";
import OpenWithIcon from '@mui/icons-material/OpenWith';
import DoneIcon from '@mui/icons-material/Done';
import {right} from "@popperjs/core";
import AppStore from "../../store/AppStore";
import {inject, observer} from "mobx-react";

interface Props {
    tradeSecurity: TradeSecurity;
    row: Application,
    tradeType: TradeType,
}

interface PropsFunc extends Props{
    openApplication: () => void
    openedApplication: () => void
}

interface InjectedProps extends Props {
    store: AppStore;
}

@inject("store")
@observer
export default class ByField extends React.Component<Props, any>
{
    get injected() {
        return this.props as InjectedProps
    }

    openApplication = async () => {
        const { tradeSecurity, row, store } = this.injected;
        await store.changeApplicationStatus(
            tradeSecurity.id, row.id, AppStatus.ToOpen);
    }

    openedApplication = async () => {
        const { tradeSecurity, row, store } = this.injected;
        await store.changeApplicationStatus(
            tradeSecurity.id, row.id, AppStatus.Opened);
    }


    render() {
        const {tradeSecurity, row} = this.injected;

        return (
            <ByFieldFunc
                tradeType={this.props.tradeType}
                tradeSecurity={tradeSecurity}
                row={row}
                openApplication={this.openApplication}
                openedApplication={this.openedApplication}
            />
        )
    }

}

function ByFieldFunc (props: PropsFunc)
{
    const {tradeType, row, tradeSecurity } = props;
    const {accuracy} = tradeSecurity;

    return <Tooltip
        title={
            <ButtonGroup size="small" sx={{backgroundColor: "white"}}>
                { tradeType === TradeType.up && <>
                    <Button onClick={props.openApplication}><OpenWithIcon/></Button>
                    <Button onClick={props.openedApplication}><DoneIcon/></Button>
                </>}
            </ButtonGroup>
        }
        disableHoverListener = {((row.status !== AppStatus.Planned) && (row.status !== AppStatus.ToOpen))}
        placement={right}
    >
        <TableCell
            align="center"
            sx={getByCellColor(tradeType, row)}
        >
            {(row.byFact ? row.byFact : row.byStart).toFixed(accuracy)}
        </TableCell>
    </Tooltip>
}

const getByCellColor = (tradeType: TradeType, row: Application) => {
    if (tradeType === TradeType.up) {
        switch (row.status) {
            case AppStatus.Planned:
                return styleCellOpenPlanned;
            case AppStatus.ToOpen:
                return styleCellOpenToOpen;
            case AppStatus.Opened:
            case AppStatus.ToClose:
            case AppStatus.Closed:
            case AppStatus.Result:
                return styleCellDone;
        }
    }
    if (tradeType === TradeType.down) {
        switch (row.status) {
            case AppStatus.Planned:
            case AppStatus.ToOpen:
                return styleCellPlanned;
            case AppStatus.Opened:
                return styleCellOpenPlanned
            case AppStatus.ToClose:
                return styleCellOpenToOpen;
            case AppStatus.Closed:
            case AppStatus.Result:
                return styleCellDone;
        }
    }
}
