import {Button, Modal} from "flowbite-react";
import {useEffect, useState} from "react";
import {Inputs} from "./Inputs";

type HelpModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
export function HelpModal({isOpen, setIsOpen}: HelpModalProps) {
    const [openModal, setOpenModal] = useState(false);
    const modalPlacement = 'center';

    useEffect(() =>{
        setOpenModal(isOpen)
    }, [isOpen])

    function CloseModal() {
        setIsOpen(false)
    }
    return (
        <div>
            <Modal
                show={openModal}
                position={modalPlacement}
                onClose={CloseModal}
            >
                <Modal.Header>Inputs</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6 flex-grow">
                        <Inputs/>
                    </div>
                </Modal.Body>
                <Modal.Footer className={"items-end"}>
                    <Button className={"justify-end"} onClick={CloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}