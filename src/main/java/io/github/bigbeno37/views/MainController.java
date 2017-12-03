package io.github.bigbeno37.views;

import io.github.bigbeno37.models.Mod;
import io.github.bigbeno37.utils.Storage;
import javafx.collections.FXCollections;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.text.Text;

public class MainController {
    @FXML
    private Label author;
    @FXML
    private Label name;
    @FXML
    private Text description;
    @FXML
    private ListView<String> minorModList;
    @FXML
    private ListView<Mod> majorModList = new ListView<>();

    public MainController() {

    }

    @FXML
    private void initialize() {
        majorModList.setItems(FXCollections.observableArrayList(Storage.mods));
        minorModList.setItems(FXCollections.observableArrayList("New Item one", "New Item two"));

        majorModList.setCellFactory(param -> new ListCell<>(){
            @Override
            protected void updateItem(Mod mod, boolean empty) {
                super.updateItem(mod, empty);

                if (!empty && mod != null) {
                    setText(mod.getName());

                    if (mod.isInstalled()) {
                        getStyleClass().add("green");
                    }
                }
            }
        });

        majorModList.getSelectionModel().selectFirst();
        onItemClicked();
    }

    @FXML
    private void onItemClicked() {
        Mod selectedMod = majorModList.getSelectionModel().getSelectedItem();

        name.setText(selectedMod.getName());
        author.setText(selectedMod.getAuthor());
        description.setText(selectedMod.getDescription());
    }

    @FXML
    private void onButtonClicked(ActionEvent actionEvent) {

    }
}
