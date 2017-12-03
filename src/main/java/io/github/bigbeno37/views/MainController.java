package io.github.bigbeno37.views;

import javafx.collections.FXCollections;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
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
    private ListView<String> majorModList = new ListView<>();

    public MainController() {

    }

    @FXML
    private void initialize() {
        majorModList.setItems(FXCollections.observableArrayList("Item one", "Item two"));
        minorModList.setItems(FXCollections.observableArrayList("New Item one", "New Item two"));
    }

    @FXML
    private void onButtonClicked(ActionEvent actionEvent) {

    }
}
