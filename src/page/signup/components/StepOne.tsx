import { InputAdornment, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function StepOne() {
  const { formState, register } = useFormContext();

  return (
    <>
      <TextField
        label="이메일"
        fullWidth
        variant="standard"
        {...register('email', { required: '이메일을 입력해주세요' })}
        error={Boolean(formState.errors?.email) ?? false}
        helperText={String(formState.errors?.email?.message ?? '')}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">@sogang.ac.kr</InputAdornment>
            ),
          },
        }}
      />
    </>
  );
}

export default StepOne;
