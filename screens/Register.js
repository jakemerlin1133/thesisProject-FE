import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "react-native-vector-icons";
import { BASE_URL } from "../config";

import { Colors } from "../constants/Colors";
import Background from "../components/Background";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();
  const roundedHeight = Math.ceil(height / 100) * 100;
  const marginTop = roundedHeight <= 400 ? 0 : 80;

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [firstnameSubmit, setFirstnameSubmit] = useState("");
  const [middlenameSubmit, setMiddlenameSubmit] = useState("");
  const [lastnameSubmit, setLastnameSubmit] = useState("");
  const [emailSubmit, setEmailSubmit] = useState("");
  const [phoneSubmit, setPhoneSubmit] = useState("");
  const [dobSubmit, setDobSubmit] = useState(null);
  const [selectedRoleSubmit, setSelectedRoleSubmit] = useState(null);
  const [usernameSubmit, setUsernameSubmit] = useState("");
  const [passwordSubmit, setPasswordSubmit] = useState("");
  const [confirmPasswordSubmit, setConfirmPasswordSubmit] = useState("");
  const [isCheckedSubmit, setIsCheckedSubmit] = useState(false);

  const [errorMessage, setErrorMessage] = useState({});

  const roles = [
    { label: "Student", value: "student" },
    { label: "Instructor", value: "instructor" },
    { label: "Admin", value: "admin" },
    { label: "Others", value: "others" },
  ];

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setDob(formattedDate);
      setDobSubmit(formattedDate);

      const calculatedAge = calculateAge(selectedDate);
      setAge(calculatedAge);
    }
  };

  const showDatePicker = () => setShow(true);

  const calculateAge = (dob) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth();
    if (
      month < dob.getMonth() ||
      (month === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async () => {
    const errors = {};
    if (!firstnameSubmit.trim()) {
      errors.firstname = "Firstname is empty.";
    }
    if (!middlenameSubmit.trim()) {
      errors.middlename = "Middllename is empty.";
    }
    if (!lastnameSubmit.trim()) {
      errors.lastname = "Lastname is empty.";
    }
    if (emailSubmit.trim()) {
      if (!validateEmail(emailSubmit)) {
        errors.email = "Invalid email format.";
      }
    } else {
      errors.email = "Email is empty.";
    }
    if (phoneSubmit.trim()) {
      if (phoneSubmit.length < 10) {
        errors.phone = "Phone number must be at least 10 digits long.";
      }
    } else {
      errors.phone = "Phone number is empty.";
    }
    if (!dobSubmit) {
      errors.dob = "Date of Birth is empty.";
    }
    if (!selectedRoleSubmit) {
      errors.role = "Role is empty.";
    }
    if (!usernameSubmit) {
      errors.username = "Username is empty.";
    }
    if (!passwordSubmit) {
      errors.password = "Password is empty.";
    }
    if (!confirmPasswordSubmit) {
      errors.confirmPassword = "Confirm password is empty.";
    }

    if (
      passwordSubmit === confirmPasswordSubmit &&
      passwordSubmit != "" &&
      confirmPasswordSubmit != ""
    ) {
      if (passwordSubmit.length < 8 || confirmPasswordSubmit.length < 8) {
        errors.shortPassword =
          "Your password must be at least 8 characters long and can include letters or numbers.";
      }
    }

    if (passwordSubmit != confirmPasswordSubmit) {
      errors.passwordVerification = "Password does not match.";
    }

    if (!isChecked) {
      errors.termsAndConditions = "You must accept the Terms and Conditions.";
    }
    setErrorMessage(errors);
    if (Object.keys(errors).length === 0) {
      const userData = {
        user_name: usernameSubmit,
        password: passwordSubmit,
        first_name: firstnameSubmit,
        middle_name: middlenameSubmit,
        last_name: lastnameSubmit,
        birthdate: dobSubmit,
        age: age,
        position: selectedRoleSubmit,
        email: emailSubmit,
        phone_number: phoneSubmit,
      };
      try {
        const response = await axios.post(
          `${BASE_URL}/expensense/users/`,
          userData
        );
        console.log("User registered:", response.data);
        navigation.navigate("SuccessRegister");
      } catch (error) {
        console.error(
          "Error submitting form:",
          error.response || error.message
        );
      }
    }
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <View
          style={(styles.Container, [{ marginTop: marginTop, margin: 20 }])}
        >
          <View>
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subTitle}>Create your new account</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.textColor]}
              placeholder="Enter Firstname"
              placeholderTextColor={Colors.brown600}
              value={firstnameSubmit}
              onChangeText={setFirstnameSubmit}
            />
            {errorMessage.firstname && (
              <Text style={styles.errorMessage}>{errorMessage.firstname}</Text>
            )}

            <TextInput
              style={[styles.input, styles.textColor]}
              placeholder="Enter Middlename"
              placeholderTextColor={Colors.brown600}
              value={middlenameSubmit}
              onChangeText={setMiddlenameSubmit}
            />

            {errorMessage.middlename && (
              <Text style={styles.errorMessage}>{errorMessage.middlename}</Text>
            )}

            <TextInput
              style={[styles.input, styles.textColor]}
              placeholder="Enter Lastname"
              placeholderTextColor={Colors.brown600}
              value={lastnameSubmit}
              onChangeText={setLastnameSubmit}
            />

            {errorMessage.lastname && (
              <Text style={styles.errorMessage}>{errorMessage.lastname}</Text>
            )}

            <TextInput
              style={[styles.input, styles.textColor]}
              placeholder="Enter Email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.brown600}
              value={emailSubmit}
              onChangeText={setEmailSubmit}
            />

            {errorMessage.email && (
              <Text style={styles.errorMessage}>{errorMessage.email}</Text>
            )}

            <TextInput
              style={[styles.input, styles.textColor]}
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              placeholderTextColor={Colors.brown600}
              value={phoneSubmit}
              onChangeText={setPhoneSubmit}
            />

            {errorMessage.phone && (
              <Text style={styles.errorMessage}>{errorMessage.phone}</Text>
            )}

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.dateInput, { flex: 1 }]}
                onPress={showDatePicker}
              >
                <Text style={dob ? styles.textColor : styles.placeholderText}>
                  {dob || "Date of Birth"}
                </Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                  maximumDate={new Date()}
                  onChangeText={setDobSubmit}
                />
              )}
              <TextInput
                style={[
                  styles.input,
                  styles.textColor,
                  { flex: 1, marginLeft: 10 },
                ]}
                placeholder="Age"
                keyboardType="numeric"
                placeholderTextColor={Colors.brown600}
                value={age.toString()}
                editable={false}
              />
            </View>

            {errorMessage.dob && (
              <Text style={styles.errorMessage}>{errorMessage.dob}</Text>
            )}

            <RNPickerSelect
              onValueChange={(value) => setSelectedRoleSubmit(value)}
              items={roles}
              style={{
                inputIOS: {
                  ...styles.input,
                  color: Colors.brown500,
                },
                inputAndroid: {
                  ...styles.input,
                  color: Colors.brown500,
                },
                placeholder: {
                  color: Colors.brown600,
                },
              }}
              placeholder={{
                label: "Select Role",
                value: null,
              }}
              value={selectedRoleSubmit}
              onChangeText={setSelectedRoleSubmit}
            />

            {errorMessage.role && (
              <Text style={styles.errorMessage}>{errorMessage.role}</Text>
            )}

            <TextInput
              style={[styles.input, styles.textColor]}
              placeholder="Enter Username"
              placeholderTextColor={Colors.brown600}
              value={usernameSubmit}
              onChangeText={setUsernameSubmit}
            />

            {errorMessage.username && (
              <Text style={styles.errorMessage}>{errorMessage.username}</Text>
            )}

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.textColor, { flex: 1 }]}
                placeholder="Enter Password"
                placeholderTextColor={Colors.brown600}
                secureTextEntry={!passwordVisible}
                value={passwordSubmit}
                onChangeText={setPasswordSubmit}
              />

              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={24}
                  color={Colors.brown600}
                  style={styles.passwordIcon}
                />
              </TouchableOpacity>
            </View>

            {errorMessage.password && (
              <Text style={styles.errorMessage}>{errorMessage.password}</Text>
            )}

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.textColor, { flex: 1 }]}
                placeholder="Confirm Password"
                placeholderTextColor={Colors.brown600}
                secureTextEntry={!passwordVisible2}
                value={confirmPasswordSubmit}
                onChangeText={setConfirmPasswordSubmit}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility2}
                style={styles.iconContainer}
              >
                <Ionicons
                  name={passwordVisible2 ? "eye-off" : "eye"}
                  size={24}
                  color={Colors.brown600}
                  style={styles.passwordIcon2}
                />
              </TouchableOpacity>
            </View>

            {errorMessage.confirmPassword && (
              <Text style={styles.errorMessage}>
                {errorMessage.confirmPassword}
              </Text>
            )}

            {errorMessage.passwordVerification && (
              <Text style={styles.errorMessage}>
                {errorMessage.passwordVerification}
              </Text>
            )}

            {errorMessage.shortPassword && (
              <Text style={styles.errorMessage}>
                {errorMessage.shortPassword}
              </Text>
            )}

            <View style={styles.termsAndConiditonContainer}>
              <TouchableOpacity
                onPress={toggleCheckbox}
                style={styles.checkboxContainer}
              >
                <Ionicons
                  name={isChecked ? "checkbox" : "square-outline"}
                  size={24}
                  color={isChecked ? Colors.brown500 : "gray"}
                />
              </TouchableOpacity>
              <Text style={styles.termsAndConiditonText}>I accept the </Text>
              <TouchableOpacity>
                <Text
                  style={styles.termsAndConiditonLink}
                  onPress={() => navigation.navigate("TermsAndConditions")}
                >
                  Terms and Conditions.
                </Text>
              </TouchableOpacity>
            </View>

            {errorMessage.termsAndConditions && (
              <Text style={styles.errorMessage}>
                {errorMessage.termsAndConditions}
              </Text>
            )}

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={submitHandler}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default Register;

