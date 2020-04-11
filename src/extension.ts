import * as vscode from 'vscode';
import { VirtualMachinesProvider } from './vmsProvider';
import * as virtualbox from 'virtualbox';
import { VirtualMachineTreeItem } from './vmTreeitem';
import { isRunning } from './utils';

export function activate(context: vscode.ExtensionContext) {
	const vmProvider = new VirtualMachinesProvider();
	vscode.window.registerTreeDataProvider("vb-machines", vmProvider);

	context.subscriptions.push(
		vscode.commands.registerCommand('virtualbox-extension.runVM', async (vmTreeItem?: VirtualMachineTreeItem) => {
			if (vmTreeItem) {
				const { vm } = vmTreeItem;
				const running = await isRunning(vm.id);

				if (!running) {
					virtualbox.start(vm.id, true, (error) => {
						vmProvider.refresh();
						if (error) {
							vscode.window.showErrorMessage(`Cannot run virtual machine "${vm.name}": ${error?.message ?? "Unknown error"}`);
						} else {
							vscode.window.showInformationMessage(`Virtual machine "${vm.name}" has been run successfully`);
						}
					});
				} else {
					vmProvider.refresh();
				}
			}
		}),
		vscode.commands.registerCommand("virtualbox-extension.stopVM", async (vmTreeItem: VirtualMachineTreeItem) => {
			if (vmTreeItem) {
				const { vm } = vmTreeItem;

				const running = await isRunning(vm.id);
				if (running) {
					virtualbox.stop(vm.id, (error) => {
						vmProvider.refresh();
						if (error) {
							vscode.window.showErrorMessage(`Cannot stop virtual machine "${vm.name}": ${error?.message ?? "Unknown error"}`);
						} else {
							vscode.window.showInformationMessage(`Virtual machine "${vm.name}" has been stopped successfully`);
						}
					});
				} else {
					vmProvider.refresh();
				}
			}
		}),
		vscode.commands.registerCommand('virtualbox-extension.refreshVMs', () => {
			vmProvider.refresh();
		}),
	);
}

export function deactivate() { }
