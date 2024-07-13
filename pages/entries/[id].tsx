import { GetServerSideProps } from 'next';
import { Layout } from "@/components/layouts";
import { 
    capitalize,
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    CardHeader, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    Radio, 
    RadioGroup, 
    TextField, 
    IconButton
} from "@mui/material";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { EntryProps, EntryStatus } from "../../interfaces";
import { FC, useContext, useMemo, useState } from "react";
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: EntryProps
}

const EntryPage: FC<Props> = ({entry}) => {

    const { updatedEntry } = useContext(EntriesContext);

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touch, setTouch] = useState(false);

    const isNotValid = useMemo(() => {
        return inputValue.length <= 0 && touch
    }, [inputValue, touch]);

    const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    };

    const onSave = () => {
        if (inputValue.trim().length === 0) return;

        const updateddEntry: EntryProps = {
            ...entry,
            description: inputValue,
            status
        };

        updatedEntry(updateddEntry, true);
    };

    return (
        <Layout title={inputValue.substring(0, 20)}>
            <Grid
                container
                justifyContent="center"
                sx={{marginTop: 2}}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={'Entrada:'}
                            subheader={`Creada: ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                        />
                        <CardContent>
                            <TextField 
                                sx={{marginTop: 2, marginBottom: 1}}
                                fullWidth
                                placeholder="Nueva Entrada"
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                value={inputValue}
                                onChange={onInputValueChange}
                                onBlur={() => setTouch(true)}
                                error={isNotValid}
                                helperText={isNotValid && 'Ingrese un valor'}
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup 
                                    row
                                    value={status}
                                    onChange={onStatusChange}
                                >
                                    {
                                        validStatus.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={ <SaveAsOutlinedIcon /> }
                                variant="contained"
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton sx={{
                position: "fixed",
                bottom: 30,
                right: 30,
                backgroundColor: "red",
            }}>
                <DeleteOutlinedIcon />
            </IconButton>

        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    };

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;
