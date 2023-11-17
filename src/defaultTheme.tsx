import { createTheme } from '@mui/material/styles';

/**
 * MUI theme.
 */
export const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    },
});
