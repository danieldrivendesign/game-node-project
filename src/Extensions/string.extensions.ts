export {};

function toTitleCase(this: string):string {
    return this.substring(0,1).toUpperCase() +
        this.substring(1).toLowerCase();
}

declare global {
    interface String {
        toTitleCase(): string;
    }
}

String.prototype.toTitleCase = toTitleCase;