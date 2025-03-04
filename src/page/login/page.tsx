import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';

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

  return (
    <div>
      <h1>
        학번과 비밀번호를
        <br />
        입력하세요
      </h1>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
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
          }
        />
      </FormControl>

      <div className="text-[#7a7a7a] text-[12px] my-8 text-center">
        비밀번호를 잊으셨나요?{' '}
        <button className="ml-1 text-[#f79489] underline">
          비밀번호 재설정
        </button>
      </div>

      <button className="btn_primary">로그인</button>
    </div>
  );
}

export default LoginPage;
