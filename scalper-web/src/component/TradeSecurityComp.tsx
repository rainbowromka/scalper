import React from "react";
import AppStore from "../store/AppStore";
import {inject, observer} from "mobx-react";
import TradeSecurityFunc from "./TradeSecurityFunc";


interface Props {
}

interface InjectedProps extends Props {
    store: AppStore;
}

interface State {
}

@inject("store")
@observer
export default class TradeSecurityComp extends React.Component<Props, State>
{
    get injected() {
        return this.props as InjectedProps
    }

    render() {
        const { store } = this.injected;
        const tradeInfo = store.tradeInfo ? store.tradeInfo : []

        return <TradeSecurityFunc
            addUpApplicationPlanned={store.addUpApplicationPlanned}
            tradesSecurity={tradeInfo}
            increaseMaxVolumes={store.increaseMaxVolumes}
        />;
    }
}