import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { MEMBER } from '../../../const/member';
import { useFormContext } from 'react-hook-form';

function StepFour() {
  const { register, setValue, getValues } = useFormContext();
  const [major, setMajor] = useState(getValues('major') ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    setMajor(event.target.value);
    setValue('major', event.target.value);
  };

  return (
    <>
      <FormControl fullWidth variant="standard">
        <InputLabel>학과</InputLabel>
        <Select value={major} label="학과" onChange={handleChange}>
          {MEMBER.major.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <input aria-hidden hidden {...register('major')} />
    </>
  );
}

export default StepFour;
