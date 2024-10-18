import {Edge, ReactFlowJsonObject} from '@xyflow/react';
import React, {createContext, ReactNode, useContext, useReducer} from 'react';
import {AppNode} from '../../NodeEditors/LevelNodeEditor/Nodes/LevelEditorNodeTypes';

interface State {
    levels: ReactFlowJsonObject<AppNode, Edge> | null;
    characters: string;
}

interface AddLevelAction {
    type: 'ADD_LEVELDATA';
    payload: ReactFlowJsonObject<AppNode, Edge>;
}

interface AddCharacterAction {
    type: 'ADD_CHARACTER';
    payload: string;
}
type Action = AddLevelAction | AddCharacterAction

const initialState: State = {
    levels: null,
    characters: ''
};

function globalReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD_LEVELDATA':
            return {...state, levels: action.payload};
        case 'ADD_CHARACTER':
            return {...state, characters: action.payload};
        default:
            return state;
    }
}

interface GlobalContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

interface GlobalProviderProps {
    children: ReactNode;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({children}: GlobalProviderProps) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return (
        <GlobalContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalStore = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalStore must be used within a GlobalProvider');
    }
    return context;
};
