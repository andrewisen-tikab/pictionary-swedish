import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BrushIcon from '@mui/icons-material/Brush';
import Alert from '@mui/material/Alert';
import { WordLists, buildWordList, getRandomWord } from './data';
import Drawer from '@mui/material/Drawer';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Copyright() {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
                position: 'absolute',
                bottom: 0,
                pb: 2,
            }}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/andrewisen-tikab/pictionary-swedish">
                André Wisén
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    },
});

function DrawerContent() {
    return (
        <>
            <Typography gutterBottom variant="h5" component="div">
                Inställningar
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
                Ange vilka listor som ska används.
            </Typography>
            <FormGroup>
                {Object.entries(WordLists).map(([key, value]) => (
                    <FormControlLabel
                        key={key}
                        control={
                            <Checkbox
                                defaultChecked={value.enable}
                                onChange={() => {
                                    value.enable = !value.enable;
                                    const checked = Object.values(WordLists)
                                        .filter((v) => v.enable)
                                        .map((v) => v.name);

                                    console.log(checked);
                                }}
                            />
                        }
                        label={value.name}
                    />
                ))}
            </FormGroup>
        </>
    );
}

export default function App() {
    const [settingsIsOpen, setSettingsIsOpen] = React.useState(false);
    const [randomWord, setRandomWord] = React.useState<string | null>(null);
    const [wordList, setWordList] = React.useState<string[]>(buildWordList(WordLists));

    const onClick = () => {
        setRandomWord(getRandomWord(wordList));
    };

    const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
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
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" sx={{ width: '80vw', maxWidth: 1000 }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <BrushIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Pictionary på svenska
                    </Typography>
                    <Box sx={{ mt: 5, width: '100%' }}>
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

                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onClick}
                        >
                            {randomWord ? 'Nytt ord' : 'Börja'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link variant="body2" onClick={toggleDrawer()}>
                                    Inställningar
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
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
