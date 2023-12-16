import { createTheme } from "@mui/material/styles";
/**
 * 
 * To override the styles for the MUI components
 */
export const theme = createTheme({
    components: {

      MuiTextField: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
            color: 'red',
            backgroundColor: 'transparent'
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'black'
          }
      }
    }
    },
  });