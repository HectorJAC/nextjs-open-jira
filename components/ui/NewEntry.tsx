import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "@/context/ui";

export const NewEntry = () => {

    const [inputValue, setInputValue] = useState<string>("");
    const [touched, setTouched] = useState<boolean>(false);

    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, seIsAddingEntry } = useContext(UIContext);

    const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onSave = () => {
        if (inputValue.length === 0) return;
        addNewEntry(inputValue);

        setTouched(false);
        seIsAddingEntry(false);
        setInputValue("");
    };

    return (
        <Box sx={{marginBottom: 2, paddingX: 1}}>

            {
                isAddingEntry ? (
                    <>
                        <TextField 
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder="Nueva Entrada"
                            autoFocus
                            multiline
                            label="Nueva Entrada"
                            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
                            error={inputValue.length <= 0 && touched}
                            value={inputValue}
                            onChange={onTextFieldChange}
                            onBlur={() => setTouched(true)}
                        />

                        <Box display="flex" justifyContent="space-between">
                            <Button 
                                variant="text" 
                                onClick={() => seIsAddingEntry(false)}
                            >
                                Cancelar
                            </Button>

                            <Button 
                                variant="outlined" 
                                color="secondary"
                                endIcon={<SaveOutlinedIcon />}
                                onClick={onSave}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Button
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        fullWidth
                        variant="outlined"
                        onClick={() => seIsAddingEntry(true)}
                    >
                        Agregar Tarea
                    </Button>
                )
            }
            
        </Box>
    );
};
