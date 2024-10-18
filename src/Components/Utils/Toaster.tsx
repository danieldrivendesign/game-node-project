import {useContext} from 'react';
import {DebugProvider} from '../Debug/DebugProvider';
import {IToast, useToast} from './ToastContext';

const Toaster = () => {
    const {toasts} = useToast();
    const showDebug = useContext(DebugProvider);

    return (
        <div
            className={'toaster absolute pointer-events-none flex flex-col z-50 bottom-2 p-8 gap-2 mt-12 right-10 w-1/4 ' + (showDebug ? 'border-2 border-teal-400' : '')}>
            {toasts.map((x: IToast) => (
                <div id="toast-simple" key={x.id}
                     className={`toast ${x.fadingOut ? 'fade-out' : ''} flex items-center w-full p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800`}
                     role="alert">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
                    </svg>
                    <div className="pl-4 text-sm font-normal">{x.message}</div>
                </div>
            ))}
        </div>
    );
};

export default Toaster;
