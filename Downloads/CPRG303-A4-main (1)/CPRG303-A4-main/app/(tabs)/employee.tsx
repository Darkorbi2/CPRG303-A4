import { Formik } from "formik";
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { router } from "expo-router";
import { useState } from "react";

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
  focused: boolean;
  children: React.ReactNode;
};

const Field = ({ label, error, touched, focused, children }: FieldProps) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>{label}</Text>
    {children}
    {error && touched && <Text style={styles.error}>{error}</Text>}
  </View>
);

const MyForm = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
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

          <Field label="Full name" error={errors.fullName} touched={touched.fullName} focused={focusedField === "fullName"}>
            <TextInput
              placeholder="Jane Smith"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange("fullName")}
              onBlur={(e) => { handleBlur("fullName")(e); setFocusedField(null); }}
              onFocus={() => setFocusedField("fullName")}
              value={values.fullName}
              autoCapitalize="words"
              style={[styles.inputBox, focusedField === "fullName" && styles.inputFocused, errors.fullName && touched.fullName && styles.inputError]}
            />
          </Field>

          <Field label="Date of birth" error={errors.DoB as string} touched={touched.DoB} focused={focusedField === "DoB"}>
            <TextInput
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange("DoB")}
              onBlur={(e) => { handleBlur("DoB")(e); setFocusedField(null); }}
              onFocus={() => setFocusedField("DoB")}
              value={values.DoB}
              style={[styles.inputBox, focusedField === "DoB" && styles.inputFocused, errors.DoB && touched.DoB && styles.inputError]}
            />
          </Field>

          <Field label="Email address" error={errors.email} touched={touched.email} focused={focusedField === "email"}>
            <TextInput
              placeholder="you@company.com"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange("email")}
              onBlur={(e) => { handleBlur("email")(e); setFocusedField(null); }}
              onFocus={() => setFocusedField("email")}
              value={values.email}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[styles.inputBox, focusedField === "email" && styles.inputFocused, errors.email && touched.email && styles.inputError]}
            />
          </Field>

          <Field label="Phone number" error={errors.phoneNumber} touched={touched.phoneNumber} focused={focusedField === "phoneNumber"}>
            <TextInput
              placeholder="###-###-####"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange("phoneNumber")}
              onBlur={(e) => { handleBlur("phoneNumber")(e); setFocusedField(null); }}
              onFocus={() => setFocusedField("phoneNumber")}
              value={values.phoneNumber}
              keyboardType="phone-pad"
              style={[styles.inputBox, focusedField === "phoneNumber" && styles.inputFocused, errors.phoneNumber && touched.phoneNumber && styles.inputError]}
            />
          </Field>

          <Field label="Job title" error={errors.jobTitle} touched={touched.jobTitle} focused={focusedField === "jobTitle"}>
            <TextInput
              placeholder="e.g. Software Engineer"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange("jobTitle")}
              onBlur={(e) => { handleBlur("jobTitle")(e); setFocusedField(null); }}
              onFocus={() => setFocusedField("jobTitle")}
              value={values.jobTitle}
              style={[styles.inputBox, focusedField === "jobTitle" && styles.inputFocused, errors.jobTitle && touched.jobTitle && styles.inputError]}
            />
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

          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)")}>
              <Text style={styles.logoutLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

        </View>
      )}
    </Formik>
  );
};

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.logoMark} />
          <Text style={styles.heading}>Create account</Text>
          <Text style={styles.subheading}>Fill in your details to get started</Text>
          <MyForm />
        </View>
      </ScrollView>
    </SafeAreaView>
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

  inputContainer: {
    gap: 0,
  },

  fieldGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "500",
    color: TEXT_MAIN,
    marginBottom: 6,
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

  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },

  logoutText: {
    fontSize: 14,
    color: TEXT_MUTED,
  },

  logoutLink: {
    fontSize: 14,
    color: BLUE,
    fontWeight: "600",
  },
});