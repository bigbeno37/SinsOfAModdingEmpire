import {IPCEnum} from "../enums/IPCEnum";

export default interface InstallationProgress {
    type: IPCEnum;
    receivedBytes?: number;
    totalBytes?: number;
    step?: number;
}