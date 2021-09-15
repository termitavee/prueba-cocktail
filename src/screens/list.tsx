import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react';

import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import NoAlcoholSVG from 'src/assets/no-alcohol.svg';
import noFilterImage from 'src/assets/filter-empty.png';
import filterImage from 'src/assets/filter-filtered.png';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CocktailApi from 'src/services/cocktail';
import { IDrink } from 'src/types/api';
import { RootStackTypes } from 'src/types/navigaiton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomCardFiltersModal from 'src/components/bottom-card-filters';
import { FiltersType } from 'src/types/components';

const styles = StyleSheet.create({
  safeArea: { backgroundColor: Colors.lighter },
  inputCover: {
    position: 'absolute',
    marginHorizontal: 20,
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
  },
  input: {
    width: '100%',
    color: 'black',
  },
  touchFilter: {
    position: 'absolute',
    right: 0,
    height: 48,
    width: 48,
    padding: 13,
  },
  list: {
    marginHorizontal: 10,
    marginTop: 90,
  },
  item: {
    borderRadius: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  image: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    top: 0,
  },
  alcoholIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 25,
    width: 25,
  },
  content: {
    padding: 10,
    paddingTop: 5,
  },
});

type Props = NativeStackScreenProps<RootStackTypes, 'ListScreen'>;

const sortList = (list: IDrink[] = [], sortBy?: FiltersType) => {
  return sortBy ? list.sort((a, b) => a[sortBy].localeCompare(b[sortBy], 'en', { sensitivity: 'base' })) : list;
};

const App: FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const safeAreas = useSafeAreaInsets();

  // list from the api
  const [cocktailList, setCocktailList] = useState<IDrink[]>();
  // list edited locally, to be able to go back to default
  const [filteredList, setFilteredList] = useState<IDrink[]>();

  const [inputValue, setInputValue] = useState('');
  const [sortBy, setSortBy] = useState<FiltersType>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const [filters, setFilters] = useState<{ categories: IFilter; glasses: IFilter; ingredients: IFilter; alcoholic: IFilter }>();

  // const loadFilters = async () => {
  //   const res = await CocktailApi.getAllFilters();
  //   console.warn('loadFilters res', res);
  //   setFilters(res);
  // };

  const reloadContent = async () => {
    const res = (await CocktailApi.search(inputValue)) || [];

    const filtered = sortList(res, sortBy);

    setCocktailList(res);
    setFilteredList(filtered);
  };

  /**
   * toogle modal between shown/hidden
   */
  const onToogleFilter = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onChangeFilter = (newFilter: FiltersType) => {
    setSortBy(newFilter);
  };

  // initial load
  useEffect(() => {
    reloadContent();
  }, []);

  useEffect(() => {
    // reload list when input changes
    reloadContent();
  }, [inputValue]);

  useEffect(() => {
    // should make a query but misunderstood APi functionality
    setFilteredList(sortList(cocktailList, sortBy));
  }, [sortBy]);

  const size = width / 2 - 32;
  const renderItem: ListRenderItem<IDrink> = ({ item }) => {
    return (
      <Pressable
        style={[styles.item, { width: size + 2 }]}
        onPress={() => navigation.navigate('DetailsScreen', { item })}
      >
        <FastImage
          style={[styles.image, { height: size, width: size }]}
          source={{ uri: `${item.strDrinkThumb}/preview`, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.content}>
          <Text>{item.strDrink}</Text>
          <Text>{item.strCategory}</Text>
        </View>
        <View style={styles.alcoholIcon}>{item.strAlcoholic !== 'Alcoholic' && <NoAlcoholSVG />}</View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* grid */}
      <FlatList style={styles.list} data={filteredList} numColumns={2} renderItem={renderItem} />
      {/* search bar */}
      <View style={[styles.inputCover, { marginTop: safeAreas.top || StatusBar.currentHeight || 20 }]}>
        <TextInput
          onChangeText={setInputValue}
          value={inputValue}
          style={styles.input}
          placeholder="filter"
          placeholderTextColor="#777"
          underlineColorAndroid="transparent"
        />
        <Pressable style={styles.touchFilter} onPress={() => onToogleFilter()}>
          <Image source={sortBy ? filterImage : noFilterImage} />
        </Pressable>
      </View>
      <BottomCardFiltersModal
        isVisible={isModalVisible}
        onDissmiss={onToogleFilter}
        filter={sortBy}
        setFilter={onChangeFilter}
      />
    </SafeAreaView>
  );
};

export default App;
