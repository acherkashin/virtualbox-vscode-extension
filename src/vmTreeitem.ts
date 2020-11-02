import * as vscode from 'vscode';
import { VirtualMachine } from './utils';

export class VirtualMachineTreeItem extends vscode.TreeItem {
    constructor(public readonly vm: VirtualMachine) {
        super(vm.name);

        this.id = vm.id;
        if (vm.os) {
            this.description = `(${vm.os})`;
        }
        this.iconPath = new vscode.ThemeIcon(vm.running ? "vm-running" : "vm");
        this.contextValue = vm.running ? "vmRunning" : "vmStopped";
    }
}