const styles = StyleSheet.create({
  Container: {
    position: "static",
    flex: 1,
  },
  title: {
    fontSize: 55,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.brown50,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 20,
    color: Colors.brown200,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: Colors.brown100,
    marginVertical: 7,
    paddingLeft: 10,
    borderRadius: 7,
  },
  dateInput: {
    backgroundColor: Colors.brown100,
    marginVertical: 7,
    padding: 10,
    borderRadius: 7,
    justifyContent: "center",
  },
  placeholderText: {
    color: Colors.brown600,
  },
  textColor: {
    color: Colors.brown500,
  },
  passwordContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordIcon: {
    position: "absolute",
    paddingVertical: 5,
    paddingHorizontal: 30,
    right: -27,
    top: -5,
  },
  passwordIcon2: {
    position: "absolute",
    paddingVertical: 5,
    paddingHorizontal: 30,
    right: -27,
    top: -5,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  buttonStyle: {
    backgroundColor: Colors.brown500,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  buttonText: {
    color: Colors.brown50,
    fontSize: 18,
    fontWeight: "400",
  },
  termsAndConiditonContainer: {
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
    marginVertical: 6,
  },
  termsAndConiditonText: {
    color: Colors.brown600,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 13,
    marginLeft: 6,
  },
  termsAndConiditonLink: {
    color: Colors.brown300,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  errorMessage: {
    color: Colors.red,
    textAlign: "center",
  },
});
