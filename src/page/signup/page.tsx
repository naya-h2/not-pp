import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { MEMBER } from '../../const/member';

const INPUT_LIST: {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder: string;
  helperText: string;
  option?: RegisterOptions;
}[] = [
  {
    id: 'student_id',
    type: 'text',
    label: '학번',
    required: true,
    placeholder: '20252025',
    helperText: '',
    option: {
      maxLength: 8,
      minLength: 1,
    },
  },
  {
    id: 'password',
    type: 'text',
    label: '비밀번호',
    required: true,
    placeholder: '',
    helperText: '8자 이상 입력',
    option: {
      maxLength: 128,
      minLength: 8,
    },
  },
  {
    id: 'password_re',
    type: 'text',
    label: '비밀번호 확인',
    required: true,
    placeholder: '',
    helperText: '',
  },
  {
    id: 'name',
    type: 'text',
    label: '이름',
    required: true,
    placeholder: '',
    helperText: '',
    option: {
      maxLength: 32,
      minLength: 1,
    },
  },
  {
    id: 'email',
    type: 'text',
    label: '이메일',
    required: true,
    placeholder: 'npp@example.com',
    helperText: '',
  },
];

function SignupPage() {
  const { register, handleSubmit } = useForm({});
  const [major, setMajor] = useState('');

  const handleMajorChange = (event: SelectChangeEvent) => {
    setMajor(event.target.value as string);
  };

  const handleSignupSubmit = () => {
    console.log('회원가입');
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(handleSignupSubmit)}
    >
      <h1 className="text-2xl text-center font-bold">회원가입</h1>

      <div className="flex flex-col gap-5">
        {INPUT_LIST.map(
          ({ id, type, label, required, placeholder, helperText }) => (
            <TextField
              key={id}
              id={id}
              type={type}
              label={label}
              variant="outlined"
              required={required}
              fullWidth
              helperText={helperText}
              placeholder={placeholder}
              {...register(id, { required })}
            />
          )
        )}

        <FormControl required>
          <FormLabel id="gender">성별</FormLabel>
          <RadioGroup row aria-labelledby="gender" name="gender_group">
            <FormControlLabel value="male" control={<Radio />} label="남" />
            <FormControlLabel value="female" control={<Radio />} label="여" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel id="major_label">학과</InputLabel>
          <Select
            labelId="major_label"
            id="major"
            value={major}
            label="학과"
            onChange={handleMajorChange}
          >
            {MEMBER.major.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Button size="large" variant="contained" fullWidth>
        가입하기
      </Button>
    </form>
  );
}

export default SignupPage;
