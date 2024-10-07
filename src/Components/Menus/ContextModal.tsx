import {Card} from "flowbite-react";
import {useState} from "react";


function ContextModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            {
                isOpen ? (
                    <Card>
                        <p>Add a list.</p>
                    </Card>
                ) : <></>
            }
        </>
    )
}