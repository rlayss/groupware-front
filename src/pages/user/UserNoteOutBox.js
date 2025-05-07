import { useEffect, useState } from "react";
import { useUserContext } from "../../provider/UserProvider";

function UserNoteOutBoxPage() {
  const { token } = useUserContext();
  const [notes, setNotes] = useState([]);

  const fetchOutBoxNotes = async function () {
    const response = await fetch("http://192.168.10.173:9090/api/note/outbox", {
      method: "get",
      headers: {
        authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchOutBoxNotes();
  }, []);
  return (
    <div className="user-note">
      <h2>사원 대시보드 &gt; 쪽지 &gt; 발신함</h2>
      <div className="user-note-menu">
        <button>삭제</button>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>
              <input type="checkbox" />
            </th>
            <th style={{ width: "15%" }}>받는사람</th>
            <th>내용</th>
            <th style={{ width: "20%" }}>보낸날짜</th>
            <th style={{ width: "20%" }}>받은날짜</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.receiver.name}</td>
                <td>
                  <span>{item.note.content} </span>
                </td>
                <td>{item.note.sendAt}</td>
                <td>
                  {item.isRead ? (
                    <span>{item.readAt}</span>
                  ) : (
                    <span>읽지않음</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserNoteOutBoxPage;
