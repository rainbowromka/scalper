import * as React from 'react';
import AppStore from "../store/AppStore";
import {inject, observer} from "mobx-react";
import TradeSecurityComp from "../component/TradeSecurityComp";
import TradeSecurityTotalComp from "../component/TradeSecurityTotalComp";
import {Box} from "@mui/material";

interface Props {
}

interface InjectedProps extends Props {
    store: AppStore;
}

interface State {
}

@inject("store")
@observer
export default class AppScreen extends React.Component<Props, State>
{
    get injected() {
        return this.props as InjectedProps
    }

    readTradeInfoWithBlocking = async () => {
        const { store } = this.injected;

        try {
            store.BlockUI();
            await store.loadTradeInfo();
        }
        finally {
            store.UnblockUI();
        }
    }

    componentDidMount() {
        this.readTradeInfoWithBlocking();
    }

    render() {
        return <Box sx={{flexGrow: 1}}>
            <TradeSecurityTotalComp/>
            <TradeSecurityComp/>
        </Box>
    }
}