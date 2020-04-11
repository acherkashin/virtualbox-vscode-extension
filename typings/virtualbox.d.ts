declare module "virtualbox" {
    export interface VMList {
        [id: string]: { name: string, running: boolean };
    }

    export function list(callback: (list: VMList, error?: { message: string }) => void): void;
    export function start(vmId: string, callback: (error?: { message: string }) => void): void;
    export function start(vmId: string, use_gui: boolean, callback: (error?: { message: string }) => void): void;
}