import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "./constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Print from "expo-print";
import { Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "./config";

const ExpensesPerCategory = ({ route, navigation }) => {
  const { category, userId } = route.params;
  const [tableData, setTableData] = useState([]);
  const [sortState, setSortState] = useState({
    activeSection: "date",
    direction: "descending",
  });

  useEffect(() => {
    if (category) {
      navigation.setOptions({
        title: category,
      });
    }
  }, [category, navigation]);


  const [selectedPrinter, setSelectedPrinter] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/expense/${userId}`);
        const data = response.data;

        const formattedData = data.map((item) => {
          const date = new Date(item.uploaded_at);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return { ...item, formattedDate };
        });

        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchData();
  }, [userId]);

  const extractUniqueYears = (data) => {
    return Array.from(
      new Set(data.map((item) => new Date(item.uploaded_at).getFullYear()))
    ).sort((a, b) => b - a);
  };

  const uniqueYears = extractUniqueYears(tableData);

  const yearItems = uniqueYears.map((year) => ({
    label: year.toString(),
    value: year.toString(),
  }));

  const arrangementHandler = (section) => {
    setSortState((prevState) => ({
      activeSection: section,
      direction:
        prevState.activeSection === section &&
          prevState.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
    setCurrentPage(1);
  };

  const isAscending = (section) => {
    return (
      sortState.activeSection === section && sortState.direction === "ascending"
    );
  };

  const sortedData = useMemo(() => {
    const sortedData = [...tableData];

    const filteredData = sortedData.filter((item) => {
      const itemDate = new Date(item.uploaded_at);
      if (isNaN(itemDate)) return false;

      const itemMonth = itemDate.toLocaleString("default", { month: "long" });
      const itemYear = itemDate.getFullYear().toString();

      const isMonthMatch =
        selectedMonth === "All" || itemMonth === selectedMonth;
      const isYearMatch = selectedYear === "All" || itemYear === selectedYear;

      const isCategoryMatch = item.matched_store_category === category;

      return isMonthMatch && isYearMatch && isCategoryMatch;
    });

    if (sortState.activeSection) {
      filteredData.sort((a, b) => {
        const field = sortState.activeSection;
        const dir = sortState.direction === "ascending" ? 1 : -1;

        if (field === "uploaded_at") {
          const dateA = new Date(a[field]);
          const dateB = new Date(b[field]);

          if (isNaN(dateA) || isNaN(dateB)) return 0;

          return dir * (dateA - dateB);
        }

        if (["matched_store", "matched_store_category"].includes(field)) {
          const aField = a[field] ? String(a[field]) : "";
          const bField = b[field] ? String(b[field]) : "";
          return dir * aField.localeCompare(bField);
        }

        if (field === "total_value") {
          return dir * (parseFloat(a[field]) - parseFloat(b[field]));
        }

        return dir * (a[field] - b[field]);
      });
    }
    return filteredData;
  }, [tableData, sortState, selectedMonth, selectedYear, category]);


  const updateHandler = async (id) => {
    navigation.navigate("UpdateExpenses", { userId, expenseId: id });
  }

  const deleteHandler = async (id) => {
    Alert.alert("Confirm Delettion",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await axios.delete(`${BASE_URL}/expense/${userId}/${id}/`);
              console.log("Deleted successfully:", response.data);
              setTableData((prevData) => prevData.filter((item) => item.id !== id));
              navigation.navigate("DashboardTabs", { refresh: true, userId });
              Alert.alert("Success", "Expense deleted successfully.");
            } catch (error) {
              console.error("Error deleting expense:", error);
            }
          },
        },
      ],
      { cancelable: false }
    )
  }



  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <Text style={styles.cell}>{item.matched_store}</Text>
      <Text style={styles.cell}>{item.matched_store_category}</Text>
      <Text style={[styles.cell, { marginLeft: 9, }]}>{item.formattedDate}</Text>
      <Text style={[styles.cell, { marginLeft: 2, marginRight: -8 }]}>
        {Number(item.total_value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>

      <View style={styles.actionHeaderCell}>
        <TouchableOpacity onPress={() => updateHandler(item.id)}>
          <Ionicons size={20} color="green" name="create-outline" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteHandler(item.id)}>
          <Ionicons size={20} color={Colors.red} name="trash-outline" />
        </TouchableOpacity>
      </View>

    </View>
  );

  const filteredData = sortedData;

  const calculateTotalExpenses = (filteredData) => {
    return filteredData.reduce(
      (total, item) => total + parseFloat(item.total_value || 0),
      0
    );
  };

  const totalExpenses = calculateTotalExpenses(filteredData);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  const print = async () => {
    await Print.printAsync({
      html: createDynamicTable(filteredData),
      printerUrl: selectedPrinter?.url,
    });
  };

  const createDynamicTable = (filteredData) => {
    let table = "";
    filteredData.forEach((item) => {
      table += `
      <tr>
        <td>${item.matched_store}</td>
        <td>${item.matched_store_category}</td>
        <td>${item.formattedDate}</td>
        <td>${item.total_value}</td>
      </tr>
    `;
    });
    const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          td, th {
            border: 1px solid #dddddd;
            text-align: center;
            padding: 8px;
          }
          tr:nth-child(even) {
            background-color: #dddddd;
          }
        </style>
      </head>
      <body style="text-align: center;">
      <h2>List of Expenses</h2>
      
       <table>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Category</th>
            <th>Date</th>
            <th>Expenses</th>
          </tr>
        </thead>

        <tbody>
         ${table}
          <tr>
          <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
          <td style="font-weight:bold">${totalExpenses.toFixed(2)}</td>
        </tr>
       </body>
      </table>
      </body>
    </html>
    `;
    return html;
  };

  return (
    <>
      <View style={styles.row}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedMonth(value)}
          value={selectedMonth}
          items={months}
          placeholder={{ label: "All", value: "All" }}
          style={pickerStyles}
        />
        <RNPickerSelect
          onValueChange={(value) => setSelectedYear(value)}
          value={selectedYear}
          items={yearItems}
          placeholder={{ label: "All", value: "All" }}
          style={pickerStyles}
        />

        <View style={styles.container}>
          <TouchableOpacity onPress={print} style={styles.printButton}>
            <Text style={styles.printButtonText}>Print</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />

          {Platform.OS === "ios" && (
            <>
              <View style={styles.spacer} />
              <TouchableOpacity onPress={print}>
                <Text>Print</Text>
              </TouchableOpacity>
              <View style={styles.spacer} />
              {selectedPrinter ? (
                <Text
                  style={styles.printer}
                >{`Selected printer: ${selectedPrinter.name}`}</Text>
              ) : undefined}
            </>
          )}
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View>
          <FlatList
            data={paginatedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.tableContainer}
            ListHeaderComponent={
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.headerCell}
                  onPress={() => arrangementHandler("matched_store")}
                >
                  <View style={styles.ascendingDescendingRow}>
                    <Text style={styles.textHeader}>Store Name</Text>
                    <Ionicons
                      name={
                        isAscending("matched_store")
                          ? "caret-up-outline"
                          : "caret-down-outline"
                      }
                      size={16}
                      color="#000"
                      style={styles.icon}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.headerCell}
                  onPress={() => arrangementHandler("matched_store_category")}
                >
                  <View style={styles.ascendingDescendingRow}>
                    <Text style={styles.textHeader}>Category</Text>
                    <Ionicons
                      name={
                        isAscending("matched_store_category")
                          ? "caret-up-outline"
                          : "caret-down-outline"
                      }
                      size={16}
                      color="#000"
                      style={styles.icon}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.headerCell}
                  onPress={() => arrangementHandler("uploaded_at")}
                >
                  <View style={styles.ascendingDescendingRow}>
                    <Text style={[styles.textHeader]}>Date</Text>
                    <Ionicons
                      name={
                        isAscending("uploaded_at")
                          ? "caret-up-outline"
                          : "caret-down-outline"
                      }
                      size={16}
                      color="#000"
                      style={styles.icon}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.headerCell}
                  onPress={() => arrangementHandler("total_value")}
                >
                  <View style={styles.ascendingDescendingRow}>
                    <Text style={[styles.textHeader]}>Expenses</Text>
                    <Ionicons
                      name={
                        isAscending("total_value")
                          ? "caret-up-outline"
                          : "caret-down-outline"
                      }
                      size={16}
                      color="#000"
                      style={styles.icon}
                    />
                  </View>
                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.headerCell}
                  onPress={() => arrangementHandler("total_value")}
                >
                  <View style={styles.ascendingDescendingRow}>
                  </View>
                </TouchableOpacity>


              </View>
            }
            ListFooterComponent={
              <>
                <Text style={styles.totalExpenses}>
                  Total Expenses: {Number(totalExpenses).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    onPress={goToPreviousPage}
                    style={styles.pageButton}
                  >
                    <Text style={styles.pageButtonText}>Previous</Text>
                  </TouchableOpacity>
                  <Text style={styles.pageInfo}>Page {currentPage}</Text>
                  <TouchableOpacity
                    onPress={goToNextPage}
                    style={styles.pageButton}
                  >
                    <Text style={styles.pageButtonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
            }
          />
        </View>
      </View>
    </>
  );
};

