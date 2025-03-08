import { TextField } from '@mui/material';
import BackButton from '../../../components/BackButton';
import DefaultProfile from '../../../components/DefaultProfile';
import { useGetProfile } from '../../../hooks/useGetProfile';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import kakaoIcon from '../../../assets/sns_kakao.svg';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { authInstance } from '../../../axios/instance';
import { getEditErrMsg } from '../../../util/getErrText';
import Loading from '../../../components/Loading';

function MyProfileEditPage() {
  const profile = useGetProfile();
  const { register, setValue, watch, getValues, setError, formState } =
    useForm();
  const { insta_id, kakao_id, message } = watch();
  const editDisabled =
    profile?.insta_id === insta_id &&
    profile?.kakao_id === kakao_id &&
    profile?.message === message;

  useEffect(() => {
    if (profile) {
      setValue('insta_id', profile.insta_id);
      setValue('kakao_id', profile.kakao_id);
      setValue('message', profile.message);
    }
  }, [profile]);

  const editProfile = async () => {
    const { insta_id, kakao_id, message } = getValues();
    const { data, status } = await authInstance.put('/student/my-profile', {
      insta_id,
      kakao_id,
      message,
    });
    if (status === 200) {
      window.alert('수정이 완료되었습니다.');
      window.location.href = '/my-profile';
    } else if (status === 400) {
      (data.error.message as string[]).map((msg) => {
        const res = getEditErrMsg(msg);
        if (res)
          setError(
            res.inputType,
            { message: res.errMsg },
            { shouldFocus: true }
          );
      });
    }
  };

  return (
    <>
      <title>내 프로필 수정 | 두근두근 선배 찾기</title>
      <meta name="description" content="내 프로필 수정 페이지입니다." />

      <BackButton link="/my-profile" />
      {profile ? (
        <div className="pb-24">
          <div className="bg-coral-bg rounded-xl px-4 pt-0.5 pb-6 my-5">
            <DefaultProfile
              name={profile.name}
              gender={profile.gender}
              major={profile.major}
              student_id={profile.student_id}
            />
            <div className="flex gap-2 items-center mt-2">
              <EmailIcon />
              {profile.email}
            </div>
            <p className="text-12 text-coral-secondary mt-3">
              * 이 정보는 변경이 불가능합니다.
              <br />
              관리자에게 문의해 주세요.
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4 mb-6">
            <div className="flex gap-2 items-end">
              <InstagramIcon fontSize="large" />
              <TextField
                variant="standard"
                fullWidth
                label="인스타 ID"
                {...register('insta_id')}
              />
            </div>
            <div className="flex gap-2 items-end">
              <img
                src={kakaoIcon}
                alt="카카오톡 아이콘"
                className="w-[35px] h-[35px]"
              />
              <TextField
                variant="standard"
                fullWidth
                label="카카오 ID"
                {...register('kakao_id')}
              />
            </div>
          </div>

          <TextField
            label="메세지"
            placeholder="최대 200자까지 가능해요"
            fullWidth
            multiline
            rows={5}
            defaultValue={profile.message}
            variant="standard"
            {...register('message')}
            error={Boolean(formState.errors?.message) ?? false}
            helperText={String(formState.errors?.message?.message ?? '')}
          />

          <button
            disabled={editDisabled}
            onClick={editProfile}
            className="absolute left-5 bottom-11 btn_primary !w-[calc(100vw-40px)] max-w-[440px] text-coral-main rounded-3xl
      "
          >
            수정하기
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default MyProfileEditPage;
