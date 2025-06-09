import React, { useState, SyntheticEvent } from 'react';
import { Box, Tabs, Tab, Grid, Typography, TextField, Button } from "@mui/material";
import PlanCard from './PlanCard';
import CheckoutButton from './CheckoutButton';
import Chip from '@mui/material/Chip';
import { useMediaQuery, useTheme } from '@mui/material';

const PlansBanner: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<string>("Profesional-3m");
  const [numUsers, setNumUsers] = useState<number>(6);
  const [isNumUsersValid, setIsNumUsersValid] = useState<boolean>(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const priceIds: Record<string, string> = {
    "Individual-3m": "price_1Q73DoIJX7GSzaJv86Hp4FPF",
    "Estándar-3m": "price_1Q73EjIJX7GSzaJvgPSWhizL",
    "Profesional-3m": "price_1Q73FUIJX7GSzaJvkCAkngAx",
    "Corporativo-3m": "price_1Q77e1IJX7GSzaJvAUjK1im5",
    "Individual-6m": "price_1Q771iIJX7GSzaJvX2dc94Py",
    "Estándar-6m": "price_1Q772jIJX7GSzaJvVSvSDrrn",
    "Profesional-6m": "price_1Q7741IJX7GSzaJvU1FASEtP",
    "Corporativo-6m": "price_1Q77f7IJX7GSzaJvRbdZrADJ",
    "Individual-12m": "price_1Q7755IJX7GSzaJvidAkl4Sg",
    "Estándar-12m": "price_1Q775iIJX7GSzaJviqx3a0ie",
    "Profesional-12m": "price_1Q776IIJX7GSzaJvVpNVB9Tu",
    "Corporativo-12m": "price_1Q77fiIJX7GSzaJvtN2SodFq",
  };

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    const months = newValue === 0 ? "3m" : newValue === 1 ? "6m" : "12m";
    const planPrefix = selectedPlan.split('-')[0]; // "Individual", "Estándar", etc.
    setSelectedPlan(`${planPrefix}-${months}`);
  };

  const handleSelectPlan = (plan: string) => {
    const months = tabIndex === 0 ? "3m" : tabIndex === 1 ? "6m" : "12m";
    setSelectedPlan(`${plan}-${months}`);

    if (plan === "Corporativo") {
      setNumUsers(6);
    }
  };

  const handleNumUsersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? 6 : parseInt(event.target.value, 10);
    setNumUsers(newValue);

    if (newValue >= 6 && newValue <= 25) {
      setIsNumUsersValid(true);
    } else {
      setIsNumUsersValid(false);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', textAlign: 'center', paddingTop:'4rem', paddingBottom:'8rem'}}>
        <Typography variant="h4" sx={{ fontWeight:'500', fontSize:{xs:'2rem',md:'2.75rem'}}}>Selecciona tu plan</Typography>
        <Tabs value={tabIndex} onChange={handleChangeTab} variant="scrollable" scrollButtons allowScrollButtonsMobile 
            sx={{
              paddingTop: '1.5rem',
              paddingBottom: '3rem',
              '& .MuiTabs-flexContainer': {
                justifyContent: isMobile ? 'flex-start' : 'center' },}}>
        
          <Tab sx={{'&:focus':{outline:'none'},textTransform:'capitalize',color: '#16273B', fontSize: '1.05rem',fontWeight:'400'}} label="3 meses" />
          <Tab sx={{'&:focus':{outline:'none'},textTransform:'capitalize',color: '#16273B', fontSize: '1.05rem',}} label={
            <Typography component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.5rem' }}>
              6 meses
              <Chip label="-15%" size="small" color='info'/>
            </Typography>
          } />
          <Tab sx={{'&:focus':{outline:'none'},textTransform:'capitalize',color: '#16273B', fontSize: '1.05rem'}} label={
            <Typography component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.5rem' }}>
              12 meses
              <Chip label="-30%" size="small" color='info'/>
            </Typography>
          } />
        </Tabs>

        <Grid container spacing={4} justifyContent="center" sx={{mt:'0'}}>
          <Grid item>
            <PlanCard
              clase={`plan-card ${selectedPlan.startsWith("Individual") ? "dark" : ""}`}
              name="Individual"
              monthlyPrice={tabIndex === 0 ? "$2,500" : tabIndex === 1 ? "$2,125" : "$1,750"}
              totalPrice={tabIndex === 0 ? "$7,500" : tabIndex === 1 ? "$12,750" : "$21,000"}
              users="1"
              selected={selectedPlan.startsWith("Individual")}
              onSelect={() => handleSelectPlan("Individual")}>
              {selectedPlan.startsWith("Individual") && ( 
              <CheckoutButton priceId={priceIds[selectedPlan]} />
            )}
            </PlanCard>
          </Grid>

          <Grid item>
            <PlanCard
              clase={`plan-card ${selectedPlan.startsWith("Estándar") ? "dark" : ""}`}
              name="Estándar"
              monthlyPrice={tabIndex === 0 ? "$6,000" : tabIndex === 1 ? "$5,100" : "$4,200"}
              totalPrice={tabIndex === 0 ? "$18,000" : tabIndex === 1 ? "$30,600" : "$50,400"}
              users="3"
              selected={selectedPlan.startsWith("Estándar")}
              onSelect={() => handleSelectPlan("Estándar")}>
              {selectedPlan.startsWith("Estándar") && ( 
              <CheckoutButton priceId={priceIds[selectedPlan]}/>
            )}
            </PlanCard>
          </Grid>
          
          <Grid item>
            <PlanCard
              clase={`plan-card ${selectedPlan.startsWith("Profesional") ? "dark" : ""}`}
              name="Profesional"
              monthlyPrice={tabIndex === 0 ? "$8,000" : tabIndex === 1 ? "$6,800" : "$5,600"}
              totalPrice={tabIndex === 0 ? "$24,000" : tabIndex === 1 ? "$40,800" : "$67,200"}
              users="5"
              selected={selectedPlan.startsWith("Profesional")}
              onSelect={() => handleSelectPlan("Profesional")}>
              {selectedPlan.startsWith("Profesional") && ( 
              <CheckoutButton priceId={priceIds[selectedPlan]}/>
            )}
            </PlanCard>
          </Grid>

          <Grid item>
            <PlanCard
              clase={`plan-card ${selectedPlan.startsWith("Corporativo") ? "dark" : ""}`}
              name="Corporativo"
              monthlyPrice="Contactar"
              totalPrice=""
              users="5+"
              additionalText="Contáctanos para cotizar"
              selected={selectedPlan.startsWith("Corporativo")}
              onSelect={() => handleSelectPlan("Corporativo")}>
              {selectedPlan.startsWith("Corporativo") && ( 
                <CheckoutButton priceId={priceIds[selectedPlan]} quantity={selectedPlan.startsWith("Corporativo") ? numUsers : 1} />
            )}
            </PlanCard>
            {selectedPlan.startsWith("Corporativo") && (
              <TextField
                id="corporateUsers"
                label="No. de Usuarios"
                size="small"
                type="number"
                value={numUsers}
                onChange={handleNumUsersChange}
                inputProps={{ min: 6, max: 25 }}
                error={!isNumUsersValid}
                helperText={!isNumUsersValid && "El número de usuarios debe estar entre 6 y 25"}
                required
                sx={{
                  width: "120px",
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#16273B',
                    },
                    '&:hover fieldset': {
                      borderColor: '#16273B',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#16273B',
                    },
                  },
                }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PlansBanner;
