import * as virtualbox from "virtualbox";

export interface VirtualMachine {
    id: string;
    name: string;
    running: boolean;
}

export function getAllVms(): Promise<VirtualMachine[]> {
    return new Promise((resolve, reject) => {
        virtualbox.list((list, error) => {
            if (error) {
                reject(error);
            } else {
                const vms = Object.keys(list).map((vmId) => ({
                    id: vmId,
                    name: list[vmId].name,
                    running: list[vmId].running,
                } as VirtualMachine));
                resolve(vms);
            }
        });
    });
}
