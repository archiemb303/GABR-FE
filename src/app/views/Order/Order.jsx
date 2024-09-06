import {
    Container,
    Grid,
    styled,
    Typography,
    Button,
    Table,
    Snackbar,
    IconButton,
    Alert,
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FlexBox } from 'app/components/FlexBox';
import { useDispatch, useSelector } from 'react-redux';
import { FetchMyWalletTransactionsAction, VerifyWalletTransactionsAction, resetAddedWalletTransactionsAction, AddWalletTransactionsAction, SendInvoiceEmail } from 'app/redux/actions/WalletActions';
import Pricing from '../pricing/Pricing1';
import InvoiceItemTable from '../forms/invoice-form/InvoiceItemTable';
import InvoiceList from '../invoice/InvoiceList';
import ViewInvoiceModal from '../Property/ViewInvoiceModal';

export default function Order() {
    const [open, setOpen] = useState(false);
    const [points, setPoints] = useState(0);
    const dispatch = useDispatch();
    const { fetchMyWalletTransactions } = useSelector((state) => state.wallet);
    const { addedWalletTransactions } = useSelector((state) => state.wallet);
    var { paymentFlag } = useSelector((state) => state.wallet);
  const currentUser = useSelector((state) => state.userProfile);
  const openindex = useSelector((state) => state.modal.openViewInvoiceModal);
    function handleClose(_,reason){
        if (reason === "clickaway") {
            return;
        }      
        setOpen(false)
    }
    useEffect(()=>{
        if (paymentFlag){
            setOpen(true)
            dispatch(resetAddedWalletTransactionsAction({}));
        }    
    },[paymentFlag])

    useEffect(()=>{
        if (addedWalletTransactions){
           
            const {
                transaction_amount,
                transaction_summary: transaction_summary,
                currency,
                wallet_id,
                wallet_transaction_id
            } = addedWalletTransactions;
           
            const options = {
                key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                amount: transaction_amount,
                currency: currency,
                name: 'Corporation',
                description: 'Test Transaction',
                // image: { logo },
                order_id: transaction_summary.id,
                handler: async function (response) {
                    const data = {
                        order_creation_id: transaction_summary.id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        wallet_id: wallet_id,
                        wallet_transaction_id: wallet_transaction_id,
                        points: points
                    };
                       dispatch(VerifyWalletTransactionsAction({
                        data
                    })) ;
                    dispatch(SendInvoiceEmail({
                        email_id:currentUser?.email_id,
                        first_name: currentUser?.first_name ,
                        last_name:  currentUser?.last_name,
                        phone: currentUser?.phone_no,
                        transaction_id:fetchMyWalletTransactions?.wallet_transactions?.[0]
                        ?.wallet_transaction_id,
                        date: fetchMyWalletTransactions?.wallet_transactions?.[0]?.added_date,
                        invoice_id: fetchMyWalletTransactions?.wallet_transactions?.[0]
                        ?.transaction_summary?.id,
                        purchase_quantity: fetchMyWalletTransactions?.wallet_transactions?.[
                            0
                          ]?.purchase_quantity,
                          amount: fetchMyWalletTransactions?.wallet_transactions?.[
                           0
                          ]?.transaction_amount


                    }))

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
            dispatch(resetAddedWalletTransactionsAction())
        };
    },[addedWalletTransactions])
    useEffect(() => {
        dispatch(FetchMyWalletTransactionsAction({}));
    }, []);
    
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
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

    async function displayRazorpay(numberOfPoints) {
        setPoints(numberOfPoints)
        const res = await loadScript(
            'https://checkout.razorpay.com/v1/checkout.js'
        );

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }
    
        await dispatch(AddWalletTransactionsAction({
            wallet_id: fetchMyWalletTransactions.wallet_id,
            points: numberOfPoints,
            currency: 'INR',
            }))
            // .then((response) => {
  
    }

    

    return (
        <>
        <Container sx={{ mt: 3, padding: 0 }}>
            <Grid justifyContent="center" container sx={{ gap: 3 }}>
                <Pricing
                    onClick={(point) => displayRazorpay(point)}
                    item
                    xs={5}
                    md={2.5}
                    sx={{
                        backgroundColor: 'steelblue',
                        color: 'white',
                        paddingX: 3,
                        paddingY: 8,
                        border: '1px solid blue',
                    }}
                >
                </Pricing>
            </Grid>
            <Typography mt={2} ml={4}>
                Wallet Balance:{' '}
                {fetchMyWalletTransactions?.credit_point_balance} points
            </Typography>
            <InvoiceList walletTransactions={fetchMyWalletTransactions?.wallet_transactions}></InvoiceList>
            <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }} variant="filled">
            Payment is successful.
            </Alert>
            </Snackbar>
        </Container>
        </>
    );
}
