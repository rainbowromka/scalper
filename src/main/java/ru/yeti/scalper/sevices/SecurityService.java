package ru.yeti.scalper.sevices;

import org.springframework.stereotype.Service;
import ru.yeti.scalper.model.Security;
import ru.yeti.scalper.repository.ISecuritiesRepository;

import java.util.List;

@Service
public class SecurityService
{
    ISecuritiesRepository securityRepo;

    public SecurityService(ISecuritiesRepository securityRepo)
    {
        this.securityRepo = securityRepo;
    }

    public List<Security> getSecurities()
    {
        return securityRepo.getSecurities();
    }
}
