/**
 * A step to be completed in installing a mod. Multiple steps may be required
 * in the case of patches being released for instance
 */
export default interface InstallStep {
    /**
     * A URL to the ModDB download page
     */
    download: string;

    /**
     * A list of extraction steps. Note that all common compression types
     * (zip, rar, tar.gz, 7z) are supported. Also note that if required,
     * files will be overwritten after extraction
     * TODO: Support all common compression types
     */
    extract: {
        /**
         * What in the archive should be extracted. This can either be a filename, folder name,
         * or ALL if everything in the archive should be extracted
         */
        from: string | 'ALL';

        /**
         * Where the specified files / folders should be extracted to. A valid destination
         * URL is in the format 'MODSDIR/<your path here>', e.g. 'MODSDIR/Your Mod/'.
         *
         * If the extracted files and folders should be extracted to the base MODSDIR directory,
         * simply leave this as 'MODSDIR'
         */
        to: string | 'MODSDIR';
    }[];
}