import * as vscode from 'vscode';
import { VirtualMachinesProvider } from './vmsProvider';
import * as virtualbox from 'virtualbox';
import { VirtualMachine } from './utils';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider("vb-machines", new VirtualMachinesProvider());
	let disposable = vscode.commands.registerCommand('virtualbox-extension.runVM', (vm: VirtualMachine) => {
		if (vm) {
			virtualbox.start(vm.id, true, (error) => {
				if (error) {
					vscode.window.showErrorMessage(`Cannot run virtual machine"${vm.name}": ${error?.message ?? "Unknown error"}`);
				} else {
					vscode.window.showInformationMessage(`Virtual machine "${vm.name}" has been run successfully`);
				}
			});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
