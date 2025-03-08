function MainPage() {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/npp_logo.svg"
        alt="npp logo"
        width={136}
        height={136}
        className="mt-[124px]"
      />

      <h1 className="font-bold mt-6 mb-2">두근두근 선배 찾기</h1>
      <p className="text-center text-[12px]">
        당신의 선배를 찾아서
        <br />
        지금 내 학과를 선택하고 시작해보세요!
      </p>

      <button
        onClick={() => (window.location.href = '/signup')}
        className="btn_primary mt-28 mb-6"
      >
        시작하기
      </button>

      <div className="text-[#7a7a7a] text-[12px]">
        이미 계정이 있나요?
        <button
          onClick={() => (window.location.href = '/login')}
          className="ml-1 text-[#f79489]"
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default MainPage;
