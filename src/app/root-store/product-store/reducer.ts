import { initialState, State, featureAdapter } from './state';
import { Actions, ActionTypes } from './actions';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {

    case ActionTypes.SINGLE_PRODUCT_REQUESTED: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }

    case ActionTypes.SINGLE_PRODUCT_LOADED: {
      return featureAdapter.addOne(
        action.payload.product, {
          ...state,
          isLoading: false,
          error: null
        }
      );
    }

    case ActionTypes.ALL_PRODUCTS_REQUESTED: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }

    case ActionTypes.ALL_PRODUCTS_LOADED: {
      return featureAdapter.addAll(
        action.payload.products, {
          ...state,
          isLoading: false,
          productsLoaded: true,
          error: null,
        }
      );
    }

    case ActionTypes.ADD_PRODUCT_COMPLETE:
      return featureAdapter.addOne(
        action.payload.product,
        {
          ...state,
        }
      );

    case ActionTypes.UPDATE_PRODUCT_COMPLETE:
      return featureAdapter.updateOne(
        action.payload.product,
        {
          ...state,
        }
      );

    case ActionTypes.DELETE_PRODUCT_REQUESTED:
      return {
        ...state,
        deletionProcessing: true,
      };

    case ActionTypes.DELETE_PRODUCT_COMPLETE:
      return featureAdapter.removeOne(
        action.payload.productId,
        {
          ...state,
          deletionProcessing: false,
        }
      );

    case ActionTypes.TOGGLE_ACTIVE_COMPLETE:
      return {
        ...state
      };

    case ActionTypes.PRODUCT_LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}

// Exporting a variety of selectors in the form of a object from the entity adapter
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = featureAdapter.getSelectors();
