package ru.yeti.scalper.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Сделка.
 */
@AllArgsConstructor
@Getter
@Service
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
@ToString
public class Application
{
    /**
     * Порядок сделок при отображении. Фактический определяется по ближайшей
     * сделке.
     */
    Long order;
    /**
     * Покупка стартовая.
     */
    Double byStarted;
    /**
     * Покупка по факту.
     */
    Double byFact;
    /**
     * Дата покупки. Если игра вверх, то дата открытия сделки. Если игра вниз,
     * дата закрытия сделки.
     */
    Date byDate;
    /**
     * Запланированая сумма покупки.
     */
    Double byPlanned;

    /**
     * Объем ценных бумаг.
     */
    Long volume;
    /**
     * Разница между покупкой и продажой по плану.
     */
    Double diff;

    /**
     * Делитель шага покупки ценной бумаги от предыдущей совершенной сделки.
     */
    Long precisionForSchedule;

    /**
     * Продажа запланированая.
     */
    Double shellPlanned;
    /**
     * Дата продажи. Если сделка вверх - то закрытия. Если сделка вниз то
     * открытия.
     */
    Date shellDate;
    /**
     * Продажа по факту.
     */
    Double shellFact;
    /**
     * Продажа стартовая (заявка).
     */
    Double shellStart;

    /**
     * Компенсация для быстрого закрытия сделки.
     */
    Double compensation;

    /**
     * Прибыль.
     */
    Double profit;
    /**
     * Часть от прыбили направляем на компенсацию других сделок.
     */
    Double profitCompensation;
    /**
     * Комментарии.
     */
    String comment;
}
