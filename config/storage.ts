import AsyncStorage from "@react-native-async-storage/async-storage";

export const EMPLOYEE_FORM_KEY = "employee_form_data";
export const EMPLOYEE_LIST_KEY = "employee_list_data";

export const saveEmployeeForm = async (data: any) => {
  try {
    await AsyncStorage.setItem(EMPLOYEE_FORM_KEY, JSON.stringify(data));
  } catch (error) {
    console.log("Error saving employee form:", error);
  }
};

export const getEmployeeForm = async () => {
  try {
    const value = await AsyncStorage.getItem(EMPLOYEE_FORM_KEY);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log("Error loading employee form:", error);
    return null;
  }
};

export const removeEmployeeForm = async () => {
  try {
    await AsyncStorage.removeItem(EMPLOYEE_FORM_KEY);
  } catch (error) {
    console.log("Error removing employee form:", error);
  }
};

export const saveEmployeeList = async (employees: any[]) => {
  try {
    await AsyncStorage.setItem(EMPLOYEE_LIST_KEY, JSON.stringify(employees));
  } catch (error) {
    console.log("Error saving employee list:", error);
  }
};

export const getEmployeeList = async () => {
  try {
    const value = await AsyncStorage.getItem(EMPLOYEE_LIST_KEY);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.log("Error loading employee list:", error);
    return [];
  }
};

export const removeEmployeeList = async () => {
  try {
    await AsyncStorage.removeItem(EMPLOYEE_LIST_KEY);
  } catch (error) {
    console.log("Error removing employee list:", error);
  }
};