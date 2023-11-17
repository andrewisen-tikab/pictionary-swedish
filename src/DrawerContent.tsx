import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';

import { WordLists } from './data';

export function DrawerContent() {
    return (
        <>
            <Typography gutterBottom variant="h5" component="div">
                Inställningar
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
                Ange vilka listor som ska används.
                <br />
                Svårighetsnivån för respektive lista visas i parantesen.
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
                        label={`${value.name} (${value.difficulty}/5)`}
                    />
                ))}
            </FormGroup>
        </>
    );
}
