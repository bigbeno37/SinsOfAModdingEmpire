import {dialog} from 'electron';

export class Utils {
    public static showErrorDialog(message: string) {
        dialog.showMessageBox({
            type: 'error',
            message
        });
    }

    public static showOpenFileDialog(...extensions: string[]): string {
        return (dialog.showOpenDialog({
           filters: [
               {
                   name: 'Supported extensions',
                   extensions
               }
           ]
        }) as string[])[0];
    }

    public static showOpenFolderDialog(): string {
        return (dialog.showOpenDialog({
            properties: ['openDirectory']
        }) as string[])[0];
    }
}