import { Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import frequencyData from './assets/data.json';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type Settings = {
    mode: string;
    rounds: number;
}

function Menu() {
    const [settings, setSettings] = useState<Settings>({
        mode: "Frequency",
        rounds: 5,
    });

    const [_, setCharactersOpen] = useState(false);
    
    return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <FormControl>
            <InputLabel id="select-mode-label">Mode</InputLabel>
            <Select 
                labelId="select-mode-label"
                value={settings.mode}
                label="Mode"
            >
                <MenuItem value="Frequency">Frequency</MenuItem>
                <MenuItem value="Uniform" disabled>Uniform</MenuItem>
            </Select>
        </FormControl>
        <Button variant="contained" onClick={() => setCharactersOpen(true)} disabled>
            Characters
        </Button>
        <TextField
            label="Guesses"
            type="number"
            value={settings.rounds}
            onChange={(e) => {
                const rounds = parseInt(e.target.value);
                setSettings({ ...settings, rounds });
            }}
        />
        </Stack>
        <Divider />
        <Link to="/run" state={{ frequencyData, rounds: settings.rounds }}>
            <Button variant="contained">Start</Button>
        </Link>
      
    </Stack>
    );
  }
  
export default Menu;