import React, {useEffect, useRef, useState} from "react";
import {Box, Button, ButtonGroup, TableCell} from "@mui/material";
import {Application, AppStatus, TradeSecurity} from "../../store/model/Model";
import {
    styleCellDone,
    styleCellOpenPlanned,
    styleCellOpenToOpen
} from "./FieldStyles";

interface Props {
    tradeSecurity: TradeSecurity;
    row: Application
}

export default function ByField (props: Props)
{
    const { row, tradeSecurity } = props;
    const {accuracy} = tradeSecurity;
    const [isHovered, setIsHovered] = useState(false);
    // const [position, setPosition] = useState('top');
    const cellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isHovered && cellRef.current) {
            const  rect = cellRef.current.getBoundingClientRect()
        }
    });


    return <TableCell
        ref={cellRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        align="center"
        sx={{...getByCellColor(row),
            position: "relative"
        }}
    >
        {(row.byFact ? row.byFact : row.byStart).toFixed(accuracy)}
        {isHovered && (
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: "50%",
                    transform: "translate(-50%, -100%)",
                    zIndex: 10,
                }}
            >
                <ButtonGroup variant="contained" size="small">
                    <Button>Просто кнопка</Button>
                </ButtonGroup>
            </Box>
        )}
    </TableCell>
}

const getByCellColor = (row: Application) => {
    switch (row.status)
    {
        case AppStatus.Planned:
            return styleCellOpenPlanned;
        case AppStatus.ToOpen:
            return styleCellOpenToOpen;
        case AppStatus.Opened:
        case AppStatus.ToClose:
        case AppStatus.Closed:
        case AppStatus.Result:
            return styleCellDone;
    }
}
