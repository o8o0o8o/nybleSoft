import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { getWeather } from "./service/getWeather";
import { getPlace } from "./service/getPlace";
import { Weather } from "./components/Weather";
import History from "./components/History";

export function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weather, setWeather] = useState(null);
  const [place, setPlace] = useState(null);
  const [history, setHistory] = useState({
    location: { latitude: 13, longitude: 12 },
    place: "Test",
    weather: {
      temp: 300,
      humidity: 15,
      feels_like: 298,
      speed: 10,
    },
    date: Date.now(),
  });
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      location = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(location);

      let weather = await getWeather(location);
      weather = { ...weather.main, ...weather.weather[0], ...weather.wind };
      setWeather(weather);

      let place = await getPlace(location);
      place = place.results[0].formatted;
      setPlace(place);

      let date = Date.now();

      let hist = [];
      hist.push(history);
      hist.push({ location, place, weather, date });
      setHistory(hist);
    })();
  }, []);

  let geoText = "Waiting..";
  if (errorMsg) {
    geoText = errorMsg;
  } else if (location) {
    geoText = JSON.stringify(
      `Координаты: Долгота: ${location.longitude} Широта: ${location.latitude}`
    );
  }

  function Home() {
    return (
      <View style={styles.container}>
        <View style={styles.locationBox}>
          <Text>{geoText}</Text>
          <Text>{`Адрес ${place}`}</Text>
        </View>
        <Weather weather={weather} />
      </View>
    );
  }

  function HistoryPage() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {history.length && <History props={history} />}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="HistoryPage" component={HistoryPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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
  locationBox: {
    width: 400,
  },
});
