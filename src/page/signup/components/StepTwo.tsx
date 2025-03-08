import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function StepTwo() {
  const { formState, register } = useFormContext();

  return (
    <>
      <TextField
        label="인증 코드"
        fullWidth
        variant="standard"
        {...register('verify_code', { required: '인증 코드를 입력해주세요' })}
        error={Boolean(formState.errors?.verify_code) ?? false}
        helperText={String(formState.errors?.verify_code?.message ?? '')}
      />
    </>
  );
}

export default StepTwo;
