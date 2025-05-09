function UserChatPage() {
  const keydownHandle = function (evt) {
    if (!evt.shiftKey && evt.key === "Enter") {
      evt.preventDefault();
      const message = evt.target.value;
      /*
        console.log("fetch !!! => " + message);
  
        */
      evt.target.value = "";
    }
  };

  return (
    <div>
      <h2>사원 대시보드 &gt; 부서 채팅방</h2>
      <div className="chat-container">
        <div></div>
        <div>
          <textarea onKeyDown={keydownHandle} className="message"></textarea>
        </div>
      </div>
    </div>
  );
}

export default UserChatPage;
