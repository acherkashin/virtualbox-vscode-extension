import { promisify } from "util";
import * as virtualbox from "virtualbox";

export interface VirtualMachine {
    id: string;
    name: string;
    running: boolean;
    os: string;
}

export const isRunning = promisify(virtualbox.isRunning);
export const saveState = promisify(virtualbox.savestate);
export const powerOff = promisify(virtualbox.poweroff);

/**
 * Get all virtual machines
 */
export function getAllVms(): Promise<VirtualMachine[]> {
    return new Promise((resolve, reject) => {
        virtualbox.list(async (list: any, error: any) => {
            if (error) {
                reject(error);
            } else {
                const vmsPromise = Object.keys(list).map(async (vmId) => ({
                    id: vmId,
                    name: list[vmId].name,
                    running: list[vmId].running,
                } as VirtualMachine));

                const vms = await Promise.all(vmsPromise);
                resolve(vms);
            }
        });
    });
}

/**
 * Start virtual machine
 */
export function startWithGui(vmId: string): Promise<void> {
    return new Promise((resolve, reject): void => {
        virtualbox.start(vmId, true, (error: any) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Start virtual machine Headless
 */
export function startWithoutGui(vmId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        virtualbox.start(vmId, false, (error: any) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Stops all virtual machines with saving states
 */
export async function stopAllVms(): Promise<void[]> {
    const vms = await getAllVms();
    const runningVmIds = vms.filter((vm) => vm.running).map((vm) => vm.id);
    const promises = runningVmIds.map(id => saveState(id));
    return await Promise.all(promises);
}

/**
 * Power off all virtual machines without saving states
 */
export async function poweOffAllVms(): Promise<void[]> {
    const vms = await getAllVms();
    const runningVmIds = vms.filter((vm) => vm.running).map((vm) => vm.id);
    const promises = runningVmIds.map(id => powerOff(id));
    return await Promise.all(promises);
}

// export async function getOsName(vmId: string): Promise<string> {
//     return new Promise((resolve) => {
//         virtualbox.guestproperty.get({ vmname: vmId, key: "ostype" }, (value) => {
//             resolve(value);
//         });
//     });
// }