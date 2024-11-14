import React, { useState, useEffect } from "react";
import { TextInput, View } from "react-native";
import { Text, ListItem, Button, CheckBox } from "@rneui/themed";
// import SelectDropdown from "react-native-select-dropdown";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EntryAndEdit = ({route, navigation}) => {

    const [formData, setFormData] = useState(route.params);
//    const navigation = useNavigation();
    useEffect(() => {
        console.log(formData)
    }, []);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                label="Name"
                placeholder="Enter Hike name"
                value={formData.name}
                onChangeText={text => handleInputChange("name", text)}
            />
            <TextInput
                style={styles.input}
                label="Date"
                placeholder="Date of the Hike"
                value={formData.date}
                onChangeText={text => handleInputChange("date", text)}
            />
            <TextInput
                style={styles.input}
                label="Description"
                placeholder="Enter description"
                value={formData.description}
                onChangeText={text => handleInputChange("description", text)}
            />
            <View style={styles.checkbox}>
                <ListItem.CheckBox
                    title="Parking"
                    checked={formData.parking === "Yes"}
                    onPress={() =>
                        handleInputChange(
                            "parking",
                            formData.parking === "Yes" ? "No" : "Yes"
                        )
                    }
                />
            </View>
            <Text style={{ fontWeight: "bold" }}>Location:</Text>

            <Picker
                selectedValue={formData.location}
                onValueChange={(itemValue, itemIndex) =>
                    handleInputChange("location", itemValue)
                }
            >
                <Picker.Item label="Yangon" value="Yangon" />
                <Picker.Item label="Mandalay" value="Mandalay" />
                <Picker.Item label="Shan" value="Shan" />
            </Picker>
            <Text style={{ fontWeight: "bold" }}>Difficulty:</Text>

            <Picker
                selectedValue={formData.difficulty}
                onValueChange={(itemValue, itemIndex) =>
                    handleInputChange("difficulty", itemValue)
                }
            >
                <Picker.Item label="Easy" value="Easy" />
                <Picker.Item label="Hard" value="Hard" />
                <Picker.Item label="Middle" value="Middle" />
            </Picker>
            <View style={styles.buttonGroup}>
                <View style={styles.btn}>
                    <Button
                        color={"grey"}
                        title="Cancel"
                    />
                </View>
                <View style={styles.btn}>
                    <Button
                        title="Next"
                        onPress={() => {
                            navigation.navigate("Details", formData);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginHorizontal: 20,
        backgroundColor: "#fff",
    },
    input: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
    },
    checkbox: {
        padding: 5,
        marginVertical: 20,
    },
    buttonGroup: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 50,
    },
    btn: {
        flex: 1,
        height: 50,
    },
});

export default EntryAndEdit;
