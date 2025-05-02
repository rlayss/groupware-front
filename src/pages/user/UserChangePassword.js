import { useState } from "react";
import { useUserContext } from "../../provider/UserProvider";

function UserChangePasswordPage() {
  const { user, token } = useUserContext();
  const [result, setResult] = useState(null);

  const submitHandle = function (evt) {
    evt.preventDefault();
    // oldPassword, newPassword , passwordConfirm 뽑아서
    const oldPassword = evt.target.oldPassword.value;
    const newPassword = evt.target.newPassword.value;
    const passwordConfirm = evt.target.passwordConfirm.value;
    if (newPassword !== passwordConfirm) {
      setResult("비밀번호가 일치하지 않습니다.");
      return;
    }
    // if .. newPassword 랑 passwordConfirm 다르면 에러메세지 나오게 유도하고
    const data = {
      employeeId: user.id,
      oldPassword,
      newPassword,
    };
    fetch("http://192.168.10.173:9090/api/private/change-password", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 400) {
        setResult(
          "비밀번호는 영문 대소문자와 숫자가 반드시 1글자 포함되어야 합니다."
        );
      } else if (response.status === 403) {
        setResult(
          "권한이 없습니다. (기존비밀번호가 일치하지 않거나 비정상적인 요청입니다.)"
        );
      } else if (response.status === 203) {
        setResult("요청이 정상처리되었습니다.");
        evt.target.oldPassword.value = "";
        evt.target.newPassword.value = "";
        evt.target.passwordConfirm.value = "";
      }
    });

    // 같으면 fetch 로 서버측에 요청 보내고
    // 응답 받아서 적절하게 처리
  };

  return (
    <>
      <h2>사원 대시보드 &gt; 설정 &gt; 비밀번호 변경</h2>
      <div>
        <form onSubmit={submitHandle}>
          <p>
            <input
              type="password"
              placeholder="기존 비밀번호"
              name="oldPassword"
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="변경할 비밀번호"
              name="newPassword"
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="비밀번호 재확인"
              name="passwordConfirm"
            />
          </p>
          {result && <p> {result}</p>}
          <p>
            <button>적용하기</button>
          </p>
        </form>
      </div>
    </>
  );
}

export default UserChangePasswordPage;
