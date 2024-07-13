import { List, Paper } from "@mui/material"
import { EntryCard } from "./";
import { EntryStatus } from "@/interfaces";
import { FC, useContext, useMemo } from "react";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";
import styles from './EntryList.module.css';

interface EntryListProps {
    status: EntryStatus
}

export const EntryList:FC<EntryListProps> = ({status}) => {

    const { entries, updatedEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const entruiesByStatus = useMemo(() => {
        return entries.filter((entry) => entry.status === status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entries]);

    const onDropEntry = (event:React.DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find((entry) => entry._id === id)!;
        entry.status = status;
        updatedEntry(entry);
        endDragging();
    };

    const allowDrop = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper 
                sx={{
                    height: 'calc(100vh - 250px)', 
                    backgroundColor: 'transparent',
                    padding: '1px 5px',
                }}
            >
                <List sx={{opacity: isDragging ? 0.2 : 1, transition: 'all .3s'}}>
                    {
                        entruiesByStatus.map((entry) => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    );
};
