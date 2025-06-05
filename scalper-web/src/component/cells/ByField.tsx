import React from "react";
import {Button, ButtonGroup, TableCell, Tooltip} from "@mui/material";
import {Application, AppStatus, TradeSecurity} from "../../store/model/Model";
import {
    styleCellDone,
    styleCellOpenPlanned,
    styleCellOpenToOpen
} from "./FieldStyles";
import OpenWithIcon from '@mui/icons-material/OpenWith';
import {right} from "@popperjs/core";
import AppStore from "../../store/AppStore";
import {inject, observer} from "mobx-react";

interface Props {
    tradeSecurity: TradeSecurity;
    row: Application,
}

interface PropsFunc extends Props{
    openApplication: () => void
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
        console.log("open application");

        await store.openApplication(tradeSecurity.id, row.id);
    }

    render() {
        const {tradeSecurity, row} = this.injected;

        return (
            <ByFieldFunc
                tradeSecurity={tradeSecurity}
                row={row}
                openApplication={() => this.openApplication()}/>
        )
    }

}

function ByFieldFunc (props: PropsFunc)
{
    const { row, tradeSecurity } = props;
    const {accuracy} = tradeSecurity;

    return <Tooltip
        title={
            <ButtonGroup size="small" sx={{backgroundColor: "white"}}>
                <Button onClick={() => props.openApplication() }><OpenWithIcon/></Button>
            </ButtonGroup>
        }
        placement={right}
    >
        <TableCell
            align="center"
            sx={getByCellColor(row)}
        >
            {(row.byFact ? row.byFact : row.byStart).toFixed(accuracy)}
        </TableCell>
    </Tooltip>
}

const getByCellColor = (row: Application) => {
    switch (row.status)
    {
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
