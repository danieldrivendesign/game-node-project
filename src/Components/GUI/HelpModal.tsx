import {Button, Modal} from "flowbite-react";
import {useState} from "react";
import {Inputs} from "./Inputs.tsx";


export function HelpModal() {
    const [openModal, setOpenModal] = useState(false);
    const modalPlacement = 'center';

    return (
        <div>
            <div className={""}>
                <Button onClick={() => setOpenModal(true)} className={"pointer-events-auto"}>Show Inputs</Button>
            </div>
            <Modal
                show={openModal}
                position={modalPlacement}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>Inputs</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6 flex-grow">
                        <Inputs/>
                    </div>
                </Modal.Body>
                <Modal.Footer className={"items-end"}>
                    <Button className={"justify-end"} onClick={() => setOpenModal(false)}>Close</Button>
                    {/*<Button color="gray" onClick={() => setOpenModal(false)}>*/}
                    {/*    Decline*/}
                    {/*</Button>*/}
                </Modal.Footer>
            </Modal>
        </div>
    );
}