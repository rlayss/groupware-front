import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useUserContext } from "../../provider/UserProvider";

function UserBoardViewPage() {
  // 이 페이지가 가변경로를 처리 (스프링으로 생각해봣을떄 @PathVariable)한다면 그 값을 어떻게 확인하냐.
  const { token } = useUserContext();
  const { id } = useParams();
  const [item, setItem] = useState(null);

  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://192.168.10.173:9090/api/board/" + id,
        {
          method: "get",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 404) {
        return;
      }
      const obj = await response.json();
      setItem(obj);
    };
    fetchData();
  }, []);

  return (
    <div className="user-board">
      <h2>사원 대시보드 &gt; 게시글보기</h2>
      <p>
        본 게시글은 사내 구성원이 작성한 의견 및 정보를 공유하는 내용입니다.
        서로의 생각을 존중하며 건강한 소통을 이어가 주세요.
      </p>
      {item ? (
        <div>
          <h3>{item.title}</h3>
          <div>{item.content}</div>
        </div>
      ) : (
        <span>데이터 불러오는중</span>
      )}
    </div>
  );
}

export default UserBoardViewPage;
