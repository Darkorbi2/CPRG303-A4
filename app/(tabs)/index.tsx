import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import { auth } from "../../config/firebase";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const colors = {
  primary: "#2563EB",
  secondary: "#6B7280",
  danger: "#EF4444",
  background: "#F3F4F6",
  card: "#FFFFFF",
  border: "#D1D5DB",
  textMain: "#111827",
  textSub: "#6B7280",
  textError: "#DC2626",
  inputBg: "#FFFFFF",
  inputErrorBg: "#FEF2F2",
};

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SigninSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await signInWithEmailAndPassword(auth, values.email, values.password);
          resetForm();
          router.replace("/protected/employee");
        } catch (error: any) {
          let message = "An unknown error occurred. Please try again.";
          if (error.code) {
            switch (error.code) {
              case "auth/invalid-email":
                message = "That email is invalid.";
                break;
              case "auth/user-disabled":
                message = "This user account has been disabled.";
                break;
              case "auth/user-not-found":
                message = "No user found with this email.";
                break;
              case "auth/wrong-password":
                message = "The password is incorrect.";
                break;
              case "auth/too-many-requests":
                message = "Too many login attempts. Please try again later.";
                break;
            }
          }
          Alert.alert("Login Error", message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.formContainer}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={colors.textSub}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={[
                styles.input,
                touched.email && errors.email && styles.inputError,
              ]}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={colors.textSub}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={[
                styles.input,
                touched.password && errors.password && styles.inputError,
              ]}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.buttonSpacing}>
            <Button
              title={showPassword ? "Hide Password" : "Show Password"}
              onPress={() => setShowPassword((prev) => !prev)}
              color={colors.secondary}
            />
          </View>

          <View style={styles.buttonSpacing}>
            <Button title="Login" onPress={() => handleSubmit()} color={colors.primary} />
          </View>

          <View style={styles.linkSection}>
            <Text style={styles.linkText}>Not registered yet?</Text>
            <View style={styles.linkButton}>
              <Button
                title="Create Account"
                onPress={() => router.push("/sign-up")}
                color={colors.primary}
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default function SignInScreen() {
  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>
      <SigninForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textMain,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSub,
    marginTop: 6,
  },
  formContainer: {
    margin: 20,
    padding: 24,
    backgroundColor: colors.card,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: colors.textMain,
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: colors.inputErrorBg,
  },
  errorText: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textError,
  },
  buttonSpacing: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  linkSection: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: colors.textSub,
    marginBottom: 8,
  },
  linkButton: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
});