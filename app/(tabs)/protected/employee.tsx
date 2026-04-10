import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import {
  getEmployeeForm,
  getEmployeeList,
  removeEmployeeForm,
  removeEmployeeList,
  saveEmployeeForm,
  saveEmployeeList,
} from "../../../config/storage";
import { auth } from "../../../config/firebase";

const EmployeeSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  DoB: Yup.date()
    .required("Date of birth is required")
    .typeError("Invalid date format, please use YYYY-MM-DD"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Please use format ###-###-####")
    .required("Phone number is required"),
  jobTitle: Yup.string().required("Job title is required"),
});

type EmployeeFormValues = {
  fullName: string;
  DoB: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
};

type Employee = EmployeeFormValues & {
  id: string;
};

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

const MyForm = () => {
  const [initialValues, setInitialValues] = useState<EmployeeFormValues>({
    fullName: "",
    DoB: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedData = async () => {
      const savedForm = await getEmployeeForm();
      const savedEmployees = await getEmployeeList();

      if (savedForm) {
        setInitialValues(savedForm);
      }

      if (savedEmployees) {
        setEmployees(savedEmployees);
      }

      setLoading(false);
    };

    loadSavedData();
  }, []);

  const handleDeleteEmployee = async (id: string) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    await saveEmployeeList(updatedEmployees);
  };

  if (loading) {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.emptyText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={EmployeeSchema}
      onSubmit={async (values, { resetForm }) => {
        const newEmployee: Employee = {
          id: Date.now().toString(),
          ...values,
        };

        const updatedEmployees = [...employees, newEmployee];
        setEmployees(updatedEmployees);
        await saveEmployeeList(updatedEmployees);

        await removeEmployeeForm();

        resetForm();
        setInitialValues({
          fullName: "",
          DoB: "",
          email: "",
          phoneNumber: "",
          jobTitle: "",
        });

        Alert.alert("Success", "Employee added successfully.");
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, resetForm, values, errors, touched }) => {
        const handleReset = async () => {
          resetForm();
          await removeEmployeeForm();
          setInitialValues({
            fullName: "",
            DoB: "",
            email: "",
            phoneNumber: "",
            jobTitle: "",
          });
        };

        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Add Employee</Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  placeholder="Enter full name"
                  placeholderTextColor={colors.textSub}
                  onChangeText={async (text) => {
                    handleChange("fullName")(text);
                    await saveEmployeeForm({ ...values, fullName: text });
                  }}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                  style={[
                    styles.input,
                    touched.fullName && errors.fullName && styles.inputError,
                  ]}
                />
                {errors.fullName && touched.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={colors.textSub}
                  onChangeText={async (text) => {
                    handleChange("DoB")(text);
                    await saveEmployeeForm({ ...values, DoB: text });
                  }}
                  onBlur={handleBlur("DoB")}
                  value={values.DoB}
                  style={[
                    styles.input,
                    touched.DoB && errors.DoB && styles.inputError,
                  ]}
                />
                {errors.DoB && touched.DoB && (
                  <Text style={styles.errorText}>{errors.DoB}</Text>
                )}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="Enter employee email"
                  placeholderTextColor={colors.textSub}
                  onChangeText={async (text) => {
                    handleChange("email")(text);
                    await saveEmployeeForm({ ...values, email: text });
                  }}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  placeholder="###-###-####"
                  placeholderTextColor={colors.textSub}
                  onChangeText={async (text) => {
                    let cleaned = text.replace(/\D/g, "");
                    cleaned = cleaned.slice(0, 10);

                    let formatted = cleaned;

                    if (cleaned.length > 6) {
                      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
                    } else if (cleaned.length > 3) {
                      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
                    }

                    handleChange("phoneNumber")(formatted);
                    await saveEmployeeForm({ ...values, phoneNumber: formatted });
                  }}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  keyboardType="phone-pad"
                  style={[
                    styles.input,
                    touched.phoneNumber &&
                      errors.phoneNumber &&
                      styles.inputError,
                  ]}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Job Title</Text>
                <TextInput
                  placeholder="Enter job title"
                  placeholderTextColor={colors.textSub}
                  onChangeText={async (text) => {
                    handleChange("jobTitle")(text);
                    await saveEmployeeForm({ ...values, jobTitle: text });
                  }}
                  onBlur={handleBlur("jobTitle")}
                  value={values.jobTitle}
                  style={[
                    styles.input,
                    touched.jobTitle && errors.jobTitle && styles.inputError,
                  ]}
                />
                {errors.jobTitle && touched.jobTitle && (
                  <Text style={styles.errorText}>{errors.jobTitle}</Text>
                )}
              </View>

              <View style={styles.buttonSpacing}>
                <Button
                  title="Submit Employee"
                  onPress={() => handleSubmit()}
                  color={colors.primary}
                />
              </View>

              <View style={styles.buttonSpacing}>
                <Button
                  title="Reset Form"
                  onPress={handleReset}
                  color={colors.secondary}
                />
              </View>
            </View>

            <View style={styles.listContainer}>
              <Text style={styles.sectionTitle}>Employee View</Text>

              {employees.length === 0 ? (
                <Text style={styles.emptyText}>No employees added yet.</Text>
              ) : (
                employees.map((employee) => (
                  <View key={employee.id} style={styles.employeeCard}>
                    <Text style={styles.employeeName}>{employee.fullName}</Text>
                    <Text style={styles.employeeText}>DOB: {employee.DoB}</Text>
                    <Text style={styles.employeeText}>Email: {employee.email}</Text>
                    <Text style={styles.employeeText}>
                      Phone: {employee.phoneNumber}
                    </Text>
                    <Text style={styles.employeeText}>
                      Job Title: {employee.jobTitle}
                    </Text>

                    <View style={styles.deleteButtonWrap}>
                      <Button
                        title="Delete"
                        color={colors.danger}
                        onPress={() => handleDeleteEmployee(employee.id)}
                      />
                    </View>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

export default function EmployeeScreen() {
  const handleSignOut = async () => {
    try {
      await removeEmployeeForm();
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      Alert.alert("Sign Out Error", "Failed to sign out. Please try again.");
    }
  };

  const handleClearAllEmployees = async () => {
    try {
      await removeEmployeeList();
      Alert.alert("Success", "All employees removed.");
      router.replace("/protected/employee");
    } catch (error) {
      Alert.alert("Error", "Failed to clear employees.");
    }
  };

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Employee Management</Text>
        <Text style={styles.subtitle}>Add and view employee records</Text>
      </View>

      <View style={styles.topButtonWrap}>
        <Button title="Sign Out" onPress={handleSignOut} color={colors.danger} />
      </View>

      <View style={styles.topButtonWrap}>
        <Button
          title="Clear All Employees"
          onPress={handleClearAllEmployees}
          color={colors.secondary}
        />
      </View>

      <MyForm />
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
    marginTop: 20,
    marginBottom: 6,
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
    textAlign: "center",
  },
  topButtonWrap: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  scrollContent: {
    paddingBottom: 30,
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
  listContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textMain,
    marginBottom: 14,
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
  emptyText: {
    fontSize: 14,
    color: colors.textSub,
    fontStyle: "italic",
  },
  employeeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textMain,
    marginBottom: 8,
  },
  employeeText: {
    fontSize: 14,
    color: colors.textSub,
    marginBottom: 5,
    lineHeight: 20,
  },
  deleteButtonWrap: {
    marginTop: 12,
    borderRadius: 10,
    overflow: "hidden",
  },
});