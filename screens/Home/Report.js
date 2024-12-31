import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../../constants/Colors";
import * as Print from "expo-print";

const Report = () => {
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  const tableData = [
    {
      id: "1",
      store_name: "Jollibee",
      expenses: 1,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "2",
      store_name: "Jollibee",
      expenses: 2,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "3",
      store_name: "Jollibee",
      expenses: 3,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "4",
      store_name: "Jollibee",
      expenses: 4,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "5",
      store_name: "Jollibee",
      expenses: 5,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "6",
      store_name: "Jollibee",
      expenses: 6,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "7",
      store_name: "Jollibee",
      expenses: 7,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "8",
      store_name: "Jollibee",
      expenses: 8,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "9",
      store_name: "Jollibee",
      expenses: 9,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "10",
      store_name: "Jollibee",
      expenses: 10,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "11",
      store_name: "Jollibee",
      expenses: 11,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "12",
      store_name: "Jollibee",
      expenses: 12,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "13",
      store_name: "Jollibee",
      expenses: 13,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "14",
      store_name: "Jollibee",
      expenses: 14,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "15",
      store_name: "Jollibee",
      expenses: 15,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "16",
      store_name: "Jollibee",
      expenses: 16,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "17",
      store_name: "Jollibee",
      expenses: 17,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "18",
      store_name: "Jollibee",
      expenses: 18,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "19",
      store_name: "Jollibee",
      expenses: 19,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "20",
      store_name: "Jollibee",
      expenses: 20,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "21",
      store_name: "Jollibee",
      expenses: 21,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "22",
      store_name: "Jollibee",
      expenses: 22,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "23",
      store_name: "Jollibee",
      expenses: 23,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "24",
      store_name: "Jollibee",
      expenses: 24,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "25",
      store_name: "Jollibee",
      expenses: 25,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "26",
      store_name: "Jollibee",
      expenses: 26,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "27",
      store_name: "Jollibee",
      expenses: 27,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "28",
      store_name: "Jollibee",
      expenses: 28,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "29",
      store_name: "Jollibee",
      expenses: 29,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "30",
      store_name: "Jollibee",
      expenses: 30,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "31",
      store_name: "Jollibee",
      expenses: 31,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "32",
      store_name: "Jollibee",
      expenses: 32,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "33",
      store_name: "Jollibee",
      expenses: 33,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "34",
      store_name: "Jollibee",
      expenses: 34,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "35",
      store_name: "Jollibee",
      expenses: 35,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "36",
      store_name: "Jollibee",
      expenses: 36,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "37",
      store_name: "Jollibee",
      expenses: 37,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "38",
      store_name: "Jollibee",
      expenses: 38,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "39",
      store_name: "Jollibee",
      expenses: 39,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "40",
      store_name: "Jollibee",
      expenses: 40,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "41",
      store_name: "Jollibee",
      expenses: 41,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "42",
      store_name: "Jollibee",
      expenses: 42,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "43",
      store_name: "Jollibee",
      expenses: 43,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "44",
      store_name: "Jollibee",
      expenses: 44,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "45",
      store_name: "Jollibee",
      expenses: 45,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "46",
      store_name: "Jollibee",
      expenses: 46,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "47",
      store_name: "Jollibee",
      expenses: 47,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "48",
      store_name: "Jollibee",
      expenses: 48,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "49",
      store_name: "Jollibee",
      expenses: 49,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "50",
      store_name: "Jollibee",
      expenses: 50,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "51",
      store_name: "Jollibee",
      expenses: 51,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "52",
      store_name: "Jollibee",
      expenses: 52,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "53",
      store_name: "Jollibee",
      expenses: 53,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "54",
      store_name: "Jollibee",
      expenses: 54,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "55",
      store_name: "Jollibee",
      expenses: 55,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "56",
      store_name: "Jollibee",
      expenses: 56,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "57",
      store_name: "Jollibee",
      expenses: 57,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "58",
      store_name: "Jollibee",
      expenses: 58,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "59",
      store_name: "Jollibee",
      expenses: 59,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "60",
      store_name: "Jollibee",
      expenses: 60,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "61",
      store_name: "Jollibee",
      expenses: 61,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "62",
      store_name: "Jollibee",
      expenses: 62,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "63",
      store_name: "Jollibee",
      expenses: 63,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "64",
      store_name: "Jollibee",
      expenses: 64,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "65",
      store_name: "Jollibee",
      expenses: 65,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "66",
      store_name: "Jollibee",
      expenses: 66,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "67",
      store_name: "Jollibee",
      expenses: 67,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "68",
      store_name: "Jollibee",
      expenses: 68,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "69",
      store_name: "Jollibee",
      expenses: 69,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "70",
      store_name: "Jollibee",
      expenses: 70,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "71",
      store_name: "Jollibee",
      expenses: 71,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "72",
      store_name: "Jollibee",
      expenses: 72,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "73",
      store_name: "Jollibee",
      expenses: 73,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "74",
      store_name: "Jollibee",
      expenses: 74,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "75",
      store_name: "Jollibee",
      expenses: 75,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "76",
      store_name: "Jollibee",
      expenses: 76,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "77",
      store_name: "Jollibee",
      expenses: 77,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "78",
      store_name: "Jollibee",
      expenses: 78,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "79",
      store_name: "Jollibee",
      expenses: 39,
      category: "Foods",
      date: "May, 13, 2001",
    },
    {
      id: "80",
      store_name: "Jollibee",
      expenses: 40,
      category: "Foods",
      date: "May, 13, 2001",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <Text style={styles.cell}>{item.store_name}</Text>
      <Text style={styles.cell}>{item.expenses}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.date}</Text>
    </View>
  );

  const paginatedData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToNextPage = () => {
    if (currentPage * rowsPerPage < tableData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const print = async () => {
    await Print.printAsync({
      html: createDynamicTable(),
      printerUrl: selectedPrinter?.url,
    });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setSelectedPrinter(printer);
  };

  const array = new Array(10).fill("Row");

  const createDynamicTable = () => {
    var table = "";
    tableData.forEach((item) => {
      table += `
    <tr>
      <td>${item.store_name}</td>
      <td>${item.expenses}</td>
      <td>${item.category}</td>
      <td>${item.date}</td>
    </tr>
  `;
    });
    const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
   <table border="1" style="width: 100%; text-align: center; border-collapse: collapse;">
<h1>Expenses Report</h1>
    <thead>
          <tr>
            <th>Store Name</th>
            <th>Expenses</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
         <tbody>
          ${table}
        </tbody>
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
          onValueChange={(value) => console.log(value)}
          value="December"
          items={[
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
          ]}
          placeholder={{ label: "Month", value: null }}
          style={pickerStyles}
        />
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          value="2024"
          items={[
            { label: "2024", value: "2024" },
            { label: "2023", value: "2023" },
          ]}
          placeholder={{ label: "Year", value: null }}
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
        <View style={styles.header}>
          <Text style={styles.headerCell}>Store name</Text>
          <Text style={styles.headerCell}>Expenses</Text>
          <Text style={styles.headerCell}>Category</Text>
          <Text style={styles.headerCell}>Date</Text>
        </View>
        <FlatList
          data={paginatedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={goToPreviousPage}
            style={styles.pageButton}
          >
            <Text style={styles.pageButtonText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfo}>Page {currentPage}</Text>
          <TouchableOpacity onPress={goToNextPage} style={styles.pageButton}>
            <Text style={styles.pageButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Report;

const styles = StyleSheet.create({
  tableContainer: {
    padding: 10,
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
    padding: 5,
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
    marginVertical: 10,
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
