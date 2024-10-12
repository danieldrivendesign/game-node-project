import { useToast } from "./ToastContext";
import { Toast } from "flowbite-react";

const Toaster = () => {
    const { toasts } = useToast();

    return (
        <div className="absolute pointer-events-none flex flex-col z-50 h-1/2 w-1/2 p-8 gap-2">
            {toasts.map((x) => (
                <Toast key={x.id} className={`toast ${x.fadingOut ? "fade-out" : ""}`}>
                    <div className="pl-4 text-sm font-normal">{x.message}</div>
                </Toast>
            ))}
        </div>
    );
};

export default Toaster;
