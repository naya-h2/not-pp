import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SignupLayout from './layout';
import BackButton from '../../components/BackButton';
import StepOne from './components/stepOne';
import { instance } from '../../axios/instance';
import StepTwo from './components/StepTwo';

type SignupStepType =
  | '이메일'
  | '인증'
  | '필수정보'
  | '학과'
  | '비밀번호'
  | '완료';
const SIGNUP_STEP: SignupStepType[] = [
  '이메일',
  '인증',
  '필수정보',
  '학과',
  '비밀번호',
  '완료',
];

function SignupPage() {
  const [step, setStep] = useState(0);

  const methods = useForm({ mode: 'onBlur' });
  const { email, verify_code } = methods.watch();
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

  const signup = async () => {
    setIsLoading(true);
    switch (SIGNUP_STEP[step]) {
      case '이메일':
        await sendEmail();
        break;
      case '인증':
        if (await verifyEmail()) break;
        else return;
    }
    setIsLoading(false);

    if (step < SIGNUP_STEP.length) handleNextStep();
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
      children: <StepOne />,
      btnDisabled: !Boolean(email),
      btnText: undefined,
    },
    학과: {
      heading: '학과를 선택해주세요',
      detailText: '같은 과 선후배를 찾아드릴게요',
      children: <StepOne />,
      btnDisabled: !Boolean(email),
      btnText: undefined,
    },
    비밀번호: {
      heading: '비밀번호를 설정해주세요',
      detailText: '거의 다 왔어요!',
      children: <StepOne />,
      btnDisabled: !Boolean(email),
      btnText: undefined,
    },
    완료: {
      heading: '가입을 축하드립니다!',
      detailText: '',
      children: <StepOne />,
      btnDisabled: !Boolean(email),
      btnText: '로그인하러가기',
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
