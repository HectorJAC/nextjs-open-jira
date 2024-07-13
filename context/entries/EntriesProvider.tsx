import { useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { EntryProps } from "../../interfaces";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";

export interface EntriesState {
    entries: EntryProps[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider = ({children}:any) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
    const {enqueueSnackbar} = useSnackbar();

    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<EntryProps>('/entries', {description});

        dispatch({type: '[Entry] Add Entry', payload: data});
    };

    const updatedEntry = async (entry: EntryProps, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<EntryProps>(`/entries/${entry._id}`, {
                description: entry.description,
                status: entry.status
            });

            dispatch({type: '[Entry] Entry-Updated', payload: data});
            if (showSnackbar) {
                enqueueSnackbar('Entrada actualizada correctamente', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshEntries = async () => {
        const {data} = await entriesApi.get<EntryProps[]>('/entries');
        dispatch({type: '[Entry] Refresh-Data', payload: data});
    };

    useEffect(() => {
        refreshEntries();
    }, []);

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updatedEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}