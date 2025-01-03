import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Print from "expo-print";

const Report = ({ route }) => {
  const [sortState, setSortState] = useState({
    activeSection: "date",
    direction: "descending",
  });

  const [selectedPrinter, setSelectedPrinter] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  // State for month and year selection
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const tableData = [
    {
      id: "1",
      store_name: "Jollibee",
      category: "Drug Store",
      date: "May 13, 2002",
      expenses: 241,
    },
    {
      id: "2",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 14, 2001",
      expenses: 2,
    },
    {
      id: "3",
      store_name: "Jollibee",
      category: "Eatery",
      date: "March 15, 2001",
      expenses: 3,
    },
    {
      id: "4",
      store_name: "Jollibee",
      category: "Foods",
      date: "February 16, 2001",
      expenses: 4,
    },
    {
      id: "5",
      store_name: "Jollibee",
      category: "Foods",
      date: "August 13, 2001",
      expenses: 5,
    },
    {
      id: "6",
      store_name: "Mcdonals",
      category: "Foods",
      date: "June 17, 2010",
      expenses: 6,
    },
    {
      id: "7",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 18, 2001",
      expenses: 7,
    },
    {
      id: "8",
      store_name: "Ace",
      category: "Hardware",
      date: "May 13, 2001",
      expenses: 8,
    },
    {
      id: "9",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2001",
      expenses: 9,
    },
    {
      id: "10",
      store_name: "Jollibee",
      category: "Botique",
      date: "May 13, 2001",
      expenses: 1120,
    },
    {
      id: "11",
      store_name: "Jollibee",
      category: "Foods",
      date: "January 13, 2009",
      expenses: 11,
    },
    {
      id: "12",
      store_name: "Jollibee",
      category: "Foods",
      date: "December 14, 2009",
      expenses: 12,
    },
    {
      id: "13",
      store_name: "Jollibee",
      category: "Foods",
      date: "April 13, 2001",
      expenses: 1233,
    },
    {
      id: "14",
      store_name: "Jollibee",
      category: "Foods",
      date: "December 13, 2009",
      expenses: 14,
    },
    {
      id: "15",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 19, 2009",
      expenses: 15,
    },
    {
      id: "16",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 14, 2003",
      expenses: 16,
    },
    {
      id: "17",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2001",
      expenses: 17,
    },
    {
      id: "18",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2001",
      expenses: 17,
    },
    {
      id: "19",
      store_name: "Jollibee",
      category: "Foods",
      date: "August 13, 1999",
      expenses: 1237,
    },
    {
      id: "20",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "21",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "22",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "23",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "24",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "25",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "26",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "27",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "28",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "29",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "30",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "31",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "32",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "33",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "34",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "35",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "36",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "37",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "38",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "39",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "40",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "41",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "42",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "43",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "44",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "45",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "46",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "47",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "48",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "49",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "50",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "51",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "52",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "53",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "54",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "55",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "56",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "57",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "58",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "59",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "60",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "61",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "62",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "63",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "64",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "65",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "66",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "67",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "68",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "69",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "70",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "71",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "72",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "73",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "74",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "75",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "76",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "77",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "78",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "79",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
    {
      id: "80",
      store_name: "Jollibee",
      category: "Foods",
      date: "May 13, 2005",
      expenses: 179,
    },
  ];

  const extractUniqueYears = (data) => {
    const parseDate = (dateStr) => {
      const dateParts = dateStr.trim().split(/\s+/);
      const monthStr = dateParts[0];
      const dayYear = dateParts.slice(1).join(" ");
      const [day, year] = dayYear.split(",");
      const monthName = monthStr.trim();

      const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };

      const month = monthMap[monthName];
      const dayOfMonth = parseInt(day, 10);
      const fullYear = parseInt(year, 10);

      return new Date(fullYear, month, dayOfMonth);
    };

    const years = data.map((item) => {
      const parsedDate = parseDate(item.date);
      return parsedDate.getFullYear();
    });

    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);

    return uniqueYears.map((year) => ({
      label: String(year),
      value: String(year),
    }));
  };

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

  const getSortedData = () => {
    const sortedData = [...tableData];

    const filteredData = sortedData.filter((item) => {
      const itemDate = parseDate(item.date);
      const itemMonth = itemDate.toLocaleString("default", { month: "long" });
      const itemYear = itemDate.getFullYear().toString();

      const isMonthMatch =
        selectedMonth === "All" || itemMonth === selectedMonth;
      const isYearMatch = selectedYear === "All" || itemYear === selectedYear;

      return isMonthMatch && isYearMatch;
    });

    if (sortState.activeSection) {
      filteredData.sort((a, b) => {
        const field = sortState.activeSection;
        const dir = sortState.direction === "ascending" ? 1 : -1;

        if (field === "date") {
          const dateA = parseDate(a[field]);
          const dateB = parseDate(b[field]);

          return dir * (dateA - dateB);
        }

        if (typeof a[field] === "string") {
          return dir * a[field].localeCompare(b[field]);
        }

        return dir * (a[field] - b[field]);
      });
    }
    return filteredData;
  };

  const parseDate = (dateStr) => {
    const dateParts = dateStr.trim().split(/\s+/);
    const monthStr = dateParts[0];
    const dayYear = dateParts.slice(1).join(" ");
    const [day, year] = dayYear.split(",");
    const monthName = monthStr.trim();

    const monthMap = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    const month = monthMap[monthName];
    const dayOfMonth = parseInt(day, 10);
    const fullYear = parseInt(year, 10);
    return new Date(fullYear, month, dayOfMonth);
  };

  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <Text style={styles.cell}>{item.store_name}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.expenses}</Text>
    </View>
  );

  const filteredData = getSortedData();

  const calculateTotalExpenses = (filteredData) => {
    return filteredData.reduce((total, item) => total + item.expenses, 0);
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
    const filteredData = getSortedData();

    const htmlContent = createDynamicTable(filteredData);

    await Print.printAsync({
      html: htmlContent,
      printerUrl: selectedPrinter?.url,
    });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setSelectedPrinter(printer);
  };

  const createDynamicTable = (filteredData) => {
    var table = "";
    filteredData.forEach((item) => {
      table += `
    <tr>
      <td>${item.store_name}</td>
      <td>${item.category}</td>
      <td>${item.date}</td>
      <td>${item.expenses}</td>
    </tr>
  `;
    });
    const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
    tr:nth-child(even) {
  background-color: #dddddd;
}
    </style>
  </head>
  <body style="text-align: center;">
  <h1>Expenses Report</h1>
   <table border="1" style="width: 100%; text-align: center; border-collapse: collapse;">
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
          <td style="font-weight:bold">${totalExpenses}</td>
        </tr>
        </tbody>
  </table>
  </body>
</html>
`;
    return html;
  };

  const years = extractUniqueYears(tableData);

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
          items={years}
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
              <TouchableOpacity onPress={selectPrinter}>
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
                  onPress={() => arrangementHandler("store_name")}
                >
                  <View style={styles.ascendingDescendingRow}>
                    <Text style={styles.textHeader}>Store Name</Text>
                    <Ionicons
                      name={
                        isAscending("storeName")
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
                  onPress={() => arrangementHandler("category")}
                >
                  <View style={styles.ascendingDescendingRow}>
                    <Text style={styles.textHeader}>Category</Text>
                    <Ionicons
                      name={
                        isAscending("category")
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
                  onPress={() => arrangementHandler("date")}
                >
                  <View style={styles.ascendingDescendingRow}>
                    <Text style={[styles.textHeader]}>Date</Text>
                    <Ionicons
                      name={
                        isAscending("date")
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
                  onPress={() => arrangementHandler("expenses")}
                >
                  <View style={styles.ascendingDescendingRow}>
                    <Text style={[styles.textHeader]}>Expenses</Text>
                    <Ionicons
                      name={
                        isAscending("expenses")
                          ? "caret-up-outline"
                          : "caret-down-outline"
                      }
                      size={16}
                      color="#000"
                      style={styles.icon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={
              <>
                <Text style={styles.totalExpenses}>
                  Total Expenses:{totalExpenses}
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

export default Report;

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
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  rows: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
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
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
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
