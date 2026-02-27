import { useState } from "react"; 
import { Axios } from "../../Api/axios";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await Axios.post("chatbot", { message });

    setChat([
      ...chat,
      { type: "user", text: message },
      { type: "bot", text: res.data.reply },
    ]);

    setMessage("");
  };

  return (
    <div className="p-5"> 
       <h3>تعتبر هذة الصفحة تجربة لدردشة بسيطة مثل ان  يسأل الموظف كم المتبقي من إجازتي السنوية او كم الراتب الحالي</h3>
      <div>
        {chat.map((msg, i) => (
          <div key={i}>
            <strong>{msg.type === "user" ? "أنت:" : "البوت:"}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="اكتب سؤالك..."
      />
      <button onClick={sendMessage}>إرسال</button>
    </div>
  );
}
