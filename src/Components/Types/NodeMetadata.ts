export interface PropertyMetadata {
    type: 'string' | 'boolean' | 'number' | 'image' | 'custom' | 'textarea' | { enum: string[] };
    label: string;
    isEditable: boolean;
}

export const levelNodeMetadata: Record<string, PropertyMetadata> = {
    name: {
        type: 'string',
        label: 'Name',
        isEditable: true
    },
    description: {
        type: 'textarea',
        label: 'Description',
        isEditable: true
    },
    image: {
        type: 'image',
        label: 'Image',
        isEditable: true
    },
    entranceCount: {
        type: 'number',
        label: 'Entrance Count',
        isEditable: true
    },
    exitCount: {
        type: 'number',
        label: 'Exit Count',
        isEditable: true
    },
    levelType: {
        type: {enum: ['Town', 'Field', 'Dungeon']},
        label: 'Level Type',
        isEditable: true
    }
};


// Add types here
export const nodeMetadataRegistry: Record<string, Record<string, PropertyMetadata>> = {
    levelNode: levelNodeMetadata
};


