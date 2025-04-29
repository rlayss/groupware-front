import { useEffect, useState } from "react";
import AdminNavigator from "../../components/admin/AdminNavigator";
import "./Admin.css";

function AdminAddEmployeePage() {
  const [department, setDepartment] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch("http://192.168.10.173:9090/api/department", { method: "get" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDepartment(data);
      });
  }, []);

  const submitHandle = (evt) => {
    evt.preventDefault();
    const data = {
      name: evt.target.name.value,
      email: evt.target.email.value,
      hireDate: evt.target.hireDate.value,
      departmentId: evt.target.departmentId.value,
      position: evt.target.position.value,
    };

    const str = JSON.stringify(data);
    console.log(str, typeof str);

    fetch("http://192.168.10.173:9090/api/employee", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response.status);
      evt.target.name.value = "";
      if (response.status === 201) {
        setMessage("신규사원이 정상 등록되었습니다.");
      } else {
        setMessage("신규사원 등록 과정 중 문제가 발생하였습니다.");
      }
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    });
  };

  return (
    <>
      <div className="admin-container">
        <AdminNavigator />

        <div className="admin-main">
          <h1>관리자 대시보드 &gt; 신규 사원 등록</h1>
          <p>
            등록된 사원 정보는 사내 시스템 전반에 반영되므로, 정확히
            입력해주세요.
          </p>
          <form className="admin-employee-add-form" onSubmit={submitHandle}>
            <p>
              <input type="text" name="name" placeholder="사원 이름" />
            </p>
            <p>
              <input type="text" name="email" placeholder="사원 이메일" />
            </p>
            <p>
              <input type="date" name="hireDate" placeholder="사원 입사일" />
            </p>
            <p>
              <select name="departmentId">
                <option value="0">사원 부서를 선택하세요</option>
                {department.map((one) => {
                  return (
                    <option key={one.id} value={one.id}>
                      {one.name}
                    </option>
                  );
                })}
              </select>
            </p>
            <p>
              <input type="text" name="position" placeholder="사원 직책" />
            </p>
            <p>
              <button type="submit">사원 등록</button>
            </p>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default AdminAddEmployeePage;
