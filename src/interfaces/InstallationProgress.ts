export default interface InstallationProgress {
    receivedBytes: number;
    totalBytes: number;
    step: number;
    outOf: number;
}