package ru.yeti.scalper.repository;

import org.springframework.scripting.bsh.BshScriptEvaluator;
import org.springframework.stereotype.Repository;
import ru.yeti.scalper.model.Application;
import ru.yeti.scalper.model.Security;
import ru.yeti.scalper.model.Trades;

import java.util.Date;
import java.util.List;

import static java.util.Arrays.asList;

@Repository
public class SecuritiesRepositoryTest
implements ISecuritiesRepository
{
    @Override
    public List<Security> getSecurities()
    {
        return asList(new Security("ASTR", "Астра Линукс", 0.016355, 1L, 0.003, new Trades(asList(
                downO(1L, 1053.60, 1063.40, 1L, 29.40, 2L, 1073.00, 1083.00, 0.0, 22.99),
                downO(2L, 1054.40, 1054.40, 1L, 19.40, 2L, 1073.80, 1073.80, 0.0, 13.02),
                downO(3L, 1064.00, 1064.00, 1L, 19.60, 2L, 1083.60, 1083.60, 0.0, 13.16),
                downP(4L, 1073.80, 1073.80 ,1L, 19.80, 2L, 1093.60, 1093.60),
                downP(5L, 1083.60, 1083.60 ,1L, 20.00, 2L, 1103.60, 1103.60),
                downP(6L, 1093.60, 1093.60 ,1L, 20.20, 2L, 1113.80, 1113.80),
                downP(7L, 1103.60, 1103.60 ,1L, 20.40, 2L, 1124.00, 1124.00)
            ), asList(
                upO(1L, 1194.20, 1194.20, 1L, 21.80, 2L, 1216.00, 1216.00, null),
                upO(2L, 1078.20, 1078.20, 1L, 19.60, 2L, 1097.80, 1097.80, null),
                upO(3L, 1087.80, 1085.40, 1L, 17.40, 2L, 1107.60, 1105.20, 2.4),
                upP(4L, 1056.40, 1056.40, 1L, 19.20, 2L, 1075.60, 1075.60)
            ),
               asList(
                   new Application()
               )
            )),
            new Security("RUAL", "РусАл", 0.016344, 10L, 0.003, new Trades()),
            new Security("CHMF", "Северсталь", 0.018000, 1L, 0.003, new Trades()),
            new Security("SVAV", "Соллерс", 0.016344, 1L, 0.003, new Trades()),
            new Security("ELMT", "Элемент", 0.016344, 3000L, 0.003, new Trades())
        );
    }

    private static Application upP(
        Long order,
        Double byStarted,
        Double byPlanned,
        Long volume,
        Double diff,
        Long precision,
        Double sellPlanned,
        Double sellStarted)
    {
        return new Application(order, byStarted, null, null, byPlanned, volume,
            diff, precision, sellPlanned, null, null, sellStarted, null, null,
            null, null);
    }

    private static Application upO(
        Long order,
        Double by,
        Double byPlanned,
        Long volume,
        Double diff,
        Long precision,
        Double sellPlanned,
        Double sellStarted,
        Double compensation)
    {
        return new Application(order, by, by, new Date(), byPlanned, volume,
            diff, precision, sellPlanned, null, null, sellStarted, compensation,
            null, null, null);
    }

    private static Application downP(
        Long order,
        Double byStared,
        Double byPlanned,
        Long volume,
        Double diff,
        Long precision,
        Double sellPlanned,
        Double sell)
    {
        return new Application(order, byStared, null, null, byPlanned, volume,
            diff, precision, sellPlanned, null, null, sell, null, null, null,
            null);
    }

    private static Application downO(
        Long order,
        Double byStared,
        Double byPlanned,
        Long volume,
        Double diff,
        Long precision,
        Double sellPlanned,
        Double sell,
        Double compensation,
        Double profit)
    {
        return new Application(order, byStared, null, null, byPlanned, volume,
            diff, precision, sellPlanned, new Date(), sell, sell, compensation,
            profit, null, null);
    }
}