export default ExpensesPerCategory;

const styles = StyleSheet.create({
  tableContainer: {
    padding: 10,
    paddingBottom: 42,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  headerCell: {
    width: "24.6%",
    fontWeight: "bold",
    textAlign: "center",
  },
  rows: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    width: "23%",
    padding: 5,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#ecf0f1",
    flexDirection: "column",
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2.5,
    marginHorizontal: 10,
  },
  subTitle: {
    color: Colors.brown600,
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },
  printButton: {
    backgroundColor: "#3397a1",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 8,
  },
  printButtonText: {
    color: "white",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  pageButton: {
    backgroundColor: "#3397a1",
    padding: 10,
    borderRadius: 5,
  },
  pageButtonText: {
    color: "white",
  },
  pageInfo: {
    alignSelf: "center",
    fontSize: 16,
  },
  totalExpenses: {
    textAlign: "right",
    fontWeight: "bold",
    marginTop: 7,
  },
  textHeader: {
    flex: 1.5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
  },
  actionHeaderCell: {
    padding: 8,
    alignItems: 'center',
  },
  ascendingDescendingRow: {
    marginHorizontal: 5,
    flexDirection: "row",
  },
});

const pickerStyles = {
  inputAndroid: {
    width: 140,
    backgroundColor: Colors.brown600,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: Colors.brown100,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  inputIOS: {
    width: 160,
    backgroundColor: Colors.brown600,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: Colors.brown100,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  placeholder: {
    color: Colors.brown100,
    fontWeight: "bold",
  },
};
