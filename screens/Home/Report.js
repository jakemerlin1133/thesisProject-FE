import React, { useState } from "react";
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
import * as Print from "expo-print";

const Report = () => {
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  const tableData = [
    {
      id: "1",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 1,
    },
    {
      id: "2",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 2,
    },
    {
      id: "3",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 3,
    },
    {
      id: "4",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 4,
    },
    {
      id: "5",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 5,
    },
    {
      id: "6",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 6,
    },
    {
      id: "7",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 7,
    },
    {
      id: "8",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 8,
    },
    {
      id: "9",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 9,
    },
    {
      id: "10",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 10,
    },
    {
      id: "11",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 11,
    },
    {
      id: "12",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 12,
    },
    {
      id: "13",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 13,
    },
    {
      id: "14",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 14,
    },
    {
      id: "15",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 15,
    },
    {
      id: "16",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 16,
    },
    {
      id: "17",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 17,
    },
    {
      id: "18",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 18,
    },
    {
      id: "19",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 19,
    },
    {
      id: "20",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 20,
    },
    {
      id: "21",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 21,
    },
    {
      id: "22",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 22,
    },
    {
      id: "23",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 23,
    },
    {
      id: "24",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 24,
    },
    {
      id: "25",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 25,
    },
    {
      id: "26",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 26,
    },
    {
      id: "27",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 27,
    },
    {
      id: "28",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 28,
    },
    {
      id: "29",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 29,
    },
    {
      id: "30",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 30,
    },
    {
      id: "31",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 31,
    },
    {
      id: "32",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 32,
    },
    {
      id: "33",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 33,
    },
    {
      id: "34",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 34,
    },
    {
      id: "35",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 35,
    },
    {
      id: "36",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 36,
    },
    {
      id: "37",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 37,
    },
    {
      id: "38",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 38,
    },
    {
      id: "39",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 39,
    },
    {
      id: "40",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 40,
    },
    {
      id: "41",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 41,
    },
    {
      id: "42",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 42,
    },
    {
      id: "43",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 43,
    },
    {
      id: "44",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 44,
    },
    {
      id: "45",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 45,
    },
    {
      id: "46",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 46,
    },
    {
      id: "47",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 47,
    },
    {
      id: "48",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 48,
    },
    {
      id: "49",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 49,
    },
    {
      id: "50",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 50,
    },
    {
      id: "51",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 51,
    },
    {
      id: "52",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 52,
    },
    {
      id: "53",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 53,
    },
    {
      id: "54",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 54,
    },
    {
      id: "55",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 55,
    },
    {
      id: "56",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 56,
    },
    {
      id: "57",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 57,
    },
    {
      id: "58",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 58,
    },
    {
      id: "59",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 59,
    },
    {
      id: "60",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 60,
    },
    {
      id: "61",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 61,
    },
    {
      id: "62",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 62,
    },
    {
      id: "63",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 63,
    },
    {
      id: "64",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 64,
    },
    {
      id: "65",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 65,
    },
    {
      id: "66",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 66,
    },
    {
      id: "67",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 67,
    },
    {
      id: "68",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 68,
    },
    {
      id: "69",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 69,
    },
    {
      id: "70",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 70,
    },
    {
      id: "71",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 71,
    },
    {
      id: "72",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 72,
    },
    {
      id: "73",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 73,
    },
    {
      id: "74",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 74,
    },
    {
      id: "75",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 75,
    },
    {
      id: "76",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 76,
    },
    {
      id: "77",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 77,
    },
    {
      id: "78",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 78,
    },
    {
      id: "79",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 79,
    },
    {
      id: "80",
      store_name: "Jollibee",
      category: "Foods",
      date: "May, 13, 2001",
      expenses: 80,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <Text style={styles.cell}>{item.store_name}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.expenses}</Text>
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
   <table border="1" style="width: 100%; text-align: center; border-collapse: collapse;">
<h1>Expenses Report</h1>
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
        <View>
          <FlatList
            data={paginatedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.tableContainer}
            ListHeaderComponent={
              <View style={styles.header}>
                <TouchableOpacity style={styles.headerCell}>
                  <Text style={styles.textHeader}>Store name</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerCell}>
                  <Text style={styles.textHeader}>Category</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerCell}>
                  <Text style={styles.textHeader}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerCell}>
                  <Text style={styles.textHeader}>Expenses</Text>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={
              <>
                <Text style={styles.totalExpenses}>Total Expenses: 1220</Text>
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
    textAlign: "center",
    fontWeight: "bold",
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
