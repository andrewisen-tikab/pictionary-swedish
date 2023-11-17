import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

/**
 * Copyright text and links.
 */
export function Copyright() {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="left"
            sx={{
                position: 'absolute',
                bottom: 0,
                pb: 2,
            }}
        >
            {'Skapat med ❤️ '} {' i Stockholm.'}
            <br />©{' '}
            <Link color="inherit" href="https://github.com/andrewisen-tikab/pictionary-swedish">
                André Wisén
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
