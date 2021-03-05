import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Defining the theme for the application
 */
const projectTheme = createMuiTheme({
    palette: {
        text: {
            primary: '#BB86FC',
        },
        background: {
            default: '#121212',
        },
    },
});

export default projectTheme;