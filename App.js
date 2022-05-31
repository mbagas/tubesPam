import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import store from './src/utils/store';
import {fetchProducts} from './src/slices/productsSlice';
import {ProductList} from './src/screen/Main';

const Stack = createNativeStackNavigator();

const App = () => {
  store.dispatch(fetchProducts());
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Product'}>
          <Stack.Screen
            name="Product"
            component={ProductList}
            options={{title: 'Product'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
