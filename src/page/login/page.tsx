import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { instance } from '../../axios/instance';
import BackButton from '../../components/BackButton';

function LoginPage() {
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

  const { register, handleSubmit, getValues, formState, setError } = useForm();

  const login = async () => {
    const { student_id, password } = getValues();

    const { status, data } = await instance.post('/auth/login', {
      student_id,
      password,
    });
    if (status == 200) {
      localStorage.setItem('npp-access', data.access);
      localStorage.setItem('npp-refresh', data.refresh);
      window.alert('환영합니다!');
      window.location.href = '/';
    } else {
      setError(
        'student_id',
        { message: '학번 또는 비밀번호가 잘못되었습니다' },
        { shouldFocus: true }
      );
      setError('password', { message: '학번 또는 비밀번호가 잘못되었습니다' });
    }
  };

  return (
    <form className="pt-10" onSubmit={handleSubmit(login)}>
      <BackButton link="/" />
      <h1>
        학번과 비밀번호를
        <br />
        입력하세요
      </h1>

      <div className="flex flex-col gap-6 my-9">
        <TextField
          label="학번"
          variant="standard"
          fullWidth
          {...register('student_id', { required: '학번을 입력해주세요' })}
          error={Boolean(formState.errors?.student_id) ?? false}
          helperText={String(formState.errors?.student_id?.message ?? '')}
        />
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
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
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

      <div className="text-[#7a7a7a] text-[12px] mb-8 mt-16 text-center">
        비밀번호를 잊으셨나요?{' '}
        <button
          onClick={() => window.alert('준비 중인 기능입니다.')}
          type="button"
          className="ml-1 text-[#f79489] underline"
        >
          비밀번호 재설정
        </button>
      </div>

      <button className="btn_primary">로그인</button>
    </form>
  );
}

export default LoginPage;
