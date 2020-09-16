import React, { useMemo } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";

export const Weather = ({ weather }) => {
  const weatherConstructor = useMemo(() => {
    let weatherText = "Waiting..";
    if (weather) {
      weatherText = JSON.stringify(
        `Погода:
           Ветер ${weather.speed}м/с `
      );
      return (
        <View style={styles.container}>
          <View style={styles.weatherBox}>
            <View>
              <Text>{`Температура ${(weather.temp - 273).toFixed(2)}°C`}</Text>
              <Text>
                {`Ощущается как ${(weather.feels_like - 273).toFixed(2)}°C`}
              </Text>
              <Text>{`Влажность: ${weather.humidity}%`} </Text>
              <Text>{`Ветер ${weather.speed}м/с`} </Text>
            </View>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
              }}
            />
          </View>
        </View>
      );
    }
  }, [weather]);

  return <View style={styles.container}>{weatherConstructor}</View>;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 100,
    width: windowWidth,
    height: windowHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherBox: {
    width: 400,
    height: windowHeight,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});
