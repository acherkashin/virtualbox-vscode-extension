import * as vscode from 'vscode';
import { getAllVms } from './utils';
import { VirtualMachineTreeItem } from './vmTreeitem';

export class VirtualMachinesProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
        return getAllVms().then((vms) => vms.map(vm => new VirtualMachineTreeItem(vm)));
    }
}


// virtualbox.start(firstVM.name, true, (a: any) => {
//     console.log(a);
// });
