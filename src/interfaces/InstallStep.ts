/**
 * Represents a step in the process of installing a mod. Each step assumes it will download
 * an archive, and extract the entirety of its contents or a subset to the mods directory.
 * Each installation step will automatically overwrite any files if necessary.
 *
 * For a basic install step, here's an example:
 * ```
 * {
 *     download: "https://...",
 *     extract: "ALL"
 * }
 * ```
 *
 * If this is to patch a directory in a previous step, something like the following can be used
 * ```
 * {
 *     download: "...",
 *     extract: "ALL",
 *     to: "SinsMod"
 * }
 * ```
 *
 * In the event off only wanting a specific set of directories / files to be extracted, this can be used:
 * ```
 * {
 *     download: "...",
 *     extract: "SinsMod/,README.txt"
 * }
 * ```
 */
export default interface InstallStep {
    /**
     * A URL to the archive to be downloaded
     */
    download: string;

    /**
     * The directories / files to be extracted, separated by a comma (,). Mark directories with a forward slash (/)
     * and refer to files as you normally would (e.g. file.txt).
     *
     * If everything should be extracted, use "ALL"
     */
    extract: string | "ALL";

    /**
     * Where to extract the directories / files starting from the mods directory. If not
     * specified, directories / files will be extracted to the root of the mods directory
     */
    to?: string;
}