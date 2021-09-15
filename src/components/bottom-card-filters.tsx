import React, { Dispatch, FC } from 'react';
import { ColorValue,  Pressable,  StyleSheet, Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import RNModal, { ModalProps } from 'react-native-modal';
import { FiltersType } from 'src/types/components';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginBottom: 0,
  },
  content: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    // andorid shadow
    elevation: 5,
    // ios shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contentHeight: {
    minHeight: 200,
    maxHeight: 400,
  },
  barCover: {
    marginVertical: 21,
    alignItems: 'center',
  },
  bar: {
    width: 62,
    height: 5.2,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  filterButton: {
    flexDirection: 'row',
    borderRadius: 28,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 3,
    marginBottom: 7
  },
  filterButtonEnable:{ backgroundColor: '#ccc' }
});

export interface IBottomCardProps extends Partial<ModalProps> {
  setState?: Dispatch<Partial<ModalProps>>;
  onDissmiss?: () => void;
  filter: FiltersType,
  setFilter: (FiltersType) => void
  componentStyle?: ViewStyle;
  backgroundColor?: ColorValue;
}

// translate keys to display text
enum keyTranslator {
  strCategory = 'category',
  strAlcoholic = 'alcoholic',
  dateModified = 'last updated',
}

const BottomCardFiltersModal: FC<IBottomCardProps> = props => {
  const { width, height } = useWindowDimensions();

  const {
    setState,
    children,
    hasBackdrop,
    swipeDirection = 'down',
    propagateSwipe,
    onSwipeComplete,
    onBackdropPress,
    componentStyle = {},
    deviceHeight = height,
    deviceWidth = width,
    backdropColor = '#0000',
    backgroundColor = '#fff',
    onDissmiss,
    filter,
    setFilter,
    ...params
  } = props;


  const RenderItem = ({item}: {item: FiltersType}) => (
    <Pressable
      onPress={() => {
        console.log('setFilter', filter === item ? item : '')
        setFilter(filter === item ?   '': item) } }
      style={[ styles.filterButton, filter === item && styles.filterButtonEnable]}
    >
      <Text style={{fontSize: 14}}>{keyTranslator[item]}</Text>
  </Pressable>)
  
  return (
    <RNModal
      style={styles.container}
      hasBackdrop={hasBackdrop}
      onSwipeComplete={ onDissmiss}
      onBackdropPress={onDissmiss}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      backdropColor={backdropColor}
      swipeDirection={swipeDirection}
      propagateSwipe={propagateSwipe ?? true}
      {...params}
    >
      <View style={[styles.content, { backgroundColor, maxHeight: height - 20, }, componentStyle]}>
          <View style={styles.barCover}>
            <View style={styles.bar} />
          </View>
      <>
        <Text>Sort by:</Text>
        <View style={styles.filtersContainer}>
          <RenderItem item="strCategory"/>
          <RenderItem item="strAlcoholic"/>
          <RenderItem item="dateModified"/>
        </View>
      </>      
        <View style={{ height: 40 }} />
      </View>
    </RNModal>
  );
};

export default BottomCardFiltersModal;
