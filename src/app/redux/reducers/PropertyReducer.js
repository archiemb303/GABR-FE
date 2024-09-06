import { useSelector } from "react-redux";
import {
  ADD_NEW_PROPERTY,
  FETCH_MY_PROPERTY,
  GET_INDIVIDUAL_PROPERTY,
  GET_SEARCHED_PROPERTIES,
  GET_INDIVIDUAL_SEARCHED_PROPERTIES_DETAILS,
  UPDATE_BASIC_PROPERTY_DETAILS,
  UPDATE_TENANCY_TERMS,
  UPDATE_TENANT_PREFERENCE,
  GENERATE_AGREEMENT_DRAFT,
  UPDATE_AGREEMENT_DRAFT,
  CHECK_AGREEMENT_SIGNING,
  REFRESH_AGREEMENT_SIGNING,
  INITIATE_AGREEMENT_SIGNING,
  FETCH_LATEST_AGREEMENT_DRAFT,
  VERIFY_AGREEMENT,
  FETCH_TENANCY_INCLUSIONS,
  ADD_TENANCY_INCLUSIONS,
  UPDATE_TENANCY_INCLUSIONS,
  ADD_OR_UPDATE_LISTING,
  ADD_LISTING_IMAGES,
  REMOVE_LISTING_IMAGES,
  ADD_OR_UPDATE_LISTING_CONTACT,
  SEND_LISTING_CONTACT_OTP,
  VERIFY_LISTING_CONTACT_OTP,
  PUBLISH_LISTING,
  SELECT_PACKAGE_PREFERENCE,
  CREATE_NEW_TENANCY,
  GET_TENANCY_COMMUNICATION,
  SEND_TENANCY_COMMUNICATION,
  UPDATE_PROPERTY_PROFILE_PIC,
  ADD_UPDATE_TENANCY_FITTINGS,
  REMOVE_TENANCY_INCLUSIONS,
  ADD_TENANCY_PARTIES,
  FETCH_MY_INVITATIONS,
  DEACTIVATE_TENANCY,
  MANAGE_PARTY_INVITATIONS,
  EDIT_TENANCY_PARTIES,
  REMOVE_ACTIVE_LISTING,
  PAST_SAVE_SEARCHES,
  ADD_SAVED_SEARCHES,
  SHORTLISTED_PROPERTIES,
  ADD_SHORTLISTED_PROPERTY,
  GET_CONTACT_LISTING,
  RESET_PROPERTY,
  GET_LISTING_PERFORMANCE,
  ADD_PREMIUM_SEEKER,
  REMOVE_SHORTLISTED_PROPERTY,
  REMOVE_SAVED_SEARCHES,
  ADD_REPORTED_lISTING,
  GET_REPORT_TYPE,
  REMOVE_TENANCY_PARTIES,
  ADD_STAMP_PAPER_REQUEST,
  UPDATE_ONLY_PROPERTY_PROFILE_PIC,
  MARK_PREMIUM_TENANCY,
  MARK_PREMIUM_TENANCY_BY_SEEKER_ID,
  INITIATE_RENTAL_PAYMENT,
  VERIFY_RENTAL_PAYMENT,
  FETCH_ALL_RENTAL_PAYMENT_RECEIPTS,
  FETCH_INDIVIDUAL_RENTAL_PAYMENT_RECEIPTS,
  GET_ALL_TENANCIES,
  SEND_RENT_PAYMENT_INVOICE_EMAIL,
} from "../actions/PropertyActions";

