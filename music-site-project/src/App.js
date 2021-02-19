import logo from './logo.svg';
import './App.css';
import styles from './themes/css/app.css';
import projectTheme from './themes/musicSiteProjectTheme';
import searchBar from './components/searchBar';
import { 
    CssBaseline, 
    ThemeProvider,
    Grid } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';



function App() {
  return (
    <ThemeProvider theme={projectTheme}>
      <CssBaseline />
      <div>
      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center">
          <div className={styles['viewPort']}>
            <p>New App!</p>
            <SearchBar className={styles['searchBar']} />
          </div>
      </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
