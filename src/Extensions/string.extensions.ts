export {};

function toTitleCase(this: string): string {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

function toReadableString(this: string): string {
    return this.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
        .join(' ');
}

declare global {
    interface String {
        toTitleCase(): string;

        toReadableString(): string;
    }
}

String.prototype.toTitleCase = toTitleCase;
String.prototype.toReadableString = toReadableString;