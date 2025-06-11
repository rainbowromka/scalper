import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab,
    Tabs,
} from "@mui/material";
import {TradeSecurity, TradeType} from "../store/model/Model";
import ApplicationsPanel from "./applications/ApplicationsPanel";

function CustomTabPanel(props: {
    children?: React.ReactNode;
    index: String;
    value: String;
})
{
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden = {value !== index}
            id = {`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p:3 }}>{children}</Box>}
        </div>
    )
}

interface Props {
    tradesSecurity: TradeSecurity[]
    addUpApplicationPlanned: (id: String, checkVolumes: (() => void) | null) => void;
    increaseMaxVolumes: (tradeSecurity: TradeSecurity) => void;
}

export default function TradeSecurityFunc(props:Props)
{
    const [currentTradeSecurity, setCurrentTradeSecurity] = React.useState(0);
    const [isOpenDialog, setIsOpenDialog] = React.useState(false);
    const [currTradeSecurity, setCurrTradeSecurity]
        = React.useState<TradeSecurity>(
            {maxApplicationsVolumes: 0, id: "-1"} as TradeSecurity
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTradeSecurity(newValue);
    }

    const handleClickOpen = (tradeSecurity: TradeSecurity) => {
        setCurrTradeSecurity(tradeSecurity);
        setIsOpenDialog(true);
    }

    const addApplication = (tradeSecurity: TradeSecurity) => {
        props.addUpApplicationPlanned(
            tradeSecurity.id, () => { handleClickOpen(tradeSecurity) });
    }

    const handleClose = (isChange: boolean) => {
        setIsOpenDialog(false);
        if (isChange) {
            props.increaseMaxVolumes(currTradeSecurity);
            props.addUpApplicationPlanned(currTradeSecurity.id, null);
        }
    }

    return (
        <Box sx={{width: "100%"}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs
                    value={currentTradeSecurity}
                    onChange={handleChange}
                    aria-label="Trade security"
                >
                    {props.tradesSecurity.map(tradeSecurity => (
                        <Tab
                            label={tradeSecurity.id}
                            id={`simple-tab-${tradeSecurity.id}`}
                            aria-controls={`simple-tabpanel-${tradeSecurity.id}`}
                        />
                    ))}
                </Tabs>
            </Box>
            {props.tradesSecurity.map(tradeSecurity => (
                <CustomTabPanel
                    value={tradeSecurity.id} index={tradeSecurity.id}
                >
                    <ApplicationsPanel
                        title="Играем вниз"
                        tradeType={TradeType.down}
                        tradeSecurity={tradeSecurity}
                        addApplication={addApplication}
                        applicationsRows={tradeSecurity.trades.downApplication}
                    />
                    <ApplicationsPanel
                        title="Играем вверх"
                        tradeType={TradeType.up}
                        tradeSecurity={tradeSecurity}
                        addApplication={addApplication}
                        applicationsRows={tradeSecurity.trades.upApplication}
                    />
                    <ApplicationsPanel
                        title="История сделок"
                        tradeType={TradeType.history}
                        tradeSecurity={tradeSecurity}
                        addApplication={addApplication}
                        applicationsRows={tradeSecurity.trades.history}
                    />
                </CustomTabPanel>
            ))}
            <Dialog
                open={isOpenDialog}
                onClose={() => handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Превышен лимит сделок
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Превышен лимит сделок для этого актива, хотите повысить?
                        <br/>Было {currTradeSecurity.maxApplicationsVolumes},
                        станет {currTradeSecurity.maxApplicationsVolumes + 1}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>Нет</Button>
                    <Button onClick={() => handleClose(true)} autoFocus>Да</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}