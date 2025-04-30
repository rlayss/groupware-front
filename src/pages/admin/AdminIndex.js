import "./Admin.css";
import AdminNavigator from "../../components/admin/AdminNavigator";

function AdminIndexPage() {
  return (
    <>
      <div className="admin-container">
        <AdminNavigator />

        <div className="admin-main">
          <h1>관리자 대시보드</h1>
          <p> /* 여기를 관리자 메인뷰로 사용할 예정임 */</p>
        </div>
      </div>
    </>
  );
}

export default AdminIndexPage;
/*
    ctrl + shift + l : Select all occurrences of current selection
*/
