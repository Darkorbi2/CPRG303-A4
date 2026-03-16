import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .min(8, "Password must be at least 8 characters")
    .required("Confirm password is required"),
});

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        Alert.alert(
          `Name: ${values.fullName}`,
          `Email: ${values.email}`,
        );
        resetForm()
        setSubmitting(false);
        router.push("/(tabs)")
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
              placeholder="Full Name"
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
              style={styles.inputBox}
            />
            {errors.fullName && touched.fullName && (
                <Text style={styles.error}>{errors.fullName}</Text>
              )}
            
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
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TextInput
              placeholder="Confirm Password"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              style={styles.inputBox}
              secureTextEntry={!showPassword}
            />
            <Button title={showPassword ? "Hide Password" : "Show Password"} onPress={() => setShowPassword(prev => !prev)}
                color={"red"}  
              />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.submitButton}>
              <Button onPress={() => handleSubmit()} title="Submit" />
            </View>
            
            <View style={styles.resetButton}>
              <Button onPress={() => resetForm()} title="Reset" color="red" />
            </View>

            <View style={styles.signinButton}>
              <Text style={styles.signinText}>Already Registered? </Text>
              <Button title="Sign In " onPress={() => router.push("/(tabs)")} />
            </View>
          </View>
        )}
    </Formik>
  )  
}

export default function HomeScreen() {
  return (
  <View style={styles.bg}>
    <SignupForm />
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
  submitButton: {},
  resetButton: {},
  signinButton: {},
  signinText: {},
  container: {},
});