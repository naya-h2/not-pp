import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SignupLayout from './layout';
import BackButton from '../../components/BackButton';
import StepOne from './components/stepOne';
import { instance } from '../../axios/instance';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import StepFive from './components/StepFive';
import { MEMBER } from '../../const/member';
import { getSignupErrMsg } from '../../util/getErrText';

type SignupStepType = '이메일' | '인증' | '필수정보' | '학과' | '비밀번호';
const SIGNUP_STEP: SignupStepType[] = [
  '이메일',
  '인증',
  '필수정보',
  '학과',
  '비밀번호',
];

function SignupPage() {
  const [step, setStep] = useState(0);

  const methods = useForm({ mode: 'onBlur' });
  const { email, verify_code, student_id, name, gender, major } =
    methods.watch();
  const [isLoading, setIsLoading] = useState(false);
  const [verify, setVerify] = useState(false);

  const handleNextStep = () => setStep((curStep) => ++curStep);

  const sendEmail = async () => {
    const { email } = methods.getValues();
    await instance.post('/auth/email', {
      email: `${email}@sogang.ac.kr`,
    });
  };

  const verifyEmail = async () => {
    const { email, verify_code } = methods.getValues();

    const { status } = await instance.post('/auth/email/verify', {
      email: `${email}@sogang.ac.kr`,
      key: verify_code,
    });

    if (status === 400) {
      methods.setError('verify_code', {
        message: '인증 번호가 일치하지 않습니다.',
      });
      setIsLoading(false);
      return false;
    }

    setVerify(true);
    return true;
  };

  const postSignup = async () => {
    const { student_id, password, password_check, name, gender, major, email } =
      methods.getValues();
    const { data, status } = await instance.post('/auth/signup', {
      student_id,
      password,
      password2: password_check,
      name,
      gender,
      major: MEMBER.major.findIndex((val) => val === major),
      email,
    });

    if (status === 201) {
      window.alert(`${data.name}님 가입을 환영합니다!`);
      window.location.href = '/login';
    }

    if (status === 400) {
      if (data?.email) {
        window.alert('이미 존재하는 회원입니다.');
        window.location.href = '/';
      } else if (data?.password) {
        methods.setError(
          'password',
          { message: getSignupErrMsg(data.password[0]) },
          { shouldFocus: true }
        );
        methods.setError('password_check', {
          message: getSignupErrMsg(data.password[0]),
        });
      } else if (data?.student_id) {
        methods.setError(
          'student_id',
          { message: getSignupErrMsg(data.student_id[0]) },
          { shouldFocus: true }
        );
        setStep(2);
      }

      setIsLoading(false);
    }
  };

  const signup = async () => {
    setIsLoading(true);
    switch (SIGNUP_STEP[step]) {
      case '이메일':
        await sendEmail();
        break;
      case '인증':
        if (await verifyEmail()) break;
        else return;
      case '비밀번호':
        await postSignup();
        break;
    }

    setIsLoading(false);

    if (step < SIGNUP_STEP.length - 1) handleNextStep();
  };

  const STEP_CONTENT_LIST = {
    이메일: {
      heading: '서강대학교 이메일을 입력해주세요',
      detailText: '서강대학교 학생 인증을 위해 필요합니다',
      children: <StepOne />,
      btnDisabled: !Boolean(email),
      btnText: undefined,
    },
    인증: {
      heading: '인증 코드를 입력해주세요',
      detailText: '인증 코드가 입력한 이메일로 전송됐어요!',
      children: <StepTwo />,
      btnDisabled: !Boolean(verify_code),
      btnText: verify ? '다음' : '인증하기',
    },
    필수정보: {
      heading: '필수 정보를 입력해주세요',
      detailText: '',
      children: <StepThree />,
      btnDisabled: !Boolean(student_id && name && gender),
      btnText: undefined,
    },
    학과: {
      heading: '학과를 선택해주세요',
      detailText: '같은 과 선후배를 찾아드릴게요',
      children: <StepFour />,
      btnDisabled: !Boolean(major),
      btnText: undefined,
    },
    비밀번호: {
      heading: '비밀번호를 설정해주세요',
      detailText: '거의 다 왔어요!',
      children: <StepFive />,
      btnDisabled: false,
      btnText: undefined,
    },
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(signup)}>
        <BackButton
          onClickFunc={
            step === 0 ? undefined : () => setStep((curStep) => --curStep)
          }
          link="/"
        />
        <SignupLayout
          heading={STEP_CONTENT_LIST[SIGNUP_STEP[step]].heading}
          detailText={STEP_CONTENT_LIST[SIGNUP_STEP[step]].detailText}
          disabled={
            STEP_CONTENT_LIST[SIGNUP_STEP[step]].btnDisabled || isLoading
          }
          btnText={STEP_CONTENT_LIST[SIGNUP_STEP[step]].btnText}
        >
          {STEP_CONTENT_LIST[SIGNUP_STEP[step]].children}
        </SignupLayout>
      </form>
    </FormProvider>
  );
}

export default SignupPage;
