import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import EntryAndEdit from "./pages/EntryAndEdit";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "./pages/Details";

const Stack = createNativeStackNavigator();

export default function App() {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        location: "Yangon",
        parking: "No",
        difficulty: "Easy",
        description: "",
        id:null,
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleCancel = () => {
        setFormData({
            name: "",
            date: "",
            location: "Yangon",
            parking: "No",
            difficulty: "Easy",
            description: "",
        });
    };

    const handleNext = () => {
        // You can access the form data in the "formData" state and save it to your desired location.
        console.log(formData);
        // Add your logic to save the data here.
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="EntryAndEdit" component={EntryAndEdit} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
