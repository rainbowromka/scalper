import {SummaryCurrency} from "../store/model/Model";

const getSummaryCurrency = async ():Promise<SummaryCurrency> => {
    return {
        foundsInvested: 152820,
        valueAllAssets: 144200,
        reserved: 59499.20,
        balanceOfFounds: 61382.26,
        freeCurrency: 1883.06,
        lastChange: 1566.96,
    }
}

export default getSummaryCurrency;