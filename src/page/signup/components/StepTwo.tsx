import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { instance } from '../../../axios/instance';

function StepTwo() {
  const { formState, register, getValues } = useFormContext();

  const reVerify = async () => {
    const { email } = getValues();
    const { status } = await instance.put('/auth/email', {
      email: `${email}@sogang.ac.kr`,
    });
  };

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
      <button
        onClick={reVerify}
        className="w-full text-center text-12 text-coral-main underline mt-6"
      >
        인증 코드 재전송
      </button>
    </>
  );
}

export default StepTwo;
