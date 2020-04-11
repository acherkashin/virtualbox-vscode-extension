import * as vscode from 'vscode';
import { VirtualMachinesProvider } from './vmsProvider';
import * as virtualbox from 'virtualbox';
import { VirtualMachineTreeItem } from './vmTreeitem';

export function activate(context: vscode.ExtensionContext) {
	const vmProvider = new VirtualMachinesProvider();
	vscode.window.registerTreeDataProvider("vb-machines", vmProvider);
	context.subscriptions.push(
		vscode.commands.registerCommand('virtualbox-extension.runVM', (vmTreeItem: VirtualMachineTreeItem) => {
			const { vm } = vmTreeItem;
			if (vm) {
				virtualbox.start(vm.id, true, (error) => {
					vmProvider.refresh();
					if (error) {
						vscode.window.showErrorMessage(`Cannot run virtual machine"${vm.name}": ${error?.message ?? "Unknown error"}`);
					} else {
						vscode.window.showInformationMessage(`Virtual machine "${vm.name}" has been run successfully`);
					}
				});
			}
		}),
		vscode.commands.registerCommand('virtualbox-extension.refreshVms', () => {
			vmProvider.refresh();
		}),
	);
}

export function deactivate() { }
