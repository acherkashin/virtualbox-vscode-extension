import * as vscode from 'vscode';
var virtualbox = require("virtualbox");

export class VirtualMachinesProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        //TODO: figure out when this method is called
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
        return getAllVms().then((vms) => vms.map(vm => new VirtualMachineTreeItem(vm)));
    }
}

export interface VirtualMachine {
    id: string;
    name: string;
    running: boolean;
}

export class VirtualMachineTreeItem extends vscode.TreeItem {
    constructor(private vm: VirtualMachine) {
        super(vm.name);
    }
}


function getAllVms(): Promise<VirtualMachine[]> {
    return new Promise((resolve, reject) => {
        virtualbox.list((list: any) => {
            //TODO: handle error
            const vms = Object.keys(list).map((vmId) => ({
                id: vmId,
                name: list[vmId].name,
                running: list[vmId].running,
            } as VirtualMachine));
            resolve(vms);
        });
    });
}

// virtualbox.start(firstVM.name, true, (a: any) => {
//     console.log(a);
// });
