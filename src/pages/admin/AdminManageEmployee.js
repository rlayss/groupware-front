import { useEffect, useState } from "react";
import AdminNavigator from "../../components/admin/AdminNavigator";

import "./Admin.css";

function AdminManageEmployeePage() {
  const [employee, setEmployee] = useState([]);
  useEffect(function () {
    fetch("http://192.168.10.173:9090/api/employee", {
      method: "get",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setEmployee(data);
      });
  }, []);

  return (
    <>
      <div className="admin-container">
        <AdminNavigator />
        <div className="admin-main">
          <h1>관리자 대시보드 &gt; 전체사원관리</h1>
          <div className="admin-employee-manage">
            <table>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>입사일</th>
                  <th>부서</th>
                  <th>직책</th>
                  <th>활성화</th>
                </tr>
              </thead>
              <tbody>
                {employee.map(function (one) {
                  return (
                    <tr key={one.id}>
                      <td>{one.id}</td>
                      <td>{one.name}</td>
                      <td>{one.email}</td>
                      <td>{one.hireDate}</td>
                      <td>{one.department.name}</td>
                      <td>{one.position}</td>
                      <td>{one.active}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminManageEmployeePage;
