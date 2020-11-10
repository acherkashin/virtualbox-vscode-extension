declare module "virtualbox" {
    export interface VMList {
        [id: string]: { name: string, running: boolean };
    }

    export interface VBoxError {
        message: string;
    }

    export function list(callback: (list: VMList, error?: VBoxError) => void): void;
    export function start(vmId: string, callback: (error?: VBoxError) => void): void;
    export function start(vmId: string, use_gui: boolean, callback: (error?: VBoxError) => void): void;
    export function stop(vmId: string, callback: (error?: VBoxError) => void): void;
    export function isRunning(vmId: string, callback: (error: VBoxError, result: boolean) => void): void;
    export function savestate(vmId: string, callback: (error?: VBoxError) => void): void;
    export function poweroff(vmId: string, callback: (error?: VBoxError) => void): void;
    export const guestproperty: {
        get: (options: { vmname: string, key: string }, callback: (value: string) => void) => void,
        os: (vmname: string, callback: (value: string) => void) => void,
    };
}