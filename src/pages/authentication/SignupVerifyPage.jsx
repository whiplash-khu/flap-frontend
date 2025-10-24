import { useLocation } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import "./SignupVerifyPage.css";
import { api } from "../../lib/api";

function SignupVerifyPage() {
  const location = useLocation();
  const email = location.state?.email || "이메일 정보 없음";

  const handleResend = async() => {
    await api.post('/auth/verification', {
      email
    })
    .catch(alert);

    alert("인증번호를 다시 전송했습니다.");
  };

  return (
    <SignupLayout
      title="회원가입"
      buttonText="인증번호 재요청"
      onButtonClick={handleResend}
    >
      <h3 className="main-heading">
        인증 메일을 보냈어요.
      </h3>
      <h4>
        찾지 못했다면 스팸 메일함을 확인해주세요.
      </h4>
    </SignupLayout>
  );
}

export default SignupVerifyPage;
