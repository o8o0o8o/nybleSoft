import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Дата", "Время", "Широта и долгота", "Посмотреть погоду"],
      tableData: this.fillTable(),
    };
  }

  fillTable() {
    console.log(this.props.props[1]);
    let table = [];
    let arr = Array.from(this.props.props);
    arr.forEach((a) => {
      if (a) {
        table.push([
          new Date(a.date).toDateString(),
          new Date(a.date).toTimeString(),
          `${a.location.latitude.toFixed(2)} & ${a.location.longitude.toFixed(
            2
          )}`,
          "",
        ]);
      }
    });
    return table;
  }

  _alertIndex(index) {
    alert(`По этому адресу: ${this.props.props[index].place}
    Погода была: Температура ${(
      this.props.props[index].weather.temp - 273
    ).toFixed(2)}°C    
      Ощущается как ${(
        this.props.props[index].weather.feels_like - 273
      ).toFixed(2)}°C   Влажность: ${
      this.props.props[index].weather.humidity
    }% Ветер ${
      this.props.props[index].weather.speed
    }м/с `); /*||
      Alert.alert(`Погода тогда была: Температура ${(
        this.props.props[index].weather.temp - 273
      ).toFixed(2)}°C    
        Ощущается как ${(
          this.props.props[index].weather.feels_like - 273
        ).toFixed(2)}°C   Влажность: ${
        this.props.props[index].weather.humidity
      }% Ветер ${this.props.props[index].weather.speed}м/с `);*/
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Данные</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderColor: "transparent" }}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          {state.tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellIndex === 3 ? element(cellData, index) : cellData}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </View>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  head: { height: 40, backgroundColor: "#808B97" },
  text: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  btn: { width: 68, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
});
