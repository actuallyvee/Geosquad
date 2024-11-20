import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";

const RegistrationScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    gender: null,
    userType: null,
  });

  const [genderOpen, setGenderOpen] = useState(false);
  const [userTypeOpen, setUserTypeOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const {
      firstName,
      lastName,
      age,
      dob,
      email,
      password,
      confirmPassword,
      location,
      gender,
      userType,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !dob ||
      !email ||
      !password ||
      !confirmPassword ||
      !location ||
      !gender ||
      !userType
    ) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (userType === "creator") {
      Alert.alert("Success", `Thank you for registering, Creator ${firstName}! Head to your squad!`);
    } else if (userType === "user") {
      Alert.alert("Success", `Thank you for joining, User ${firstName}! Head to your squad!`);
    }
  };

  return (
    <LinearGradient
      colors={["#5377AE", "#4C6EA0", "#4A6B9C", "#364E72", "#223148"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registeration</Text>

        {/* First Name Input */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#364E72"
          onChangeText={(value) => handleInputChange("firstName", value)}
          value={formData.firstName}
        />

        {/* Last Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#364E72"
          onChangeText={(value) => handleInputChange("lastName", value)}
          value={formData.lastName}
        />

        {/* Age Input */}
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#364E72"
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("age", value)}
          value={formData.age}
        />

        {/* DOB Input */}
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          placeholderTextColor="#364E72"
          onChangeText={(value) => handleInputChange("dob", value)}
          value={formData.dob}
        />
        
        {/* Gender Dropdown */}
        <DropDownPicker
          open={genderOpen}
          value={formData.gender}
          items={[
            { label: "Female", value: "female" },
            { label: "Male", value: "male" },
            { label: "Other", value: "other" },
          ]}
          setOpen={setGenderOpen}
          setValue={(value) => handleInputChange("gender", value)}
          placeholder="Select Gender"
          placeholderStyle={{ color: "#364E72" }}
          style={styles.dropdown}
          textStyle={{ color: "#223148" }}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#364E72"
          keyboardType="email-address"
          onChangeText={(value) => handleInputChange("email", value)}
          value={formData.email}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#364E72"
          secureTextEntry
          onChangeText={(value) => handleInputChange("password", value)}
          value={formData.password}
        />

        {/* Confirm Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#364E72"
          secureTextEntry
          onChangeText={(value) => handleInputChange("confirmPassword", value)}
          value={formData.confirmPassword}
        />

        {/* Location Input */}
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#364E72"
          onChangeText={(value) => handleInputChange("location", value)}
          value={formData.location}
        />

        {/* User Type Dropdown */}
        <DropDownPicker
          open={userTypeOpen}
          value={formData.userType}
          items={[
            { label: "Squad Creator", value: "creator" },
            { label: "Regular Member", value: "user" },
          ]}
          setOpen={setUserTypeOpen}
          setValue={(value) => handleInputChange("userType", value)}
          placeholder="Select User Type"
          placeholderStyle={{ color: "#364E72" }}
          style={styles.dropdown}
          textStyle={{ color: "#223148" }}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#F3FA12",
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#A3D132",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#223148",
  },
  dropdown: {
    backgroundColor: "#A3D132",
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdownContainer: {
    backgroundColor: "#C0E05C",
    borderColor: "#A3D132",
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegistrationScreen;

