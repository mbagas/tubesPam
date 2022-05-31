// import {configureStore} from '@reduxjs/toolkit';
// import productDataReducer from '../slices/productDataSlice';

// export default configureStore({
//   reducer: {
//     productData: productDataReducer,
//   },
// });

import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
  },
});
