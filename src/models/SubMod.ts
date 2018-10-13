import SubModData from '../interfaces/SubModData';

export default class SubMod implements SubModData{
    name: string;
    enabledModsName: string;
    required: boolean;
    isEnabled: boolean;


    constructor(name: string, enabledModsName: string, required: boolean, isEnabled: boolean = true) {
        this.name = name;
        this.enabledModsName = enabledModsName;
        this.required = required;
        this.isEnabled = isEnabled;
    }

    // If not required, enable / disable the sub selectedMod depending on previous state
    toggleEnable () {
        if (!this.required) this.isEnabled = !this.isEnabled;
    }
}