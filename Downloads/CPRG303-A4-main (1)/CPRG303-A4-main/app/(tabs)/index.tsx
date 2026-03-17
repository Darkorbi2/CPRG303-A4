import { router } from "expo-router";
import { Formik } from "formik";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
        Alert.alert(`Name: ${values.fullName}`, `Email: ${values.email}`);
        resetForm();
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
          {/* Email Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              placeholder="you@company.com"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange("email")}
              onBlur={(e) => {
                handleBlur("email")(e);
                setFocusedField(null);
              }}
              onFocus={() => setFocusedField("email")}
              value={values.email}
              style={[
                styles.inputBox,
                focusedField === "email" && styles.inputFocused,
                errors.email && touched.email && styles.inputError,
              ]}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
          </View>

          {/* Password Field */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.toggleText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange("password")}
              onBlur={(e) => {
                handleBlur("password")(e);
                setFocusedField(null);
              }}
              onFocus={() => setFocusedField("password")}
              value={values.password}
              style={[
                styles.inputBox,
                focusedField === "password" && styles.inputFocused,
                errors.password && touched.password && styles.inputError,
              ]}
              secureTextEntry={!showPassword}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleSubmit()}
            activeOpacity={0.85}
          >
            <Text style={styles.submitText}>Sign in</Text>
          </TouchableOpacity>

          {/* Reset */}
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => resetForm()}
            activeOpacity={0.7}
          >
            <Text style={styles.resetText}>Clear form</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Sign up link */}
          <View style={styles.registerButton}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/sign-up")}>
              <Text style={styles.signupLink}>Create one</Text>
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
      <View style={styles.card}>
        {/* Logo / Brand mark */}
        <View style={styles.logoMark} />

        {/* Header */}
        <Text style={styles.heading}>Sign in</Text>
        <Text style={styles.subheading}>
          Enter your credentials to continue
        </Text>

        <SigninForm />
      </View>
    </View>
  );
}

const BLUE = "#2563eb";
const BLUE_DARK = "#1d4ed8";
const BORDER = "#e5e7eb";
const BORDER_FOCUS = "#93c5fd";
const BORDER_ERROR = "#fca5a5";
const TEXT_MAIN = "#111827";
const TEXT_MUTED = "#6b7280";
const BG_PAGE = "#f3f4f6";
const BG_CARD = "#ffffff";
const BG_INPUT = "#fafafa";
const RED_TEXT = "#dc2626";

const styles = StyleSheet.create({
  bg: {
    backgroundColor: BG_PAGE,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 32,
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: BORDER,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: { elevation: 3 },
    }),
  },

  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: BLUE,
    marginBottom: 24,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_MAIN,
    marginBottom: 4,
    letterSpacing: -0.3,
  },

  subheading: {
    fontSize: 14,
    color: TEXT_MUTED,
    marginBottom: 28,
  },

  container: {
    gap: 0,
  },

  fieldGroup: {
    marginBottom: 18,
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: "500",
    color: TEXT_MAIN,
    marginBottom: 6,
  },

  toggleText: {
    fontSize: 13,
    fontWeight: "500",
    color: BLUE,
  },

  inputBox: {
    backgroundColor: BG_INPUT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 14,
    fontSize: 15,
    color: TEXT_MAIN,
  },

  inputFocused: {
    borderColor: BORDER_FOCUS,
    backgroundColor: "#fff",
  },

  inputError: {
    borderColor: BORDER_ERROR,
    backgroundColor: "#fff5f5",
  },

  error: {
    color: RED_TEXT,
    fontSize: 12,
    marginTop: 5,
  },

  submitButton: {
    backgroundColor: BLUE,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 8,
  },

  submitText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.1,
  },

  resetButton: {
    alignItems: "center",
    paddingVertical: 12,
  },

  resetText: {
    color: TEXT_MUTED,
    fontSize: 13,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    gap: 10,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },

  dividerText: {
    fontSize: 12,
    color: TEXT_MUTED,
  },

  registerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },

  signupButton: {},

  signupText: {
    fontSize: 14,
    color: TEXT_MUTED,
  },

  signupLink: {
    fontSize: 14,
    color: BLUE,
    fontWeight: "600",
  },
});