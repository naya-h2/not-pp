import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * 회원가입 step3 - 필수 정보 입력
 */
function StepThree() {
  const {
    formState,
    register,
    setValue: setGender,
    getValues,
  } = useFormContext();
  const [value, setValue] = useState(getValues('gender') ?? '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setGender('gender', (event.target as HTMLInputElement).value);
  };

  return (
    <div className="flex flex-col gap-4">
      <TextField
        label="학번"
        fullWidth
        variant="standard"
        {...register('student_id', { required: '학번을 입력해주세요' })}
        error={Boolean(formState.errors?.student_id) ?? false}
        helperText={String(formState.errors?.student_id?.message ?? '')}
      />
      <TextField
        label="이름"
        fullWidth
        variant="standard"
        {...register('name', { required: '이름을 입력해주세요' })}
        error={Boolean(formState.errors?.name) ?? false}
        helperText={String(formState.errors?.name?.message ?? '')}
      />
      <FormControl>
        <FormLabel className="mt-4">성별</FormLabel>
        <RadioGroup aria-hidden={false} value={value} onChange={handleChange}>
          <FormControlLabel
            value="0"
            control={<Radio size="small" />}
            label="남성"
          />
          <FormControlLabel
            value="1"
            control={<Radio size="small" />}
            label="여성"
          />
        </RadioGroup>
      </FormControl>
      <input hidden {...register('gender')} />
    </div>
  );
}

export default StepThree;
