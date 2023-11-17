import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import BrushIcon from '@mui/icons-material/Brush';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import { Copyright } from './Copyright';
import { DrawerContent } from './DrawerContent';
import { WordLists, buildWordList, getRandomWord } from './data';
import { defaultTheme } from './defaultTheme';

/**
 * Main app component.
 */
export default function App() {
    // Note: Not the best use of states here.
    // But it works for now.
    const [settingsIsOpen, setSettingsIsOpen] = React.useState(false);
    const [randomWord, setRandomWord] = React.useState<string | null>(null);
    const [wordList, setWordList] = React.useState<string[]>(buildWordList(WordLists));

    /**
     * Request a new random word.
     */
    const onClick = () => {
        setRandomWord(getRandomWord(wordList));
    };

    /**
     * Toggle the settings drawer and rebuild the word list.
     */
    const toggleDrawer =
        () =>
        (event: React.KeyboardEvent | React.MouseEvent): void => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setWordList(buildWordList(WordLists));

            setSettingsIsOpen((state) => !state);
        };

    return (
        // MUI Stuff
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" sx={{ width: '80vw', maxWidth: 1000 }}>
                {/* Reset CSS */}
                <CssBaseline />
                {/* Main content */}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    {/* Hero */}
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <BrushIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Pictionary på svenska
                    </Typography>
                    {/* Content */}
                    <Box
                        sx={{
                            mt: 5,
                            width: '100%',
                            userSelect: 'none',
                        }}
                    >
                        {/*
                        Main word goes here.
                        Return an error if no word list is selected. 
                        */}
                        {wordList.length === 0 ? (
                            <Alert
                                variant="filled"
                                severity="error"
                                icon={false}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography gutterBottom variant="h5" component="div">
                                    Ingen lista är vald!
                                </Typography>
                            </Alert>
                        ) : (
                            randomWord && (
                                <Alert
                                    variant="outlined"
                                    severity="success"
                                    icon={false}
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography gutterBottom variant="h5" component="div">
                                        {randomWord.toLocaleUpperCase()}
                                    </Typography>
                                </Alert>
                            )
                        )}
                        {/* New word button */}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onClick}
                            startIcon={randomWord ? <AddIcon /> : <PlayCircleOutlineIcon />}
                        >
                            {randomWord ? 'Nytt ord' : 'Börja'}
                        </Button>
                        {/* Settings and help (not added yet) */}
                        <Grid container>
                            <Grid item xs>
                                <Link variant="body2" onClick={toggleDrawer()}>
                                    Inställningar
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* Drawer */}
                <Drawer anchor={'right'} open={settingsIsOpen} onClose={toggleDrawer()}>
                    <Box sx={{ px: 10, pt: 5 }}>
                        <DrawerContent />
                        <Link
                            variant="body2"
                            onClick={toggleDrawer()}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                pb: 6,
                            }}
                        >
                            Stäng
                        </Link>
                    </Box>
                </Drawer>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}
