import * as vscode from 'vscode';
import { isRunning, poweOffAllVms, powerOff, saveState, startWithGui, startWithoutGui, stopAllVms } from './utils';
import { VirtualMachinesProvider } from './vmsProvider';
import { VirtualMachineTreeItem } from './vmTreeitem';

export function activate(context: vscode.ExtensionContext): void {
	const vmProvider = new VirtualMachinesProvider();
	vscode.window.registerTreeDataProvider("vb-machines", vmProvider);

	context.subscriptions.push(
		vscode.commands.registerCommand('virtualbox-extension.runVM', async (vmTreeItem?: VirtualMachineTreeItem): Promise<void> => {
			if (vmTreeItem) {
				const { vm } = vmTreeItem;
				const running = await isRunning(vm.id);

				if (!running) {
					try {
						await startWithGui(vm.id);
						vscode.window.showInformationMessage(`Virtual machine "${vm.name}" has been run successfully`);
					} catch (_ex) {
						const ex = _ex as any;
						vscode.window.showErrorMessage(`Cannot run virtual machine "${vm.name}": ${ex?.message ?? "Unknown error"}`);
					}
				}

				vmProvider.refresh();
			}
		}),
		vscode.commands.registerCommand('virtualbox-extension.runHeadlessVM', async (vmTreeItem?: VirtualMachineTreeItem): Promise<void> => {
			if (vmTreeItem) {
				const { vm } = vmTreeItem;
				const running = await isRunning(vm.id);

				if (!running) {
					try {
						await startWithoutGui(vm.id);
						vscode.window.showInformationMessage(`Virtual machine "${vm.name}" (Headless) has been run successfully`);
					} catch (_ex) {
						const ex = _ex as any;
						vscode.window.showErrorMessage(`Cannot run virtual machine "${vm.name}" (Headless): ${ex!.message ?? "Unknown error"}`);
					}
				}

				vmProvider.refresh();
			}
		}),
		vscode.commands.registerCommand("virtualbox-extension.saveStateVM", async (vmTreeItem: VirtualMachineTreeItem): Promise<void> => {
			if (vmTreeItem) {
				const { vm } = vmTreeItem;

				const running = await isRunning(vm.id);
				if (running) {
					try {
						await saveState(vm.id);
						vscode.window.showInformationMessage(`Virtual machine "${vm.name}" has been stopped successfully`);
					} catch (_ex) {
						const ex = _ex as any;
						vscode.window.showErrorMessage(`Cannot stop virtual machine "${vm.name}": ${ex?.message ?? "Unknown error"}`);
					}
				}
				vmProvider.refresh();
			}
		}),
		vscode.commands.registerCommand("virtualbox-extension.poweroffVm", async (vmTreeItem: VirtualMachineTreeItem): Promise<void> => {
			if (vmTreeItem) {
				const { vm } = vmTreeItem;

				const running = await isRunning(vm.id);
				if (running) {
					try {
						await powerOff(vm.id);
						vscode.window.showInformationMessage(`Virtual machine "${vm.name}" has been stopped successfully`);
					} catch (_ex) {
						const ex = _ex as any;
						vscode.window.showErrorMessage(`Cannot stop virtual machine "${vm.name}": ${ex?.message ?? "Unknown error"}`);
					}
				}
				vmProvider.refresh();
			}
		}),
		vscode.commands.registerCommand('virtualbox-extension.refreshVMs', (): void => {
			vmProvider.refresh();
		}),
		vscode.commands.registerCommand('virtualbox-extension.stopAllVms', (): void => {
			stopAllVms().then((): void => {
				vmProvider.refresh();
			});
		}),
		vscode.commands.registerCommand('virtualbox-extension.poweOffAllVms', (): void => {
			poweOffAllVms().then((): void => {
				vmProvider.refresh();
			});
		}),
	);
}

export function deactivate() { }
