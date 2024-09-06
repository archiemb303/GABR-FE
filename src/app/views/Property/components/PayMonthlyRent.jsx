import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchMyWalletTransactionsAction,
  VerifyWalletTransactionsAction,
  resetAddedWalletTransactionsAction,
  AddWalletTransactionsAction,
  SendInvoiceEmail,
} from "app/redux/actions/WalletActions";
import CustomSnackbar from "app/components/CustomSnackbar";
import {
  initiateRentalPaymentAction,
  verifyRentalPaymentAction,
} from "app/redux/actions/PropertyActions";
import { setOpenPayMonthlyRentRecieptModal } from "app/redux/actions/ModalActions";

export default function PayMonthlyRent({paymentTowardsYear, paymentTowardsMonth, tax}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { fetchMyWalletTransactions } = useSelector((state) => state.wallet);
  const { addedWalletTransactions } = useSelector((state) => state.wallet);
  var { paymentFlag } = useSelector((state) => state.wallet);
  const currentUser = useSelector((state) => state.userProfile);
  const openindex = useSelector((state) => state.modal.openViewInvoiceModal);
  const { individualProperty, initiateRentalPayment, verifyRentalPayment } =
    useSelector((state) => state.property);
  const { VERIFY_WALLET_TRANSACTIONS } = useSelector(
    (store) => store.loadingAndError.loader
  );
  const preloginState = useSelector((state) => state.prelogin);
  function handleClose(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }
  // useEffect(() => {
  //   if (paymentFlag) {
  //     setOpen(true);
  //     dispatch(resetAddedWalletTransactionsAction({}));
  //   }
  // }, [paymentFlag]);

  useEffect(() => {
    if (initiateRentalPayment) {
      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: initiateRentalPayment?.amount_paid,
        currency: "INR",
        name: "Corporation",
        description: "Test Transaction",
        // image: { logo },
        order_id: initiateRentalPayment?.payment_summary?.id,
        handler: async function (response) {
          const data = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            rent_payment_id: initiateRentalPayment?.rent_payment_id,
            profile_id: preloginState.userProfileId,
          };
          dispatch(
            verifyRentalPaymentAction({
              data,
            })
          );
          // dispatch(
          //   SendInvoiceEmail({
          //     email_id: currentUser?.email_id,
          //     first_name: currentUser?.first_name,
          //     last_name: currentUser?.last_name,
          //     phone: currentUser?.phone_no,
          //     transaction_id:
          //       fetchMyWalletTransactions?.wallet_transactions?.[0]
          //         ?.wallet_transaction_id,
          //     date: fetchMyWalletTransactions?.wallet_transactions?.[0]
          //       ?.added_date,
          //     invoice_id:
          //       fetchMyWalletTransactions?.wallet_transactions?.[0]
          //         ?.transaction_summary?.id,
          //     purchase_quantity:
          //       fetchMyWalletTransactions?.wallet_transactions?.[0]
          //         ?.purchase_quantity,
          //     amount:
          //       fetchMyWalletTransactions?.wallet_transactions?.[0]
          //         ?.transaction_amount,
          //   })
          // );
        },

        // hidden: {
        //     contact: true,
        //     email: true
        // }
        // prefill: {
        //     name: "Test",
        //     email: "test@mailinator.com",
        //     contact: "9999999999"
        // },
        // notes: {
        //     address: "Soumya Dey Corporate Office",
        // },
        // theme: {
        //     color: "#61dafb",
        // },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }, [initiateRentalPayment]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    dispatch(
      initiateRentalPaymentAction({
        profile_id: preloginState.userProfileId,
        tenancy_id:
          individualProperty?.tenancy_details?.tenancy_terms?.tenancy_id,
        rent_amount:
          individualProperty?.tenancy_details?.tenancy_terms?.rent_per_month,
        tax: tax,
        payment_towards_year: paymentTowardsYear,
        payment_towards_month: paymentTowardsMonth,
        currency: "INR",
      })
    );
  }

  return (
    <>
      <Button
        disabled={
          individualProperty?.tenancy_details?.tenancy_terms?.rent_per_month <=
          1
        }
        onClick={() =>
          displayRazorpay(
            individualProperty?.tenancy_details?.tenancy_terms?.rent_per_month
          )
        }
        fullWidth
        variant="contained"
        color="primary"
        sx={{ my: 2 }}
      >
        Pay Now
      </Button>
      {paymentFlag && (
        <CustomSnackbar
          loaderChild={VERIFY_WALLET_TRANSACTIONS}
          successMessage="Payment is successful !"
        />
      )}
    </>
  );
}
