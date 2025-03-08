import { ReactNode } from 'react';

interface Props {
  heading: string;
  detailText?: string;
  children: ReactNode;
  disabled?: boolean;
  btnText?: string;
}

function SignupLayout({
  heading,
  detailText,
  children,
  disabled,
  btnText = '다음',
}: Props) {
  return (
    <>
      <div>
        <h1 className="mt-6">{heading}</h1>
        <p className="mt-2 text-grey-500">{detailText}</p>
        <div className="mt-11">{children}</div>
      </div>
      <button className="btn_primary mt-32" disabled={disabled}>
        {btnText}
      </button>
    </>
  );
}

export default SignupLayout;
