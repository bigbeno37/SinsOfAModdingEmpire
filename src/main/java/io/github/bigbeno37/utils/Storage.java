package io.github.bigbeno37.utils;

import io.github.bigbeno37.models.Mod;

import java.util.ArrayList;
import java.util.List;

public class Storage {

    public static List<Mod> mods = new ArrayList<>();

    public static void importMods() {
        mods.add(new Mod("Sins of a Solar Empire: Rebellion", "Ironclad Studios", "The base game", "", true));
        mods.add(new Mod("Star Trek: Armada III", "Somebody", "A Star Trek mod", "", false));
    }
}
