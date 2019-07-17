import * as functions from 'firebase-functions';
import { Product } from '../../../shared-models/products/product.model';
import { SharedCollectionPaths } from '../../../shared-models/routes-and-paths/fb-collection-paths';
import { maryDaphnePublicFirestore } from '../db';

const updateProd = async (product: Product) => {

  const db = maryDaphnePublicFirestore;

  // If product is active on admin, add to public
  if (product.active) {
    const fbRes = await db.collection(SharedCollectionPaths.PRODUCTS).doc(product.id).set(product)
      .catch(error => console.log(error));
    console.log('Product activated');
    return fbRes;
  }

  // If product is not active on admin, remove from public
  if (!product.active) {
    const fbRes = await db.collection(SharedCollectionPaths.PRODUCTS).doc(product.id).delete()
      .catch(error => console.log(error));
    console.log('Product deactivated');
    return fbRes;
  }

}

/////// DEPLOYABLE FUNCTIONS ///////

export const updateProduct = functions.https.onCall(async (data: Product, context) => {
  const outcome = await updateProd(data);
  return {outcome}
});