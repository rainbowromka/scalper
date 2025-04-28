package ru.yeti.scalper.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Сделки.
 */
@AllArgsConstructor
@Getter
@Service
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
@ToString
public class Trades
{
    /**
     * Сделки вниз.
     */
    List<Application> downApplication;
    /**
     * Сделки вверх.
     */
    List<Application> upApplication;
    /**
     * Совершённые сделки.
     */
    List<Application> history;
}
