import * as virtualbox from "virtualbox";

export interface VirtualMachine {
    id: string;
    name: string;
    running: boolean;
    os: string;
}

function getOsName(vmId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        virtualbox.guestproperty.os(vmId, (value) => {
            resolve(value);
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
                    os: await getOsName(vmId),
                } as VirtualMachine));

                const vms = await Promise.all(vmsPromise);
                resolve(vms);
            }
        });
    });
}
