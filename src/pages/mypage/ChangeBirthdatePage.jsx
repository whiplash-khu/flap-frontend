import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "../../components/SignupLayout";
import "./ChangeBirthdatePage.css";

function ChangeBirthdatePage() {
  const navigate = useNavigate();

  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");

  const handleChangeBirthdate = () => {
    const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!dateRegex.test(birthdate)) {
      setError("YYYY.MM.DD 형식으로 입력해주세요.");
      return;
    }

    setError("");
    console.log("새로운 생년월일:", birthdate);
    alert("생년월일이 변경되었습니다.");

    navigate(-1);
  };

  return (
    <SignupLayout
      title="생년월일 변경"
      buttonText="변경"
      onButtonClick={handleChangeBirthdate}
    >
      <div className="input-group">
        <label>생년월일</label>
        <input
          type="text"
          placeholder="YYYY.MM.DD"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </SignupLayout>
  );
}

export default ChangeBirthdatePage;