const initialState = {
  addNewProperty: null,
  fetchMyProperty: null,
  individualProperty: null,
  searchedProperties: null,
  individualSearchedPropertiesDetails: null,
  generatedAgreementDraft: null,
  fetchTenancyInclusions: null,
  removedListingImages: null,
  newTenancy: null,
  getTenancyCommunication: null,
  sendTenancyCommunication: null,
  removeTenancyInclusions: null,
  addTenancyParties: null,
  fetchMyInvitations: null,
  managePartyInvitations: null,
  editTenancyParties: null,
  removeTenancyParties: null,
  pastSavedSearches: null,
  addPastSavedSearche: null,
  shortlistedProperties: null,
  addShortlistedProperties: null,
  contactlisted: null,
  listingPerformanceDetails: null,
  addPremiumSeeker: null,
  addReportedListing: null,
  getReportType: null,
  updatedAgreementDraft: null,
  addStampPaperRequest: null,
  updatedPropertyPic: null,
  markPremiumTenancy: null,
  markPremiumTenancyBySeekerID: null,
  initiateRentalPayment: null,
  verifyRentalPayment: null,
  rentalReceipts: null,
  individualRentalPaymentReceipt: null,
  getAllTenancies: null,
  sendRentPaymentInvoiceEmail: null,
};
const PropertyReducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_PROPERTY: {
      return { ...state, addNewProperty: action.payload.Payload };
    }
    case PAST_SAVE_SEARCHES: {
      return {
        ...state,
        pastSavedSearches: action.payload.Payload.payload.Payload,
      };
    }
    case ADD_SAVED_SEARCHES: {
      return {
        ...state,
        addPastSavedSearches: action.payload.Payload.payload.Payload,
      };
    }
    case UPDATE_ONLY_PROPERTY_PROFILE_PIC: {
      const updatedFetchMyProperty = state.fetchMyProperty.map((property) => {
        if (
          property.property_id === action.payload.Payload.payload.property_id
        ) {
          return {
            ...property,
            file_url: action.payload.Payload.payload.file_url,
          };
        }
        return property;
      });
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          basic_details: {
            ...state.individualProperty.basic_details,
            file_url: action.payload.Payload.payload.file_url,
            profile_pic: action.payload.Payload.payload.file_url,
          },
        },
        fetchMyProperty: updatedFetchMyProperty,
        updatedPropertyPic: action.payload.Payload.payload,
      };
    }
    case SHORTLISTED_PROPERTIES: {
      return {
        ...state,
        shortlistedProperties: action.payload.Payload.payload,
      };
    }
    case ADD_SHORTLISTED_PROPERTY: {
      // console.log(action.payload.Payload.payload);

      return {
        ...state,
        addShortlistedProperties: action.payload.Payload.payload,
      };
    }
    case REMOVE_SHORTLISTED_PROPERTY: {
      // console.log(action.payload.Payload.payload);
      return {
        ...state,
        // shortlistedProperties: action.payload.Payload.payload,
      };
    }
    case GET_CONTACT_LISTING: {
      return { ...state, contactlisted: action.payload.Payload.payload };
    }
    case GET_LISTING_PERFORMANCE: {
      return {
        ...state,
        listingPerformanceDetails: action.payload.Payload.payload,
      };
    }
    case ADD_PREMIUM_SEEKER: {
      return {
        ...state,
        addPremiumSeeker: action.payload.Payload,
      };
    }

    case FETCH_MY_PROPERTY: {
      return {
        ...state,
        fetchMyProperty: action.payload.Payload.payload.Payload,
        addNewProperty: null,
      };
    }
    case GET_INDIVIDUAL_PROPERTY: {
      action?.payload?.Payload?.payload?.tenancy_details?.tenancy_terms?.utilities?.sort(
        (utility1, utility2) => {
          return utility1?.utility_id - utility2?.utility_id;
        }
      );
      return {
        ...state,
        individualProperty: action?.payload?.Payload?.payload,
      };
    }

    case GET_SEARCHED_PROPERTIES: {
      return {
        ...state,
        searchedProperties: action.payload.Payload.payload,
      };
    }

    case GET_INDIVIDUAL_SEARCHED_PROPERTIES_DETAILS: {
      return {
        ...state,
        individualSearchedPropertiesDetails: action.payload.Payload.payload,
      };
    }
    case UPDATE_BASIC_PROPERTY_DETAILS: {
      // Update the fetchMyProperty list for real time updates
      const agreementDetails = [
        ...state.individualProperty.tenancy_details.agreement_details,
      ];
      if (agreementDetails.length > 0) {
        agreementDetails[0].last_modification_details.modifications.push(
          action.payload.Payload.payload?.last_modification_details
        );
      }
      const currentPropertyId =
        state.individualProperty.basic_details.property_id;
      const index = state.fetchMyProperty.findIndex(
        (el) => el.property_id === currentPropertyId
      );

      const newFetchMyProperty = [...state.fetchMyProperty];
      newFetchMyProperty[index] = {
        ...newFetchMyProperty[index],
        property_name: action.payload.Payload.payload.property_name,
        address_line_1: action.payload.Payload.payload.address_line_1,
        creator_name: action.payload.Payload.payload.property_creator_type_name,
        party_type_name:
          action.payload.Payload.payload.property_creator_type_name,
      };
      // 🛑Testing - Delete this on 19 January 2023
      // let newFetchMyProperties = [...state.fetchMyProperty];
      // newFetchMyProperties[index] = {
      //     ...newFetchMyProperties[index],
      //     isSelected: true,
      //     property_name: action.payload.Payload.payload.property_name,
      //     address_line_1: action.payload.Payload.payload.address_line_1,
      // };

      // Update the individualProperty
      // console.log(newFetchMyProperty);
      return {
        ...state,
        fetchMyProperty: newFetchMyProperty,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            agreement_details: agreementDetails,
          },
          basic_details: {
            ...action.payload.Payload.payload,
          },
        },
        // 🛑Testing - Delete this on 19 January 2023
        // fetchMyProperty: newFetchMyProperties,
      };
    }

    case ADD_OR_UPDATE_LISTING: {
      // Update the individualProperty
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          listing_details: {
            ...action.payload.Payload.payload.listing_details,
          },
        },
      };
    }

    case UPDATE_TENANCY_TERMS: {
      const agreementDetails = [
        ...state.individualProperty.tenancy_details.agreement_details,
      ];
      if (agreementDetails.length > 0) {
        agreementDetails[0].last_modification_details.modifications.push(
          action.payload.Payload.payload?.last_modification_details
        );
      }

      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            agreement_details: agreementDetails,
            tenancy_terms: {
              ...state.individualProperty.tenancy_details.tenancy_terms,
              ...action.payload.Payload.payload,
              mandatory_deductions:
                action.payload.Payload.payload?.mandatory_deductions ?? [],
              utilities: action.payload.Payload.payload?.utilities,
            },
          },
        },
      };
    }
    case UPDATE_TENANT_PREFERENCE: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          listing_details: action.payload.Payload.payload.listing_details,
        },
      };
    }
    case GENERATE_AGREEMENT_DRAFT: {
      return {
        ...state,
        generatedAgreementDraft: action.payload?.Payload,
      };
    }
    case UPDATE_AGREEMENT_DRAFT: {
      return {
        ...state,
        updatedAgreementDraft:
          action.payload.Payload.payload.tenancy_details.agreement_details[0]
            .agreement_content,
        generatedAgreementDraft: {
          ...state.generatedAgreementDraft,
          is_latest_draft_present: true,
          agreement_content:
            action.payload.Payload.payload.tenancy_details.agreement_details[0]
              .agreement_content,
        },
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: action.payload.Payload.payload.tenancy_details,
        },
      };
    }
    case INITIATE_AGREEMENT_SIGNING: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: action.payload.Payload.payload.tenancy_details,
        },
      };
    }
    case CHECK_AGREEMENT_SIGNING: {
      if (action.payload.Payload.payload.signature_flag == true) {
        return {
          ...state,
          agreementSignatureFlag: action.payload.Payload.payload.signature_flag,
          individualProperty: {
            ...state.individualProperty,
            tenancy_details: {
              ...state.individualProperty.tenancy_details,
              party_details: action.payload.Payload.payload.party_details,
            },
          },
        };
      } else {
        return {
          ...state,
          agreementSignatureURL: action.payload.Payload.payload.signature_url,
          agreementSignatureFlag: action.payload.Payload.payload.signature_flag,
        };
      }
    }
    case REFRESH_AGREEMENT_SIGNING: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: action.payload.Payload.payload.tenancy_details,
        },
      };
    }
    case FETCH_LATEST_AGREEMENT_DRAFT: {
      return {
        ...state,
        generatedAgreementDraft: {
          ...state.generatedAgreementDraft,
          agreement_content:
            action.payload.Payload.payload.agreement_details.agreement_content,
        },
      };
    }
    case VERIFY_AGREEMENT: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: action.payload.Payload.payload.tenancy_details,
        },
      };
    }
    case FETCH_TENANCY_INCLUSIONS: {
      return { ...state, fetchTenancyInclusions: action.payload.Payload };
    }
    case ADD_TENANCY_INCLUSIONS: {
      const agreementDetails = [
        ...state.individualProperty.tenancy_details.agreement_details,
      ];
      if (agreementDetails.length > 0) {
        agreementDetails[0].last_modification_details.modifications.push(
          action.payload.Payload?.last_modification_details
        );
      }
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            tenancy_inclusions:
              action.payload.Payload?.tenancy_inclusion_details,
            agreement_details: agreementDetails,
          },
        },
      };
    }
    case UPDATE_TENANCY_INCLUSIONS: {
      const agreementDetails = [
        ...state.individualProperty.tenancy_details.agreement_details,
      ];
      if (agreementDetails.length > 0) {
        agreementDetails[0].last_modification_details.modifications.push(
          action.payload.Payload?.last_modification_details
        );
      }
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            agreement_details: agreementDetails,
            tenancy_inclusions:
              state.individualProperty?.tenancy_details?.tenancy_inclusions?.map(
                (inclusion) => {
                  if (
                    action.payload.Payload?.tenancy_inclusion_details?.[0]
                      ?.tenancy_inclusion_id === inclusion?.tenancy_inclusion_id
                  ) {
                    return action.payload.Payload
                      ?.tenancy_inclusion_details?.[0];
                  }
                  return inclusion;
                }
              ),
          },
        },
      };
    }
    case ADD_LISTING_IMAGES: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          listing_details: action.payload.Payload.payload.listing_details,
        },
      };
    }
    case REMOVE_LISTING_IMAGES: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          listing_details: {
            ...state.individualProperty.listing_details,
            listing_images:
              state.individualProperty.listing_details.listing_images.filter(
                (image) =>
                  image.image_id != action.payload.Payload.payload[0].image_id
              ),
          },
        },
      };
    }

    case DEACTIVATE_TENANCY: {
      const individual = state.individualProperty;
      return {
        ...state,
        newTenancy: null,
        individualProperty: {
          ...individual,
          tenancy_details: {
            ...individual?.tenancy_details,
            tenancy_terms: null,
            tenancy_fittings: null,
            tenancy_inclusions: null,
            party_details: [],
            agreement_details: [],
            all_tenancy: individual?.tenancy_details?.all_tenancy?.map(
              (tenancy) => {
                if (tenancy.tenancy_id === action.payload.Payload.tenancy_id) {
                  return {
                    ...tenancy,
                    status: action.payload.Payload.status,
                  };
                }
                return tenancy;
              }
            ),
          },
        },
      };
    }

    case ADD_OR_UPDATE_LISTING_CONTACT: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          listing_details: action.payload.Payload.payload.listing_details,
        },
      };
    }

    case SEND_LISTING_CONTACT_OTP: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          listing_details: action.payload.Payload.payload.listing_details,
        },
      };
    }

    case VERIFY_LISTING_CONTACT_OTP: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          listing_details: action.payload.Payload.payload.listing_details,
        },
      };
    }

    case PUBLISH_LISTING: {
      const newFetchMyProperties = state.fetchMyProperty.map((property) => {
        if (
          property.property_id ===
          action.payload.Payload.payload.listing_details.property_id
        ) {
          return { ...property, status_name: "Active-Listed" };
        } else {
          return { ...property };
        }
      });
      return {
        ...state,
        fetchMyProperty: newFetchMyProperties,
        individualProperty: {
          ...state.individualProperty,
          listing_details: action.payload.Payload.payload.listing_details,
        },
      };
    }
    case CREATE_NEW_TENANCY: {
      const response = action.payload.Payload;
      response?.utilities?.sort((utility1, utility2) => {
        return utility1?.utility_id - utility2?.utility_id;
      });
      const individual = state.individualProperty;

      // const newPartyDetails = [
      //   {
      //     ...response?.tenancy_party_details[0],
      //     party_type_name: "Owner",
      //   },
      // ];
      const newAllTenancy = [...individual?.tenancy_details?.all_tenancy];
      newAllTenancy.push(response);
      return {
        ...state,
        newTenancy: response,
        individualProperty: {
          ...individual,
          tenancy_details: {
            ...individual?.tenancy_details,
            tenancy_terms: {
              ...individual?.tenancy_details.tenancy_terms,
              tenancy_id: response?.tenancy_id,
              start_date: response?.start_date,
              end_date: response?.end_date,
              rent_per_month: response?.rent_per_month,
              security_deposit: response?.security_deposit,
              renewal_rate: response?.renewal_rate,
              added_date: response?.added_date,
              last_modified_date: response?.last_modified_date,
              property_id: response?.property_id,
              listing_id: response?.listing_id,
              status: response?.status,
              added_by: response?.added_by,
              last_modified_by: response?.last_modified_by,
              utilities: response?.utilities,
              mandatory_deductions: [],
            },
            party_details: [],
            all_tenancy: newAllTenancy,
          },
        },
      };
    }

    case SELECT_PACKAGE_PREFERENCE: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          listing_details: action.payload.Payload.payload.listing_details,
        },
      };
    }

    case GET_TENANCY_COMMUNICATION: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            communications: action.payload.Payload.payload,
          },
        },
      };
    }

    case SEND_TENANCY_COMMUNICATION: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            communications: [
              ...state.individualProperty.tenancy_details.communications,
              action.payload.Payload.payload,
            ],
          },
        },
      };
    }

    case UPDATE_PROPERTY_PROFILE_PIC: {
      const updatedFetchMyProperty = state.fetchMyProperty.map((property) => {
        if (
          property.property_id === action.payload.Payload.payload.property_id
        ) {
          return {
            ...property,
            creator_name: action.payload.Payload.payload.party_type_name,
            file_url: action.payload.Payload.payload.file_url,
          };
        }
        return property;
      });
      return {
        ...state,
        fetchMyProperty: updatedFetchMyProperty,
      };
    }

    case ADD_TENANCY_PARTIES: {
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            is_party_flag:
              state.individualProperty.tenancy_details.is_party_flag === true
                ? true
                : action.payload.Payload.payload.is_party_flag,
            party_details: [
              ...state.individualProperty.tenancy_details.party_details,
              action.payload.Payload.payload.party_details[0],
            ],
          },
        },
        addTenancyParties: action.payload.Payload.payload.party_details[0],
      };
    }

    case ADD_UPDATE_TENANCY_FITTINGS: {
      const agreementDetails = [
        ...state.individualProperty.tenancy_details.agreement_details,
      ];
      if (agreementDetails.length > 0) {
        agreementDetails[0].last_modification_details.modifications.push(
          action.payload.Payload?.last_modification_details
        );
      }
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            agreement_details: agreementDetails,
            tenancy_fittings: action.payload.Payload.payload,
          },
        },
      };
    }

    case REMOVE_TENANCY_INCLUSIONS: {
      const agreementDetails = [
        ...state.individualProperty.tenancy_details.agreement_details,
      ];
      if (agreementDetails.length > 0) {
        agreementDetails[0].last_modification_details.modifications.push(
          action.payload.Payload.payload?.last_modification_details
        );
      }
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            agreement_details: agreementDetails,
            tenancy_inclusions:
              state.individualProperty.tenancy_details.tenancy_inclusions.filter(
                (inclusion) =>
                  inclusion.tenancy_inclusion_id !=
                  action.payload.Payload.payload?.tenancy_inclusion_details?.[0]
                    .tenancy_inclusion_id
              ),
          },
        },
      };
    }

    case FETCH_MY_INVITATIONS: {
      return { ...state, fetchMyInvitations: action.payload.Payload.reverse() };
    }

    case MANAGE_PARTY_INVITATIONS: {
      const newFetchMyProperty = state?.fetchMyProperty?.map((property) => {
        if (
          property?.property_id === action?.payload?.Payload?.property_id_id
        ) {
          return {
            ...property,
            party_status_id: action?.payload?.Payload?.status_id,
          };
        } else {
          return property;
        }
      });
      const newPartyDetails =
        state?.individualProperty?.tenancy_details?.party_details?.map(
          (property) => {
            if (
              property?.tenancy_party_id ===
              action?.payload?.Payload?.tenancy_party_id
            ) {
              return {
                ...property,
                status: action?.payload?.Payload?.status_id,
              };
            } else {
              return property;
            }
          }
        );
      let newIndividualPeoperty = null;
      if (state.individualProperty) {
        newIndividualPeoperty = {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty?.tenancy_details,
            is_party_flag:
              action?.payload?.Payload?.status_id === 4 ? true : false,
            party_details: newPartyDetails,
          },
        };
      }
      return {
        ...state,
        fetchMyProperty: newFetchMyProperty,
        individualProperty: newIndividualPeoperty,
        fetchMyInvitations: state.fetchMyInvitations?.map((invitation) => {
          if (
            invitation?.tenancy_party_id ===
            action?.payload?.Payload?.tenancy_party_id
          ) {
            return {
              ...invitation,
              status_id: action?.payload?.Payload?.status_id,
            };
          }
          return invitation;
        }),
      };
    }
    case EDIT_TENANCY_PARTIES: {
      const response = action.payload.Payload.payload;
      const agreementDetails = [
        ...state.individualProperty.tenancy_details.agreement_details,
      ];
      if (agreementDetails.length > 0) {
        agreementDetails[0].last_modification_details.modifications.push(
          response.last_modification_details
        );
      }
      let agreementVerificationParties = [];
      if (
        state.individualProperty.tenancy_details?.agreement_verification_details
          ?.verification_parties
      ) {
        agreementVerificationParties = [
          ...state.individualProperty.tenancy_details
            ?.agreement_verification_details?.verification_parties,
        ];
        agreementVerificationParties.map((item) => {
          if (item.partyProfileId === response.basic_details.party_profile_id) {
            item.party_name =
              response.basic_details.first_name +
              " " +
              response.basic_details.last_name;
          }
          return item;
        });
      }
      let newPartyDetails = [
        ...state.individualProperty.tenancy_details.party_details,
      ];

      const index = newPartyDetails.findIndex(
        (item) =>
          item.tenancy_party_id === response.basic_details.tenancy_party_id
      );
      newPartyDetails[index] = {
        ...newPartyDetails[index],
        // ...response.id[0][0],
        ...response.basic_details,
        ids: response.ids[0],
      };

      return {
        ...state,
        editTenancyParties: response,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            agreement_details: agreementDetails,
            agreement_verification_details: {
              ...state.individualProperty.tenancy_details
                .agreementVerificationDetails,
              verification_parties: agreementVerificationParties,
            },
            party_details: newPartyDetails,
          },
        },
      };

      return { ...state, editTenancyParties: action.payload.Payload };
    }
    case REMOVE_TENANCY_PARTIES: {
      // console.log(action.payload);
      const response = action.payload.Payload;
      const agreementDetails = [
        ...state.individualProperty.tenancy_details.agreement_details,
      ];
      if (agreementDetails.length > 0) {
        agreementDetails[0].last_modification_details.modifications.push(
          response.last_modification_details
        );
      }
      let PartyDetails = [
        ...state.individualProperty.tenancy_details.party_details,
      ];
      const newPartyDetails = PartyDetails.map((item) => {
        if (item.tenancy_party_id === response.tenancy_party_id) {
          return { ...item, status: response.status_id };
        }
        return item;
      });
      // console.log(newPartyDetails);
      // const index = newPartyDetails.findIndex(
      //   (item) =>
      //     item.tenancy_party_id !== response.tenancy_id_id
      // );

      // newPartyDetails[index] = {
      //   ...newPartyDetails[index],
      //   // ...response.id[0][0],
      //   ...response.basic_details,
      // };

      return {
        ...state,
        removeTenancyParties: response,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            is_party_flag: response.is_party_flag,
            agreement_details: agreementDetails,
            party_details: newPartyDetails,
            is_party_flag: response.is_party_flag,
          },
        },
      };

      // return { ...state, editTenancyParties: action.payload.Payload };
    }

    case REMOVE_ACTIVE_LISTING: {
      const newFetchMyProperties = state.fetchMyProperty.map((property) => {
        if (
          property.property_id === action.payload.Payload.payload.property_id_id
        ) {
          return { ...property, status_name: "Active-Draft" };
        } else {
          return { ...property };
        }
      });

      return {
        ...state,
        fetchMyProperty: newFetchMyProperties,
        individualProperty: {
          ...state.individualProperty,
          listing_details: {
            ...state.individualProperty.listing_details,
            listing_status: 0,
          },
        },
      };
    }

    case RESET_PROPERTY: {
      return initialState;
    }

    case REMOVE_SAVED_SEARCHES: {
      const newPastSavedSeraches = [...state.pastSavedSearches];
      newPastSavedSeraches.splice(
        newPastSavedSeraches.findIndex(
          (search) =>
            search.search_id === action.payload.Payload.payload.search_id,
          1
        )
      );

      return {
        ...state,
        pastSavedSearches: newPastSavedSeraches,
      };
    }

    case ADD_REPORTED_lISTING: {
      return {
        ...state,
        addReportedListing: action.payload.Payload.payload.Payload,
      };
    }
    case GET_REPORT_TYPE: {
      return {
        ...state,
        getReportType: action.payload.Payload.payload,
      };
    }
    case ADD_STAMP_PAPER_REQUEST: {
      const agreementDetails = [
        ...state.individualProperty.tenancy_details.agreement_details,
      ];
      if (agreementDetails.length > 0) {
        agreementDetails[0] = {
          ...agreementDetails[0],
          stamp_request_status: action.payload.Payload?.request_status,
        };
      }
      return {
        ...state,
        individualProperty: {
          ...state.individualProperty,
          tenancy_details: {
            ...state.individualProperty.tenancy_details,
            agreement_details: agreementDetails,
          },
        },
      };
    }
    case MARK_PREMIUM_TENANCY: {
      return {
        ...state,
        markPremiumTenancy: action.payload.Payload,
        generatedAgreementDraft: {
          ...state.generatedAgreementDraft,
          is_premium_present: true,
        },
      };
    }
    case MARK_PREMIUM_TENANCY_BY_SEEKER_ID: {
      return {
        ...state,
        markPremiumTenancyBySeekerID: action.payload.Payload,
        generatedAgreementDraft: {
          ...state.generatedAgreementDraft,
          is_premium_present: true,
        },
      };
    }
    case INITIATE_RENTAL_PAYMENT: {
      return {
        ...state,
        initiateRentalPayment: action?.payload?.Payload,
      };
    }
    case VERIFY_RENTAL_PAYMENT: {
      return {
        ...state,
        verifyRentalPayment: action?.payload?.Payload,
      };
    }
    case FETCH_ALL_RENTAL_PAYMENT_RECEIPTS: {
      return {
        ...state,
        rentalReceipts: action.payload.Payload,
      };
    }
    case FETCH_INDIVIDUAL_RENTAL_PAYMENT_RECEIPTS: {
      return {
        ...state,
        individualRentalPaymentReceipt: action.payload.Payload,
      };
    }
    case GET_ALL_TENANCIES: {
      return {
        ...state,
        getAllTenancies: action.payload.Payload.payload,
      };
    }
    case SEND_RENT_PAYMENT_INVOICE_EMAIL: {
      return {
        ...state,
        sendRentPaymentInvoiceEmail: action.payload.Payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default PropertyReducer;
