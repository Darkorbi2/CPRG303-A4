import { router } from "expo-router";
import { Formik } from "formik";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";
import { useState } from "react";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SigninSchema}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        Alert.alert(
          `Name: ${values.fullName}`,
          `Email: ${values.email}`,
        );
        resetForm()
        setSubmitting(false);
        router.push("/(tabs)/employee");
      }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          resetForm,
        }) => (
          <View style={styles.container}>
            
            <TextInput
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.inputBox}
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.inputBox}
              secureTextEntry={!showPassword}
            />
            <Button title={showPassword ? "Hide Password" : "Show Password"} onPress={() => setShowPassword(prev => !prev)}
              color={"red"}  
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <View style={styles.submitButton}>
              <Button onPress={() => handleSubmit()} title="Submit" />
            </View>
            
            <View style={styles.resetButton}>
              <Button onPress={() => resetForm()} title="Reset" color="red" />
            </View>

            <View style={styles.registerButton}>
              <Text style={styles.signupText}>Not Registered? </Text>
              <Button title="Sign Up " onPress={() => router.push("/(tabs)/sign-up")} />
            </View>     
          </View>
        )}
    </Formik>
  );
}

export default function HomeScreen() {
  return (
  <View style={styles.bg}>
    <SigninForm />
  </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "green",
    height: "100%",
  },

  inputBox: {
    borderWidth: 1,
    backgroundColor: "red",
    marginBottom: 5,
    padding: 8,
  },
  
  error: {
    color: "black",
    fontSize: 14,
  },
  registerButton: {},
  submitButton: {},
  resetButton: {},
  signupButton: {},
  signupText: {},
  container: {},
});