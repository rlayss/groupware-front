import { Link } from "react-router";
import { useUserContext } from "../../provider/UserProvider";
import "./User.css";
function UserWorkspacePage() {
  const { user } = useUserContext();
  return (
    <div className="user-workspace">
      <div className="user-workspace-header">
        <h2>GROUPWARE</h2>
        <div className="info">
          {user && (
            <>
              <span>{user.id}</span>/<span>{user.name}</span>/
              <span>
                {user.department.name} {user.position}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="user-workspace-main">
        <div className="user-workspace-side"></div>
        <div className="user-workspace-content">
          <h2>사원 대시보드</h2>

          <h3>알림</h3>
          <ul>
            <li>
              <Link to="/user/workspace/setting/password">
                (알림) 비밀번호변경이 필요합니다.
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserWorkspacePage;
