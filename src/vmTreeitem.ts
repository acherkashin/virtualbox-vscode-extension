import * as vscode from 'vscode';
import { VirtualMachine } from './utils';

export class VirtualMachineTreeItem extends vscode.TreeItem {
    constructor(public readonly vm: VirtualMachine) {
        super(vm.name);

        this.id = vm.id;
        this.iconPath = vm.running ? new vscode.ThemeIcon("vm-running") : new vscode.ThemeIcon("vm");
        this.command = {
            title: "Run virtual machine",
            command: "virtualbox-extension.runVM",
            arguments: [vm],
        };
    }
}
