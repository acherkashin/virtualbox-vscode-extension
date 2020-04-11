import * as vscode from 'vscode';
import { getAllVms } from './utils';
import { VirtualMachineTreeItem } from './vmTreeitem';

export class VirtualMachinesProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<VirtualMachineTreeItem | undefined> = new vscode.EventEmitter<VirtualMachineTreeItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<VirtualMachineTreeItem | undefined> = this._onDidChangeTreeData.event;

    refresh(item?: VirtualMachineTreeItem): void {
        this._onDidChangeTreeData.fire(item);
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
        return getAllVms()
            .then((vms) => vms.map(vm => new VirtualMachineTreeItem(vm)))
            .catch((err) => {
                vscode.window.showErrorMessage(err);
                return [];
            });
    }
}
