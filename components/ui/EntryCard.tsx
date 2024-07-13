import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import React, { FC, useContext } from 'react';
import { EntryProps } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

interface EntryCardProps {
    entry: EntryProps
}

export const EntryCard:FC<EntryCardProps> = ({entry}) => {

    const { startDragging, endDragging } = useContext(UIContext);

    const router = useRouter();

    const onDragStart = (event:React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', entry._id);
        startDragging();
    };

    const onDragEnd = () => {
        endDragging();
    };

    const onClick = () => {
        router.push(`/entries/${entry._id}`);
    };

    return (
        <Card
            onClick={onClick}
            sx={{marginBottom: 1}}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                    <Typography variant='body2'>
                        {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
