import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import {fetchProducts, userDeleted} from '../slices/productsSlice';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';

export function ProductList() {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const {entities} = useSelector(state => state.products);
  const loading = useSelector(state => state.loading);

  const productDetail = item => {
    console.log(item.id);
    console.log('adasdasd');
    SweetAlert.showAlertWithOptions(
      {
        title: item.title,
        subTitle:
          'Description : ' +
          item.description +
          ' | - Category : ' +
          item.category +
          ' | * Rating : ' +
          item.rating.rate +
          '(' +
          item.rating.count +
          ') *',
        confirmButtonTitle: 'Buy',
        otherButtonTitle: 'Cancel',
        // style: 'success',
        cancellable: true,
      },
      callback => console.log('callback'),
    );
  };

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      style={styles.product}
      onPress={() => productDetail(item)}>
      <View style={styles.productHead}>
        {/* <Text style={styles.harbourText}>{item.image}</Text> */}
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
      </View>
      <View style={styles.productHead}>
        {/* <Text style={styles.harbourText}>{item.id}</Text> */}
        <Text style={styles.harbourText}>{item.title}</Text>
      </View>

      <View style={styles.productFoot}>
        <Text style={styles.productText}>Price</Text>
        <Text style={styles.productText}>$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.productContainer}>
          <FlatList data={entities} renderItem={renderItem} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  container: {
    backgroundColor: '#C8C6C6',
    height: '100%',
  },
  image: {
    height: 150,
    width: 150,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  productContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    paddingTop: 10,
    borderRadius: 15,
    // height: '150%',
  },
  product: {
    backgroundColor: '#EEEE',
    padding: 10,
    borderWidth: 1,
    borderColor: '#35353',
    marginVertical: 10,
  },
  productHead: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  harbourText: {
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 15,
    fontSize: 17,
  },
  productContent: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
  },
  productFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  productText: {
    color: 'black',
  },
  productTextHead: {
    color: 'black',
    fontWeight: 'bold',
  },
});
