package ru.yeti.scalper.repository;

import ru.yeti.scalper.model.Security;

import java.util.List;

public interface ISecuritiesRepository
{
    /**
     * Сервис получения списка активов с их заявками сделками и их историями.
     *
     * @return
     */
    List<Security> getSecurities();
}
