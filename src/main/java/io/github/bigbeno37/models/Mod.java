package io.github.bigbeno37.models;

public class Mod {
    private final String name;
    private final String author;
    private final String description;
    private final String installScript;

    public Mod(String name, String author, String description, String installScript) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.installScript = installScript;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public String getDescription() {
        return description;
    }

    public String getInstallScript() {
        return installScript;
    }
}
