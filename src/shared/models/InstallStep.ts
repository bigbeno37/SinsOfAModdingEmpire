export default interface InstallStep {
    download: string;
    extract: {
        from: string;
        to: string;
    }[];
}