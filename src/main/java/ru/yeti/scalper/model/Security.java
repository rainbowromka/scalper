package ru.yeti.scalper.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.stereotype.Service;

/**
 * Активы. Ценные бумаги.
 */
@AllArgsConstructor
@Getter
@Service
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
@ToString
public class Security
{
    /**
     * ID актива 4 - буквы. Например ASTR
     */
    String id;
    /**
     * Имя актива. Например Астралинукс.
     */
    String name;
    /**
     * Коэффициент шагов сделок.
     */
    Double stepCof;
    /**
     * Минимальный объем сделки - количество активов.
     */
    Long minVolume;
    /**
     * Маржа.
     */
    Double margin;
    /**
     * Сделки.
     */
    Trades trades;
}
