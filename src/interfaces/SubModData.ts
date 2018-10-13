/**
 * Represents a component of a mod that can be enabled / disabled
 */
export default interface SubModData {
    name: string;
    /**
     * How to enable this component of the mod via enableMods.txt
     */
    enabledModsName: string;

    /**
     * If required, this component cannot be turned off
     */
    required: boolean;
}