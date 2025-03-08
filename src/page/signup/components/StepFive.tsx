import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

function StepFive() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { register, formState } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <TextField
        label="비밀번호"
        fullWidth
        variant="standard"
        type={showPassword ? 'text' : 'password'}
        {...register('password', { required: '비밀번호를 입력해주세요' })}
        error={Boolean(formState.errors?.password) ?? false}
        helperText={String(formState.errors?.password?.message ?? '')}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="비밀번호 재확인"
        fullWidth
        variant="standard"
        type={showPassword ? 'text' : 'password'}
        {...register('password_check', {
          required: '비밀번호를 다시 입력해주세요',
        })}
        error={Boolean(formState.errors?.password_check) ?? false}
        helperText={String(formState.errors?.password_check?.message ?? '')}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}

export default StepFive;
