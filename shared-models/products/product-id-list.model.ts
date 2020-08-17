import { SubSourceProductIdReferenceList, SubscriptionSource } from '../subscribers/subscription-source.model';

export enum ProductIdList {
  EXPLEARNING_REMOTE_COACH = '907jvhn4',
  EXPLEARNING_EXECUTIVE_PRESENCE = 'ko8wpx0c',
  EXPLEARNING_REMOTE_WORK = 'v7h7td9h',
  EXPLEARNING_ONLINE_INTERVIEWS = 'oemqpck1',
  EXPLEARNING_GROUP_INTERVIEWS = 'bug3hcqp',
  MARY_DAPHNE_REMOTE_COACH = '5fff82ic',
  MARY_DAPHNE_EXECUTIVE_PRESENCE = 'oos6fw69',
  MARY_DAPHNE_REMOTE_WORK = 'qo17xor5',
  MARY_DAPHNE_ONLINE_INTERVIEWS = 'fapjp8i0',
  MARY_DAPHNE_GROUP_INTERVIEWS = 'gfjrmdhq'
}

export enum ProductUrlSlugList {
  REMOTE_COACH = 'remote-coach',
  EXECUTIVE_PRESENCE = 'executive-presence:-unlock-the-leader-within',
  REMOTE_WORK = 'remote-work-for-professionals-and-managers:-work-from-home-or-anywhere',
  ONLINE_INTERVIEWS = 'acing-online-interviews-on-zoom,-skype,-and-video-calls',
  GROUP_INTERVIEWS = 'group-interviews:-how-to-stand-out-in-a-crowd-and-influence-people'
}

// The Product/Template pair
export interface ProductReference {
  productId: string;
  productUrlSlug: string;
  mdOrExpSisterProduct: string;
}

// The object containing any number of Product/Template pairs
export interface ProductReferenceList {
  [key: string]: ProductReference;
}

// Set the key to the Product ID Searchable by product ID
export const ProductReferenceList: ProductReferenceList = {
  [ProductIdList.EXPLEARNING_REMOTE_COACH]: {
    productId: ProductIdList.EXPLEARNING_REMOTE_COACH,
    productUrlSlug: ProductUrlSlugList.REMOTE_COACH,
    mdOrExpSisterProduct: ProductIdList.MARY_DAPHNE_REMOTE_COACH
  },
  [ProductIdList.EXPLEARNING_EXECUTIVE_PRESENCE]: {
    productId: ProductIdList.EXPLEARNING_EXECUTIVE_PRESENCE,
    productUrlSlug: ProductUrlSlugList.EXECUTIVE_PRESENCE,
    mdOrExpSisterProduct: ProductIdList.MARY_DAPHNE_EXECUTIVE_PRESENCE
  },
  [ProductIdList.EXPLEARNING_REMOTE_WORK]: {
    productId: ProductIdList.EXPLEARNING_REMOTE_WORK,
    productUrlSlug: ProductUrlSlugList.REMOTE_WORK,
    mdOrExpSisterProduct: ProductIdList.MARY_DAPHNE_REMOTE_WORK
  },
  [ProductIdList.EXPLEARNING_ONLINE_INTERVIEWS]: {
    productId: ProductIdList.EXPLEARNING_ONLINE_INTERVIEWS,
    productUrlSlug: ProductUrlSlugList.ONLINE_INTERVIEWS,
    mdOrExpSisterProduct: ProductIdList.MARY_DAPHNE_ONLINE_INTERVIEWS
  },
  [ProductIdList.EXPLEARNING_GROUP_INTERVIEWS]: {
    productId: ProductIdList.EXPLEARNING_GROUP_INTERVIEWS,
    productUrlSlug: ProductUrlSlugList.GROUP_INTERVIEWS,
    mdOrExpSisterProduct: ProductIdList.MARY_DAPHNE_GROUP_INTERVIEWS
  },
  [ProductIdList.MARY_DAPHNE_REMOTE_COACH]: {
    productId: ProductIdList.MARY_DAPHNE_REMOTE_COACH,
    productUrlSlug: ProductUrlSlugList.REMOTE_COACH,
    mdOrExpSisterProduct: ProductIdList.EXPLEARNING_REMOTE_COACH
  },
  [ProductIdList.MARY_DAPHNE_EXECUTIVE_PRESENCE]: {
    productId: ProductIdList.MARY_DAPHNE_EXECUTIVE_PRESENCE,
    productUrlSlug: ProductUrlSlugList.EXECUTIVE_PRESENCE,
    mdOrExpSisterProduct: ProductIdList.EXPLEARNING_EXECUTIVE_PRESENCE
  },
  [ProductIdList.MARY_DAPHNE_REMOTE_WORK]: {
    productId: ProductIdList.MARY_DAPHNE_REMOTE_WORK,
    productUrlSlug: ProductUrlSlugList.REMOTE_WORK,
    mdOrExpSisterProduct: ProductIdList.EXPLEARNING_REMOTE_WORK
  },
  [ProductIdList.MARY_DAPHNE_ONLINE_INTERVIEWS]: {
    productId: ProductIdList.MARY_DAPHNE_ONLINE_INTERVIEWS,
    productUrlSlug: ProductUrlSlugList.ONLINE_INTERVIEWS,
    mdOrExpSisterProduct: ProductIdList.EXPLEARNING_ONLINE_INTERVIEWS
  },
  [ProductIdList.MARY_DAPHNE_GROUP_INTERVIEWS]: {
    productId: ProductIdList.MARY_DAPHNE_GROUP_INTERVIEWS,
    productUrlSlug: ProductUrlSlugList.GROUP_INTERVIEWS,
    mdOrExpSisterProduct: ProductIdList.EXPLEARNING_GROUP_INTERVIEWS
  },
};

// Used for managing waitlist contact lists on sendgrid
export const SubSourceProductIdReferences: SubSourceProductIdReferenceList = {
  [ProductIdList.EXPLEARNING_EXECUTIVE_PRESENCE]: {
    subSource: SubscriptionSource.WAIT_LIST_EXECUTIVE_PRESENCE,
    productId: ProductIdList.EXPLEARNING_EXECUTIVE_PRESENCE
  },
  [ProductIdList.EXPLEARNING_REMOTE_WORK]: {
    subSource: SubscriptionSource.WAIT_LIST_REMOTE_WORK,
    productId: ProductIdList.EXPLEARNING_REMOTE_WORK
  },
  [ProductIdList.MARY_DAPHNE_EXECUTIVE_PRESENCE]: {
    subSource: SubscriptionSource.WAIT_LIST_EXECUTIVE_PRESENCE,
    productId: ProductIdList.MARY_DAPHNE_EXECUTIVE_PRESENCE
  },
  [ProductIdList.MARY_DAPHNE_REMOTE_WORK]: {
    subSource: SubscriptionSource.WAIT_LIST_REMOTE_WORK,
    productId: ProductIdList.MARY_DAPHNE_REMOTE_WORK
  },
};
