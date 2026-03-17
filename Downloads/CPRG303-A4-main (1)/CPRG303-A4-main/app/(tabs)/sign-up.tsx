import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, ScrollView } from "react-native";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .min(8, "Password must be at least 8 characters")
    .required("Confirm password is required"),
});

const BLUE = "#2563eb";
const BORDER = "#e5e7eb";
const BORDER_FOCUS = "#93c5fd";
const BORDER_ERROR = "#fca5a5";
const TEXT_MAIN = "#111827";
const TEXT_MUTED = "#6b7280";
const BG_INPUT = "#fafafa";
const RED_TEXT = "#dc2626";

type FieldProps = {
  label: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
};

const Field = ({ label, error, touched, children }: FieldProps) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>{label}</Text>
    {children}
    {error && touched && <Text style={styles.error}>{error}</Text>}
  </View>
);

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputStyle = (field: string, hasError: boolean) => [
    styles.inputBox,
    focusedField === field && styles.inputFocused,
    hasError && styles.inputError,
  ];

  return (
    <Formik
      initialValues={{ fullName: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        Alert.alert(`Name: ${values.fullName}`, `Email: ${values.email}`);
        resetForm();
        setSubmitting(false);
        router.push("/(tabs)");
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
        <View style={styles.container}>

          <Field label="Full name" error={errors.fullName} touched={touched.fullName}>
            <TextInput
              placeholder="Jane Smith"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange("fullName")}
              onBlur={(e) => { handleBlur("fullName")(e); setFocusedField(null); }}
              onFocus={() => setFocusedField("fullName")}
              value={values.fullName}
              autoCapitalize="words"
              style={inputStyle("fullName", !!(errors.fullName && touched.fullName))}
            />
          </Field>

          <Field label="Email address" error={errors.email} touched={touched.email}>
            <TextInput
              placeholder="you@company.com"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange("email")}
              onBlur={(e) => { handleBlur("email")(e); setFocusedField(null); }}
              onFocus={() => setFocusedField("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              style={inputStyle("email", !!(errors.email && touched.email))}
            />
          </Field>

          <Field label="Password" error={errors.password} touched={touched.password}>
            <View style={styles.labelRow}>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                onChangeText={handleChange("password")}
                onBlur={(e) => { handleBlur("password")(e); setFocusedField(null); }}
                onFocus={() => setFocusedField("password")}
                value={values.password}
                secureTextEntry={!showPassword}
                style={inputStyle("password", !!(errors.password && touched.password))}
              />
            </View>
          </Field>

          <Field label="Confirm password" error={errors.confirmPassword} touched={touched.confirmPassword}>
            <View style={styles.confirmRow}>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                onChangeText={handleChange("confirmPassword")}
                onBlur={(e) => { handleBlur("confirmPassword")(e); setFocusedField(null); }}
                onFocus={() => setFocusedField("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={!showPassword}
                style={inputStyle("confirmPassword", !!(errors.confirmPassword && touched.confirmPassword))}
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.toggleText}>{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          </Field>

          <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()} activeOpacity={0.85}>
            <Text style={styles.submitText}>Create account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={() => resetForm()} activeOpacity={0.7}>
            <Text style={styles.resetText}>Clear form</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.signinButton}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)")}>
              <Text style={styles.signinLink}>Sign in</Text>
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
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.logoMark} />
          <Text style={styles.heading}>Create account</Text>
          <Text style={styles.subheading}>Sign up to get started</Text>
          <SignupForm />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#f3f4f6",
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 32,
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: BORDER,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 12 },
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

  container: {},

  fieldGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "500",
    color: TEXT_MAIN,
    marginBottom: 6,
  },

  labelRow: {},

  confirmRow: {
    gap: 8,
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
    backgroundColor: "#ffffff",
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

  toggleButton: {
    alignSelf: "flex-end",
  },

  toggleText: {
    fontSize: 13,
    fontWeight: "500",
    color: BLUE,
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

  signinButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },

  signinText: {
    fontSize: 14,
    color: TEXT_MUTED,
  },

  signinLink: {
    fontSize: 14,
    color: BLUE,
    fontWeight: "600",
  },
});