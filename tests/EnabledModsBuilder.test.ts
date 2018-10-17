import EnabledModsBuilder from '../src/models/EnabledModsBuilder';
import * as os from "os";

let builder: EnabledModsBuilder;

describe('Enabled Mods Builder', () => {
    beforeEach(() => {
        builder = new EnabledModsBuilder();
    });

    it('handles zero enabled mods correctly', () => {
        expect(builder.toString()).toBe(`TXT${os.EOL}Version 0${os.EOL}enabledModNameCount 0${os.EOL}`);

    });

    it('outputs correct information for one enabled mod', () => {
        builder.addMod('test');

        expect(builder.toString()).toBe(`TXT${os.EOL}Version 0${os.EOL}enabledModNameCount 1${os.EOL}test${os.EOL}`);
    });

    it('outputs correct information for two enabled mods', () => {
        builder.addMod('test').addMod('test 2');

        expect(builder.toString()).toBe(`TXT${os.EOL}Version 0${os.EOL}enabledModNameCount 2${os.EOL}test${os.EOL}test 2${os.EOL}`);
    });

    it('doesn\'t add mod if title is empty', () => {
        builder.addMod('');

        expect(builder.toString()).toBe(`TXT${os.EOL}Version 0${os.EOL}enabledModNameCount 0${os.EOL}`);
    });

    it('doesn\'t add mod if title is empty in chain', () => {
        builder.addMod('test').addMod('');

        expect(builder.toString()).toBe(`TXT${os.EOL}Version 0${os.EOL}enabledModNameCount 1${os.EOL}test${os.EOL}`);
    });

});