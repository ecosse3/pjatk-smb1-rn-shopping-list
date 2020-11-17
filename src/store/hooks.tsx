import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from 'react-native-sqlite-storage';
import { productListState } from './atoms';
import { ProductType } from '../utils/types';
import {
  deleteProduct,
  insertProduct,
  updateProduct,
  updateProductBasketStatus
} from '../utils/sqlite';

// Open SQLite DB
const db = SQLite.openDatabase(
  {
    name: 'SQLite-s22004-products',
    location: 'default'
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
  (e) => {
    console.log(e);
  }
);

// Utility functions

const cloneIndex = (items: ProductType[], id: string) => ({
  clone: items.map((product: ProductType) => ({ ...product })),
  index: items.findIndex((product: ProductType) => product.id === id)
});

const saveProducts = async (products: ProductType[]) => {
  try {
    await AsyncStorage.setItem('@products', JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
};

// Hooks

export const useAddEditProduct: (product: ProductType) => void = () => {
  const [products, setProducts] = useRecoilState(productListState);

  return (product: ProductType) => {
    const { clone, index } = cloneIndex(products, product.id);

    if (index !== -1) {
      clone[index].name = product.name;
      clone[index].price = product.price;
      clone[index].amount = product.amount;
      setProducts(clone);
      saveProducts(clone);
      updateProduct(db, { ...product, inBasket: clone[index].inBasket });
    } else {
      setProducts([...clone, { ...product, inBasket: false }]);
      saveProducts([...clone, { ...product, inBasket: false }]);
      insertProduct(db, { ...product, inBasket: false });
    }
  };
};

export const useRemoveProduct: (productId: string) => void = () => {
  const [products, setProducts] = useRecoilState(productListState);

  return (productId: string) => {
    setProducts(products.filter((item) => item.id !== productId));
    saveProducts(products.filter((item) => item.id !== productId));
    deleteProduct(db, productId);
  };
};

export const useToggleProductInBasket: (productId: string) => void = () => {
  const [products, setProducts] = useRecoilState(productListState);

  return (productId: string) => {
    const { clone, index } = cloneIndex(products, productId);

    clone[index].inBasket = !clone[index].inBasket;
    setProducts(clone);
    saveProducts(clone);
    updateProductBasketStatus(db, productId, clone[index].inBasket);
  };
};
