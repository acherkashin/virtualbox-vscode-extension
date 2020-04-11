import * as virtualbox from "virtualbox";
import { promisify } from "util";

export interface VirtualMachine {
    id: string;
    name: string;
    running: boolean;
    os: string;
}

// function getOsName(vmId: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//         virtualbox.guestproperty.get({ vmname: vmId, key: "ostype" }, (value) => {
//             resolve(value);
//         });
//     });
// }

export const isRunning = promisify(virtualbox.isRunning);
export const saveState = promisify(virtualbox.savestate);
export const powerOff = promisify(virtualbox.poweroff);

export function startWithGui(vmId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        virtualbox.start(vmId, true, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

export function getAllVms(): Promise<VirtualMachine[]> {
    return new Promise((resolve, reject) => {
        virtualbox.list(async (list, error) => {
            if (error) {
                reject(error);
            } else {
                const vmsPromise = Object.keys(list).map(async (vmId) => ({
                    id: vmId,
                    name: list[vmId].name,
                    running: list[vmId].running,
                    // os: await getOsName(vmId),
                } as VirtualMachine));

                const vms = await Promise.all(vmsPromise);
                resolve(vms);
            }
        });
    });
}
