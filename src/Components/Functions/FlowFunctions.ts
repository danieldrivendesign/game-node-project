// const onDrop: (e: DragEvent<Element>) => void = (e: DragEvent) => {
//     e.preventDefault();
//     if (reactFlowInstance) {
//         const type: string = e.dataTransfer.getData('application/reactflow');
//         const position = reactFlowInstance.screenToFlowPosition({
//             x: e.clientX,
//             y: e.clientY
//         });
//         const newNode: AppNode = {
//             id: getId(),
//             type,
//             position,
//             data: {
//                 name: 'New',
//                 description: '',
//                 image: null,
//                 entranceCount: 1,
//                 exitCount: 1,
//                 levelType: 'Town'
//             }
//         };
//         setNodes((nds: AppNode[]) => nds.concat(newNode));
//         setMenu(null);
//     }
// };