import { CircularProgress, Switch } from '@mui/material';
import BackButton from '../../../components/BackButton';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGetProfile } from '../../../hooks/useGetProfile';
import { authInstance } from '../../../axios/instance';

function ReleasePage() {
  const [checked, setChecked] = useState(true);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const profile = useGetProfile();
  const putProfileDisplay = async () => {
    const { status } = await authInstance.put('/student/my-profile', {
      display: checked,
    });
    if (status === 200) {
      window.alert('상태 변경이 완료되었습니다');
      window.location.href = '/my-profile';
    }
  };
  useEffect(() => {
    if (profile && profile.display !== checked) putProfileDisplay();
  }, [checked]);

  useEffect(() => {
    if (profile) setChecked(profile.display);
  }, [profile]);

  return (
    <>
      <title>내 프로필 공개 | 두근두근 선배 찾기</title>
      <meta
        name="description"
        content="내 프로필 공개 여부를 설정하는 페이지입니다."
      />

      <BackButton link="/" />
      <h1 className="my-5">프로필 공개 여부를 설정하세요</h1>
      {profile ? (
        <Switch checked={checked} onChange={handleChange} />
      ) : (
        <CircularProgress size={30} />
      )}
    </>
  );
}

export default ReleasePage;
