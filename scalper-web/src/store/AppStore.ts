import {action, makeObservable, observable} from 'mobx';
import {
    Application,
    AppStatus,
    SummaryCurrency,
    Trades,
    TradeSecurity
} from "./model/Model";
import getAllTrades from "../services/TradeInfoService";
import getSummaryCurrency from "../services/SummaryCurrencyService";

export default class AppStore
{

    tradeInfo: TradeSecurity[] = [];
    summaryCurrency: SummaryCurrency = {} as SummaryCurrency;

    // Блокировка главного экрана. Если заблокировано больше чем одним
    blockCount: number = 0;
    isUIBlocked: boolean = false;


    constructor() {
        makeObservable(this, {
            tradeInfo: observable,
            summaryCurrency: observable,
            BlockUI: action,
            UnblockUI: action,
            loadTradeInfo: action,
            addUpApplicationPlanned: action,
            changeApplicationStatus: action,
        });
    }

    BlockUI = () => {
        this.blockCount += 1;
        this.isUIBlocked = true;
    }

    UnblockUI = () => {
        this.blockCount -= 1;
        this.isUIBlocked = this.blockCount !== 0;
    }

    addUpApplicationPlanned = async (id: String, checkVolumes: (() => void) | null) => {

        let tradeSecurity = this.tradeInfo
            ?.find(trade => trade.id === id);
        if (!tradeSecurity) return;

        let trades: Trades = tradeSecurity.trades;
        let upApplications: Application[] = trades.upApplication;

        let lastApplication = {order:-1} as Application;
        let volume = 0;
        let lastId: number = 0;
        upApplications.forEach(app => {
            if (app.order > lastApplication.order) {
                lastApplication = app;
            }
            volume = volume + app.volume;

            lastId = Math.max(app.id, lastId);
        });
        if (lastApplication.order === -1) return;

        if (volume >= tradeSecurity.maxApplicationsVolumes)
        {
            if (checkVolumes) {
                checkVolumes();
            }
            return;
        }

        const {
            stepCof, defaultStep, precision, margin, minVolume
        } = tradeSecurity;

        const byPlanned = Math.floor(lastApplication.byPlanned
            * (1 - stepCof / defaultStep) / precision) * precision;

        const shellPlanned = Math.ceil(byPlanned
            / (1 - stepCof) / precision) * precision;

        const profit = Math.floor((
            (shellPlanned * (1 - margin) - byPlanned * (1 + margin))
            * minVolume)/ 0.01) * 0.01;

        lastId++;
        let newApplication: Application = {
            id: lastId,
            order: lastApplication.order + 1,
            status: AppStatus.Planned,
            byPlanned,
            byStart: byPlanned,
            shellPlanned,
            volume: minVolume,
            diff: shellPlanned - byPlanned,
            precisionForSchedule: defaultStep,
            shellStart: shellPlanned,
            profit,
            profitCompensation: Math.floor(profit * 0.2/0.01) * 0.01,
        } as Application;

        // trades.upApplication = [...upApplications, newApplication];

        this.tradeInfo = this.tradeInfo.map(tradeInfo => {
            if (tradeInfo.id === id) {
                return {...tradeInfo,
                    trades: {...tradeInfo.trades, upApplication:
                        [...tradeInfo.trades.upApplication, newApplication]}}
            }
            return tradeInfo;
        });
    }


    loadTradeInfo = async () => {
        this.summaryCurrency = await getSummaryCurrency();
        this.tradeInfo = await getAllTrades();
    }

    increaseMaxVolumes = async (tradeSecurity: TradeSecurity) => {
        this.tradeInfo = this.tradeInfo.map(trade => (
            (trade.id === tradeSecurity.id) ? {...trade,
                    maxApplicationsVolumes: trade.maxApplicationsVolumes + 1
                } : trade));
    }

    changeApplicationStatus = async (tId: string, rId: number, newStatus: AppStatus) => {
        this.tradeInfo = this.tradeInfo.map(trade => {
            if (trade.id === tId) {
                return {
                    ...trade,
                    trades: {...trade.trades, upApplication:
                        trade.trades.upApplication.map(application => {
                            if (application.id === rId) {
                                return {...application, status: newStatus }
                            }
                            return application
                        })
                }}
            }
            return trade;
        })
    }
}