import { useReducer } from "react";
import { UIContext } from "./UIContext";
import { uiReducer } from "./UIReducer";

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UIProvider = ({children}:any) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({type: 'UI - Open Sidebar'})
    };

    const closeSideMenu = () => {
        dispatch({type: 'UI - Close Sidebar'})
    };

    const seIsAddingEntry = (isAddig: boolean) => {
        dispatch({type: 'UI - Add Entry', payload: isAddig})
    };

    const startDragging = () => {
        dispatch({type: 'UI - Start Dragging'})
    };

    const endDragging = () => {
        dispatch({type: 'UI - End Dragging'})
    };

    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,
            seIsAddingEntry,
            startDragging,
            endDragging
        }}>
            {children}
        </UIContext.Provider>
    )
}