declare module "virtualbox" {
    export interface VMList {
        [id: string]: { name: string, running: boolean };
    }

    export function list(callback: (list: VMList, error: any) => void): void;


}