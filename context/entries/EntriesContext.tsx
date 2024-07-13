import { createContext } from "react";
import { EntryProps } from "../../interfaces";

interface ContextProps {
    entries: EntryProps[];
    addNewEntry: (description: string) => void;
    updatedEntry: (entry: EntryProps, showSnackbar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);