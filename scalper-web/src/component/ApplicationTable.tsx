import * as React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import styles from "./ApplicationTable.module.css";
import {
    Application,
    AppStatus,
    TradeSecurity,
    TradeType
} from "../store/model/Model";
import ByField from "./cells/ByField";
import {
    styleCellDone,
    styleCellOpenPlanned,
    styleCellOpenToOpen,
    styleCellPlanned,
    styleCellShowPlaned
} from "./cells/FieldStyles";

interface Props
{
    tradeType: TradeType;
    tradeSecurity: TradeSecurity;
    applicationsRows: Application[];//Trades | null;
}

export default function ApplicationTable(props: Props)
{
    const {tradeType, applicationsRows, tradeSecurity } = props;
    const {accuracy, accuracyCurrency} = tradeSecurity;

    const rows = applicationsRows.map((row) => (
        <TableRow key={row.order} className={getRowColor(tradeType, row)}>
            <TableCell sx={getOrderColor(row)}>
                {row.order}
            </TableCell>
            <ByField tradeSecurity={tradeSecurity} row={row} tradeType={tradeType}/>
            <TableCell align="center" sx={getPlannedColor(row)}>
                {row.byPlanned.toFixed(accuracy)}
            </TableCell>
            <TableCell align="center" sx={getVolumeColor(row)}>
                {row.volume}
            </TableCell>
            <TableCell align="center" sx={getVolumeColor(row)}>
                {row.diff.toFixed(accuracy)}
            </TableCell>
            <TableCell align="center" sx={getVolumeColor(row)}>
                {row.precisionForSchedule}
            </TableCell>
            <TableCell align="center" sx={getPlannedColor(row)}>
                {row.shellPlanned.toFixed(accuracy)}
            </TableCell>
            <TableCell align="center" sx={getCloseColor(tradeType, row)}>
                {(row.shellFact ? row.shellFact : row.shellStart).toFixed(accuracy)}
            </TableCell>
            <TableCell align="center" sx={getResultColor(row)}>
                {row.compensation?.toFixed(accuracyCurrency)}
            </TableCell>
            <TableCell align="center" sx={getResultColor(row)}>
                {row.profit.toFixed(accuracyCurrency)}
            </TableCell>
            <TableCell align="center" sx={getResultColor(row)}>
                {row.profitCompensation.toFixed(accuracyCurrency)}
            </TableCell>
            <TableCell align="center" sx={getResultColor(row)}>
                {row.comment}
            </TableCell>
        </TableRow>
    ));

    return (
        <TableContainer component={Paper}>
            <Table sx = {{minWidth: 650}} size="small" aria-label="Application table">
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell align="left">Покупка</TableCell>
                        <TableCell align="left">План</TableCell>
                        <TableCell align="left">Объем</TableCell>
                        <TableCell align="left">Разница</TableCell>
                        <TableCell align="left">Шаг</TableCell>
                        <TableCell align="left">План</TableCell>
                        <TableCell align="left">Продажа</TableCell>
                        <TableCell align="left">Комп.</TableCell>
                        <TableCell align="left">Прибыль</TableCell>
                        <TableCell align="left">Комп.</TableCell>
                        <TableCell align="left">Комментарии</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const getRowColor = (type: TradeType, row: Application) => {
    switch (row.status)
    {
        case AppStatus.Planned:
            return styles.cellPlaned;
        case AppStatus.ToOpen:
        case AppStatus.Opened:
        case AppStatus.ToClose:
        case AppStatus.Closed:
        case AppStatus.Result:
            return styles.cellDone;
    }
}

const getOrderColor = (row: Application) => {
    switch (row.status)
    {
        case AppStatus.Planned:
        case AppStatus.ToOpen:
        case AppStatus.Opened:
        case AppStatus.ToClose:
        case AppStatus.Closed:
        case AppStatus.Result:
            return styleCellDone;
    }
}

const getPlannedColor = (row: Application) => {
    switch (row.status)
    {
        case AppStatus.Planned:
        case AppStatus.ToOpen:
        case AppStatus.Opened:
        case AppStatus.ToClose:
            return styleCellShowPlaned;
        case AppStatus.Closed:
        case AppStatus.Result:
            return styleCellDone;
    }
}

const getVolumeColor = (row: Application) => {
    switch (row.status)
    {
        case AppStatus.Planned:
        case AppStatus.ToOpen:
            return styleCellPlanned;
        case AppStatus.Opened:
        case AppStatus.ToClose:
        case AppStatus.Closed:
        case AppStatus.Result:
            return styleCellDone;
    }
}

const getCloseColor = (type: TradeType, row: Application) => {
    if (type === TradeType.up) {
        switch (row.status) {
            case AppStatus.Planned:
            case AppStatus.ToOpen:
                return styleCellPlanned;
            case AppStatus.Opened:
                return styleCellOpenPlanned;
            case AppStatus.ToClose:
                return styleCellOpenToOpen;
            case AppStatus.Closed:
            case AppStatus.Result:
                return styleCellDone;
        }
    }
    if (type === TradeType.down) {
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
}

const getResultColor = (row: Application) => {
    switch (row.status)
    {
        case AppStatus.Planned:
        case AppStatus.ToOpen:
        case AppStatus.Opened:
        case AppStatus.ToClose:
            return styleCellPlanned;
        case AppStatus.Closed:
            return styleCellOpenPlanned;
        case AppStatus.Result:
            return styleCellDone;
    }
}

