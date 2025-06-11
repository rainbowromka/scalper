import React from "react";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ApplicationTable from "../ApplicationTable";
import {Application, TradeSecurity, TradeType} from "../../store/model/Model";

const ApplicationsPanel = (
    props: {
        title: string,
        tradeType: TradeType,
        tradeSecurity: TradeSecurity,
        addApplication: (tradeSecurity: TradeSecurity) => void,
        applicationsRows: Application[]
    }) =>
{
    const {tradeType, title, tradeSecurity, applicationsRows} = props;

    return (<>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    '& > *': {
                        m: 1,
                    },
                }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Typography>{title}</Typography>
                    <ButtonGroup
                        variant="outlined"
                        aria-label="управление торговлей"
                    >
                        <Button
                            aria-label="Запланировать сделку"
                            color="primary"
                            onClick={() => props.addApplication(tradeSecurity)}
                        >
                            <AddIcon/>
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
            <ApplicationTable
                tradeType={tradeType}
                tradeSecurity={tradeSecurity}
                applicationsRows={applicationsRows}
                // applicationsRows={tradeSecurity.trades.upApplication}
            />
    </>)
}

export default ApplicationsPanel;
