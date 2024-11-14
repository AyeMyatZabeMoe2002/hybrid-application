import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Text, ListItem, Button, CheckBox } from "@rneui/themed";
// import SelectDropdown from "react-native-select-dropdown";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('mHike.db');

const Details = ({route, navigation}) => {

    const [formData, setFormData] = useState(route.params);
    const handleCancel = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };

    const save = () => {
        db.transaction(tx => {
              tx.executeSql('INSERT INTO tblHike (name, location, hike_date, parking, length, difficulty, description, additional1, additional2, additionalnum1, additionalnum2) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [formData.name, formData.location, formData.date, formData.parking, 1, formData.difficulty, formData.description, null, null, null, null],
                (txObj, resultSet) => {
                    navigation.navigate("HomePage");
                },
                (txObj, error) => console.log('Error', error))
        })
    };

    const update = () => {
        db.transaction(tx => {
              tx.executeSql('UPDATE tblHike SET name=?, location=?, hike_date=?, parking=?, length=?, difficulty=?, description=?, additional1=?, additional2=?, additionalnum1=?, additionalnum2=? where id=?',
              [formData.name, formData.location, formData.date, formData.parking, 1, formData.difficulty, formData.description, null, null, null, null, formData.id],
                (txObj, resultSet) => {
                    navigation.navigate("HomePage");
                },
                (txObj, error) => console.log('Error', error))
        })
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>
                    <Text style={styles.boldText}>Hike Name:</Text>
                    
                    <Text style={styles.boldBind}>{formData.name}</Text>
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>
                    <Text style={styles.boldText}>Date of the hike:</Text>
                    
                    <Text style={styles.boldBind}>{formData.date}</Text>
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>
                    <Text style={styles.boldText}>Description:</Text>
                    
                    <Text style={styles.boldBind}>{formData.description}</Text>
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>
                    <Text style={styles.boldText}>Parking available:</Text>
                    
                    <Text style={styles.boldBind}>{formData.parking}</Text>
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>
                    <Text style={styles.boldText}>Location of the hike:</Text>
                    
                    <Text style={styles.boldBind}>{formData.location}</Text>
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>
                    <Text style={styles.boldText}>Difficulty:</Text>
                    <Text style={styles.boldBind}>{formData.difficulty} </Text>
                    
                </Text>
            </View>

            <View style={styles.buttonGroup}>
                <View style={styles.btn}>
                    <Button
                        color={"grey"}
                        title="Cancel"
                        onPress={handleCancel}
                    />
                </View>
                <View style={styles.btn}>
                    <Button title="Save"
                        onPress={() => formData.id? update() : save()}
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
    textContainer: {
        marginLeft: 10, // Add some spacing between the square and text
        marginBottom: 20,
    },
    itemText: {
        marginBottom: 5, // Add some margin between each piece of text
    },
    boldText: {
        // fontWeight: "bold", // Make the text bold
        fontSize: 20,
    },
    boldBind: {
        fontWeight: "bold", // Make the text bold
        fontSize: 20,
    }
});

export default Details;
