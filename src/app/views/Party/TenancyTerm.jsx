import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { H4, H5, Paragraph } from 'app/components/Typography';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
    margin: '30px',
    padding: '24px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const InputField = styled(TextField)(() => ({ marginBottom: '16px' }));

const formSchema = {
    startDate: new Date(),
    endDate: new Date(),
    rent: '',
    rentCurrency: '',
    rentAmount: '',
    maintenance: 'included',
    securityDeposit: '',
    securityDepositCurrency: '',
    securityDepositAmount: '',
    renewalPrice: '30',
    mandatoryDeduction: [
        {
            heading: 'Heading',
            description:
                'Lizards are a widespread grou Lizards are a widespread grou Lizards are a widespread grou Lizards are a widespread grou Lizards are a widespread grou Lizards are a widespread grou Lizards are a widespread grou Lizards are a widespread grou ',
            amount: '100',
        },
    ],
};

const handleSubmit = async (values, { isSubmitting }) => {
    console.log(values);
};

function TenancyTerm() {
    const [initialValues, setInitialValues] = useState(formSchema);

    useEffect(() => {}, []);

    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">Tenancy Terms</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setSubmitting,
                        setFieldValue,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container columnSpacing={2}>
                                <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={values.startDate}
                                            onChange={(date) => setFieldValue('startDate', date)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="Term Start Date"
                                                    id="mui-pickers-date"
                                                    sx={{ mb: 2, width: '100%' }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={values.endDate}
                                            onChange={(date) => setFieldValue('endDate', date)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="Term End Date"
                                                    id="mui-pickers-date"
                                                    sx={{ mb: 2, width: '100%' }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <InputField
                                        name="rent"
                                        label="Rent per month"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.rent}
                                        onChange={(event) => {
                                            handleChange(event);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        name="rentCurrency"
                                        label="Currency"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.rentCurrency}
                                        onChange={(event) => {
                                            handleChange(event);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        name="rentAmount"
                                        label="Amount"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.rentAmount}
                                        onChange={(event) => {
                                            handleChange(event);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <InputField
                                        name="securityDeposit"
                                        label="Security Deposit"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.securityDeposit}
                                        onChange={(event) => {
                                            handleChange(event);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        name="securityDepositCurrency"
                                        label="Currency"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.securityDepositCurrency}
                                        onChange={(event) => {
                                            handleChange(event);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        name="securityDepositAmount"
                                        label="Amount"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={values.securityDepositAmount}
                                        onChange={(event) => {
                                            handleChange(event);
                                        }}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <Box sx={{ display: 'flex', mt: 1, mb: 2 }}>
                                        <H5 sx={{ display: 'block', mr: 3, mb: 0.5 }}>Maintenance</H5>
                                        <FormControl component="fieldset" sx={{}}>
                                            <RadioGroup
                                                row
                                                name="maintenance"
                                                value={values.maintenance}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel
                                                    label="Included"
                                                    value="included"
                                                    control={<Radio size="small" color="primary" />}
                                                    sx={{ mr: 3, height: 20 }}
                                                />
                                                <FormControlLabel
                                                    label="Additional"
                                                    value="additional"
                                                    control={<Radio size="small" color="primary" />}
                                                    sx={{ height: 20 }}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box>
                                        <InputField
                                            name="renewalPrice"
                                            label="Price of renewal"
                                            variant="outlined"
                                            size="small"
                                            value={values.renewalPrice}
                                            onChange={(event) => {
                                                handleChange(event);
                                            }}
                                        />
                                        <Tooltip
                                            title="Typically price of renewal is the percentage by which the rent will be increased at the end of this tenancy contract"
                                            arrow
                                        >
                                            <IconButton>
                                                <Icon sx={{ color: 'text.primary' }}>info</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Card variant="outlined" sx={{ p: 1, mt: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                    <H5 sx={{ display: 'inline-block' }}>Mandatory Deductions at time of vacancy</H5>

                                    <Tooltip
                                        title="Example: If the property is painted at the time of letting out, painting charges will be deducted at the end of tenancy"
                                        arrow
                                    >
                                        <IconButton>
                                            <Icon sx={{ color: 'text.primary' }}>help</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                                {values.mandatoryDeduction.map((item, index) => (
                                    <Grid container sx={{ my: 2, mx: 1 }} columnSpacing={2}>
                                        <Grid item xs={10}>
                                            <Grid container columnSpacing={1}>
                                                <Grid item xs={6}>
                                                    <InputField
                                                        fullWidth
                                                        name="heading"
                                                        label="Heading"
                                                        variant="outlined"
                                                        size="small"
                                                        value={item.heading}
                                                        onChange={(event) => {
                                                            handleChange(event);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <InputField
                                                        fullWidth
                                                        name="amount"
                                                        label="Amount"
                                                        variant="outlined"
                                                        size="small"
                                                        value={item.amount}
                                                        onChange={(event) => {
                                                            handleChange(event);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputField
                                                        fullWidth
                                                        name="description"
                                                        label="Description"
                                                        variant="outlined"
                                                        multiline
                                                        rows={6}
                                                        size="small"
                                                        value={item.description}
                                                        onChange={(event) => {
                                                            handleChange(event);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={1}>
                                            <IconButton
                                                onClick={(el) => {
                                                    console.log('👓', index, item);

                                                    setInitialValues((prevState) => {
                                                        const newState = { ...prevState };
                                                        newState.mandatoryDeduction.splice(index, 1);
                                                        return newState;
                                                    });
                                                }}
                                            >
                                                <Icon sx={{ color: 'text.primary' }}>remove_circle_outline</Icon>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Button
                                    sx={{ m: 2, float: 'right' }}
                                    color="primary"
                                    variant="contained"
                                    onClick={(el) => {
                                        setInitialValues((prevState) => {
                                            const newState = { ...prevState };
                                            newState.mandatoryDeduction.push({
                                                heading: '',
                                                description: '',
                                                amount: '',
                                            });
                                            return newState;
                                        });
                                    }}
                                >
                                    Add More
                                    <Icon sx={{ ml: 1 }}>add_circle_outline</Icon>
                                </Button>
                            </Card>

                            <Button sx={{ my: 2 }} color="primary" variant="contained" type="submit">
                                Update
                            </Button>
                        </Form>
                    )}
                </Formik>
            </AccordionDetails>
        </Accordion>
    );
}

export default TenancyTerm;
