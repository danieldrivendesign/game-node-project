import {createContext, ReactNode, useContext, useReducer} from 'react';

export interface IToast {
    id: string;
    time: number;
    message: string;
    fadingOut?: boolean;
}

type ToastState = IToast[];
type ToastAction = { type: 'ADD_TOAST'; payload: IToast } | { type: 'REMOVE_TOAST'; payload: string } | {
    type: 'REMOVE_FADED_TOAST';
    payload: string
};
const ToastContext = createContext<{
    toasts: ToastState;
    sendToast: (message: string) => void;
}>({
    toasts: [], sendToast: () => {
    }
});

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
    switch (action.type) {
        case 'ADD_TOAST':
            return [...state, action.payload];
        case 'REMOVE_TOAST':
            return state.map(toast =>
                toast.id === action.payload ? {...toast, fadingOut: true} : toast
            );
        case 'REMOVE_FADED_TOAST':
            return state.filter(toast => toast.id !== action.payload);
        default:
            return state;
    }
};

export const ToastProvider = ({children}: { children: ReactNode }) => {
    const [toasts, dispatch] = useReducer(toastReducer, []);

    const sendToast = (message: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        dispatch({type: 'ADD_TOAST', payload: {id, time: 5, message}});
        setTimeout(() => {
            dispatch({type: 'REMOVE_TOAST', payload: id});
            setTimeout(() => {
                dispatch({type: 'REMOVE_FADED_TOAST', payload: id});
            }, 1000);
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{toasts, sendToast}}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);