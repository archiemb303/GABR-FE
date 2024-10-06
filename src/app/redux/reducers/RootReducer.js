import { combineReducers } from "redux";
import EcommerceReducer from "./EcommerceReducer";
import NavigationReducer from "./NavigationReducer";
import NotificationReducer from "./NotificationReducer";
import PropertyReducer from "./PropertyReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import UserProfileReducer from "./UserProfileReducer";
import ModalReducer from "./ModalReducer";
import PreloginReducer from "./PreloginReducer";
import LocationReducer from "./LocationReducer";
import WalletReducer from "./WalletReducer";
import loadingAndErrorReducer from "./LoadingAndErrorReducer";
import FAQReducer from "./FAQReducer";
import SupportCenterReducer from "./SupportCenterReducer";
import { scrollReducer } from "./ScrollReducer";

import brandSpecificReducer from "./BrandSpecificReducers";


const RootReducer = combineReducers({
  scroll: scrollReducer,
  notifications: NotificationReducer,
  navigations: NavigationReducer,
  scrumboard: ScrumBoardReducer,
  ecommerce: EcommerceReducer,
  modal: ModalReducer,
  userProfile: UserProfileReducer,
  property: PropertyReducer,
  prelogin: PreloginReducer,
  location: LocationReducer,
  wallet: WalletReducer,
  loadingAndError: loadingAndErrorReducer,
  faq: FAQReducer,
  supportCenter: SupportCenterReducer,
  
  brandSpecific: brandSpecificReducer,
});

export default RootReducer;
