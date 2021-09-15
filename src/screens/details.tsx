import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useRef } from 'react';
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { RootStackTypes } from 'src/types/navigaiton';
import backIcon from 'src/assets/backIcon/back-icon.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackTypes, 'DetailsScreen'>;

const styles = StyleSheet.create({
  backIconCover: {
    borderRadius: 50,
    padding: 10,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555',
    position: 'absolute',
    marginLeft: 20,
  },
  backIcon: { tintColor: 'white' },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  row: { flexDirection: 'row' },
  title: {
    marginTop: 8,
    fontSize: 18,
  },
  description: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '400',
  },
});

/**
 * REnder outside component for eficiency purpose
 * @param name left text display
 * @param value right text display
 * @param main set bigger font
 * @returns JSX.Element
 */
const RenderRow = ({ name, value, main = false }) => (
  <View style={styles.row}>
    <Text style={main ? styles.title : styles.description}>
      <Text>{name}: </Text>
      <Text>{value}</Text>
    </Text>
  </View>
);
const RenderHeader = ({ onPress, uri }) => {
  const { width } = useWindowDimensions();
  const safeAreas = useSafeAreaInsets();

  return (
    <View>
      <FastImage
        style={{ width, height: width }}
        source={{ uri, priority: FastImage.priority.normal }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Pressable
        // add notch height (ios) or status bar (android)
        style={[styles.backIconCover, { marginTop: safeAreas.top || StatusBar.currentHeight || 20 }]}
        onPress={onPress}
        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
      >
        <Image source={backIcon} style={styles.backIcon} />
      </Pressable>
    </View>
  );
};

const App: FC<Props> = ({ navigation, route }) => {
  const item = useRef(route.params?.item).current;

  return (
    <View>
      <ScrollView stickyHeaderIndices={[0]}>
        <RenderHeader onPress={() => navigation.goBack()} uri={item.strDrinkThumb} />
        <View style={styles.content}>
          <RenderRow name="Name" value={item.strDrink} main />
          <RenderRow name="Glass" value={item.strGlass} />
          <RenderRow name="Type" value={item.strAlcoholic} />
          <RenderRow name="Category" value={item.strCategory} />
          <Text style={styles.title}>Ingrdients:</Text>
          {item.strIngrdients.map(i => (
            <RenderRow key={i.ingredient} name={i.ingredient} value={i.measurement} />
          ))}
          <Text style={styles.title}>Instructions:</Text>
          <Text style={styles.description}>{item.strInstructions}</Text>
          {!!item.strVideo && (
            <>
              <Text style={styles.title}>Video:</Text>
              <Text selectable>{item.strVideo}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default App;
