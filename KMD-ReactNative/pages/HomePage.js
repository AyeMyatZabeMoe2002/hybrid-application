import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Task from "../components/Task";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';
import { useState } from "react";


const db = SQLite.openDatabase('mHike.db');

const HomePage = ({ navigation }) => {
    //    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [rowsData, setRowsData] = useState([]);

    
    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const fetchData = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tblHike',
                null,
                (txObj, { rows: { _array } }) => {
                    setRowsData(_array);
                },
                (txObj, error) => console.log('Error ', error)
            );
        });
    };

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS tblHike (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, hike_date TEXT, parking VARCHAR(3), length REAL, difficulty VARCHAR(128), description TEXT, additional1 TEXT, additional2 TEXT, additionalnum1 REAL, additionalnum2 REAL)'
            )
        });

        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql(
                'SELECT * FROM tblHike', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => { setRowsData(_array); },
                // failure callback which sends two things Transaction object and Error
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        });

    }, []);

    const refreshData = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tblHike',
                null,
                (txObj, { rows: { _array } }) => {
                    setRowsData(_array);
                },
                (txObj, error) => console.log('Error ', error)
            );
        });
    };
    
    useEffect(() => {
        // Initial fetch when the component mounts
        refreshData();
    }, []);

    return (
        <View>
            <View style={styles.tasksWarpper}>
                <Text style={styles.sectionTitle}>Hiker List View</Text>

                <View style={styles.items}>

                    {rowsData.map(item => (
                        <Task
                            formData={{
                                name: item.name,
                                date: item.hike_date,
                                location: item.location,
                                parking: item.parking,
                                difficulty: item.difficulty,
                                description: item.description,
                                id: item.id,
                            }}
                            key={item.id}
                            refreshData={refreshData}
                        />
                    ))}
                    {/*<Task
                        formData={formData}
                        text={"Task 1"}
                        date={"20/4/2000"}
                        location={"Yangon"}
                    />
                    <Task
                        formData={formData}
                        text={"Task 2"}
                        date={"20/4/2000"}
                        location={"Yangon"}
                    />
                    <Task
                        formData={formData}
                        text={"Task 2"}
                        date={"20/4/2000"}
                        location={"Yangon"}
                    />
                    <Task
                        formData={formData}
                        text={"Task 2"}
                        date={"20/4/2000"}
                        location={"Yangon"}
                    />*/}

                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}
                        onPress={() => {
                            navigation.navigate("EntryAndEdit", {
                                name: "",
                                date: "",
                                location: "Yangon",
                                parking: "No",
                                difficulty: "Easy",
                                description: "",
                                id: null,
                            });
                        }}
                    >+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#230cf0",
    },
    tasksWarpper: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "900",
    },
    items: {
        marginTop: 30,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    button: {
        backgroundColor: "green", // Customize button style
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white", // Customize button text style
        fontSize: 30,
        fontWeight: "bold",
    },
});

export default HomePage;
