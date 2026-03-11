import { Formik } from "formik";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { router } from "expo-router";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  DoB: Yup.date()
    .required("Date of birth is required")
    .typeError("Invalid date format, please use YYYY-MM-DD"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Please put in the format ###-###-####")
    .min(12, "please put in the format ###-###-####")
    .max(12, "please put in the format ###-###-####")
    .required("Phone number is required use the format ###-###-####"),
  jobTitle: Yup.string().required("Job title is required"),
});

const MyForm = () => (
  <Formik
    initialValues={{
      fullName: "",
      DoB: "",
      email: "",
      phoneNumber: "",
      jobTitle: "",
    }}
    validationSchema={SignupSchema}
    onSubmit={(values, { resetForm }) => {
      Alert.alert(
        `Name: ${values.fullName}\nDoB: ${values.DoB}`,
        `Email: ${values.email}\nPhone: ${values.phoneNumber}\nTitle: ${values.jobTitle}`,
      );
      resetForm();
      router.push("/(tabs)");
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
      <View style={styles.inputContainer}>
        <View>
          {errors.fullName && touched.fullName ? (
            <Text>{errors.fullName}</Text>
          ) : null}
          <TextInput
            placeholder="Full Name"
            onChangeText={handleChange("fullName")}
            onBlur={handleBlur("fullName")}
            value={values.fullName}
            autoCapitalize="words"
            style={styles.inputBox}
          />
        </View>

        <View>
          {errors.DoB && touched.DoB ? <Text>{errors.DoB}</Text> : null}
          <TextInput
            placeholder="Date of Birth, put in the format YYYY-MM-DD"
            onChangeText={handleChange("DoB")}
            onBlur={handleBlur("DoB")}
            value={values.DoB}
            style={styles.inputBox}
          />
        </View>

        <View>
          {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
          <TextInput
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            autoCapitalize="none"
            style={styles.inputBox}
            keyboardType="email-address"
          />
        </View>

        <View>
          {errors.phoneNumber && touched.phoneNumber ? (
            <Text>{errors.phoneNumber}</Text>
          ) : null}
          <TextInput
            placeholder="Phone Number"
            onChangeText={handleChange("phoneNumber")}
            onBlur={handleBlur("phoneNumber")}
            value={values.phoneNumber}
            style={styles.inputBox}
            keyboardType="phone-pad"
          />
        </View>

        <View>
          {errors.jobTitle && touched.jobTitle ? (
            <Text>{errors.jobTitle}</Text>
          ) : null}
          <TextInput
            placeholder="Job Title"
            onChangeText={handleChange("jobTitle")}
            onBlur={handleBlur("jobTitle")}
            value={values.jobTitle}
            style={styles.inputBox}
          />
        </View>

        <View style={styles.submitButton}>
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>

        <View style={styles.resetButton}>
          <Button onPress={() => resetForm()} title="Reset" color="red" />
        </View>

        <View style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logged In </Text>
          <Button title="Logout " onPress={() => router.push("/(tabs)")} />
        </View>
      </View>
    )}
  </Formik>
);

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.bg}>
      <MyForm />
    </SafeAreaView>
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

  submitButton: {},
  resetButton: {},
  logoutButton: {},
  logoutText: {},
  inputContainer: {},
});