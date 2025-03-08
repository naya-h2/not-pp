export const getSignupErrMsg = (msg: string) => {
  switch (msg) {
    case "Password fields didn't match":
      return '비밀번호가 일치하지 않습니다.';
    case 'Invalid password format':
      return '비밀번호는 영어, 숫자로 8~20자입니다.';

    case 'Invalid Student ID format':
    case 'Invalid Student ID range':
      return '유효하지 않은 학번입니다.';
  }
};

export const getEditErrMsg = (msg: string) => {
  switch (msg) {
    case 'Ensure this field has no more than 500 characters.':
      return {
        inputType: 'message',
        errMsg: '메세지는 최대 200자까지 입력 가능합니다.',
      };
  }
};
