declare module "virtualbox" {
    export interface VMList {
        [id: string]: { name: string, running: boolean };
    }

    export function list(callback: (list: VMList, error?: { message: string }) => void): void;
    export function start(vmId: string, callback: (error?: { message: string }) => void): void;
    export function start(vmId: string, use_gui: boolean, callback: (error?: { message: string }) => void): void;
    export function stop(vmId: string, callback: (error?: { message: string }) => void): void;
    export const guestproperty: {
        get: (options: any, callback: (value: string) => void) => void,
        os: (vmname: string, callback: (value: string) => void) => void,
    };
}