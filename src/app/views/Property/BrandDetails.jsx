import React from "react";
import { Box, Container, Typography, Grid, Paper, Divider, Button } from "@mui/material";

// Demo brand details data
const brandData = [
    {
        segment: 1,
        name: "Acme Corp",
        industry: "Technology",
        majorCompetitors: ["Tech Solutions", "InnovateX", "GlobalTech"],
        countryOfOperation: "United States",
        targetClients: "Businesses and Enterprises",
        targetCountries: ["United States", "Canada", "United Kingdom", "Australia"],
        natureOfBusiness: "B2B Software and Consulting",
        understandingOfBrand:
            "Acme Corp is a leading player in the technology industry, providing software solutions and consulting services to businesses around the world. The company focuses on innovation and excellence in service delivery, helping its clients achieve their business goals.",
    },
    {
        segment: 2,
        name: "Brand B",
        industry: "Finance",
        majorCompetitors: ["FinancePro", "MoneyMasters", "InvestSmart"],
        countryOfOperation: "Canada",
        targetClients: "Individuals and Small Businesses",
        targetCountries: ["Canada", "USA", "UK"],
        natureOfBusiness: "Financial Services",
        understandingOfBrand:
            "Brand B specializes in financial services, offering tailored solutions to meet the needs of individuals and small businesses.",
    },
    {
        segment: 3,
        name: "Brand C",
        industry: "Healthcare",
        majorCompetitors: ["HealthCare Inc", "Wellness Corp", "MedTech"],
        countryOfOperation: "Australia",
        targetClients: "Patients and Healthcare Providers",
        targetCountries: ["Australia", "New Zealand"],
        natureOfBusiness: "Healthcare Solutions",
        understandingOfBrand:
            "Brand C focuses on delivering innovative healthcare solutions that enhance patient care and streamline healthcare processes.",
    },
    {
        segment: 4,
        name: "EcoLiving",
        industry: "Sustainable Products",
        majorCompetitors: ["GreenChoice", "EcoWare", "Sustainability Co."],
        countryOfOperation: "United Kingdom",
        targetClients: "Eco-conscious consumers and businesses",
        targetCountries: ["United Kingdom", "Germany", "France"],
        natureOfBusiness: "Eco-friendly Home and Office Products",
        understandingOfBrand:
            "EcoLiving is committed to providing sustainable and eco-friendly products for home and office use. The brand focuses on reducing environmental impact through innovative designs and responsible sourcing.",
    },
    {
        segment: 5,
        name: "TravelSphere",
        industry: "Travel and Tourism",
        majorCompetitors: ["TravelGenie", "ExploreMore", "Wanderlust Tours"],
        countryOfOperation: "United States",
        targetClients: "Travel enthusiasts and corporate clients",
        targetCountries: ["United States", "Mexico", "Japan"],
        natureOfBusiness: "Travel Agency and Tour Operator",
        understandingOfBrand:
            "TravelSphere offers comprehensive travel solutions, including personalized itineraries, group tours, and travel management for corporate clients. The brand emphasizes creating memorable experiences while ensuring high-quality service.",
    }
    // Add more brand details as needed
];

const BrandDetailsPage = ({ segment, setIndustryReport, setBrandDetails }) => {
    // Ensure segment is treated as a number
    const selectedSegment = segment ? Number(segment) : 5;
    // Find the selected brand using the segment (id)
    const selectedBrand = brandData.find((brand) => brand.segment === selectedSegment);

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                {/* Brand Name */}
                {selectedBrand ? (
                    <>
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                            {selectedBrand.name}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* Brand Details Grid */}
                        <Grid container spacing={3}>
                            {/* Industry */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    Industry:
                                </Typography>
                                <Typography variant="body1">{selectedBrand.industry}</Typography>
                            </Grid>

                            {/* Major Competitors */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    Major Competitors:
                                </Typography>
                                <Typography variant="body1">
                                    {selectedBrand.majorCompetitors.join(", ")}
                                </Typography>
                            </Grid>

                            {/* Country of Operation */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    Country of Operation:
                                </Typography>
                                <Typography variant="body1">{selectedBrand.countryOfOperation}</Typography>
                            </Grid>

                            {/* Target Clients */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    Target Clients:
                                </Typography>
                                <Typography variant="body1">{selectedBrand.targetClients}</Typography>
                            </Grid>

                            {/* Target Countries */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    Target Countries:
                                </Typography>
                                <Typography variant="body1">
                                    {selectedBrand.targetCountries.join(", ")}
                                </Typography>
                            </Grid>

                            {/* Nature of Business */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    Nature of Business:
                                </Typography>
                                <Typography variant="body1">{selectedBrand.natureOfBusiness}</Typography>
                            </Grid>

                            {/* Our Understanding of the Brand */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    Our Understanding of the Brand:
                                </Typography>
                                <Typography variant="body1" sx={{ textAlign: "justify", mt: 1 }}>
                                    {selectedBrand.understandingOfBrand}
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Typography variant="body1">No brand details available.</Typography>
                )}
            </Paper>
            <Grid container justifyContent="flex-end" spacing={2}>
                <Grid item>
                    <Button variant="contained" color="inherit" onClick={() => {
                        setBrandDetails(false);
                        setIndustryReport(true);
                    }}>
                        Go to Previous Reports
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => {
                        setBrandDetails(false);
                        setIndustryReport(true);
                    }}>Generate Report</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BrandDetailsPage;
