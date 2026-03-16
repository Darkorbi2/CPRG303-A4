import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text,TouchableOpacity, TextInput, View } from "react-native";
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

const colors = {
  primary:     "#2563EB",
  border:      "#D1D5DB",
  borderError: "#EF4444",
  bgInput:     "#FFFFFF",
  bgError:     "#FEF2F2",
  textMain:    "#111827",
  textLabel:   "#374151",
  textError:   "#DC2626",
  placeholder: "#9CA3AF",
  bgScreen:    "#F9FAFB",
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.bgScreen,
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    margin: 20,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textMain,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.placeholder,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textLabel,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.bgInput,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: colors.textMain,
  },
  inputError: {
    borderColor: colors.borderError,
    backgroundColor: colors.bgError,
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: colors.textError,
    fontWeight: "500",
  },
  showPasswordBtn: {
    alignSelf: "flex-end",
    marginTop: 6,
    marginBottom: 4,
  },
  showPasswordText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  resetButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  resetButtonText: {
    color: colors.textLabel,
    fontSize: 15,
    fontWeight: "600",
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: colors.placeholder,
  },
  signupLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
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
        router.push("/(tabs)/employee")
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
          <View style={styles.formContainer}>

            <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>✉️  Email Address</Text>
            <TextInput
              placeholder="e.g. yourname@company.com"
              placeholderTextColor={colors.placeholder}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              style={[
                styles.input,
                touched.email && errors.email ? styles.inputError : null,
              ]}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>⚠️ {errors.email}</Text>
            )}
          

            <TextInput
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={!showPassword}
              style={
                [styles.input,
                  touched.password && errors.password ? styles.inputError : null,
                ]}
            />
            <TouchableOpacity
              style={styles.showPasswordBtn}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Text style={styles.showPasswordText}>
                {showPassword ? "🙈  Hide Password" : "👁  Show Password"}
              </Text>
            </TouchableOpacity>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>⚠️  {errors.password}</Text>
            )}
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
            <Text style={styles.submitButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Reset */}
          <TouchableOpacity style={styles.resetButton} onPress={() => resetForm()}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.registerRow}>
            <Text style={styles.signupText}>Not registered? </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/employee")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>
      )}
    </Formik>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.bg}>
      <SignupForm />
    </View>
  );
}
