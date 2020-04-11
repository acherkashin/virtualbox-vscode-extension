import * as vscode from 'vscode';
import { VirtualMachine } from './utils';

export class VirtualMachineTreeItem extends vscode.TreeItem {
    constructor(private vm: VirtualMachine) {
        super(vm.name);
    }
}
