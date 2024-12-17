import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");

  // Function to handle room joining
  const handleJoinRoom = () => {
    if (room.trim()) {
      socket.emit("join-room", room);
      console.log(`Joined room: ${room}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room.trim() && message.trim()) {
      socket.emit("message", { room, message });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", message },
      ]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("Connected with ID:", socket.id);
    });

    // Listening for messages from the server
    socket.on("receiver-message", (data) => {
      console.log("New message received:", data);
      setMessages((prevMessages) => [...prevMessages, { sender: "Other", message: data.message }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Welcome to Socket.io Chat
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Socket ID: {socketID}
      </Typography>
      <TextField
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        id="room"
        label="Room"
        variant="outlined"
        style={{ marginBottom: "1rem" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleJoinRoom}
        style={{ marginBottom: "1rem" }}
      >
        Join Room
      </Button>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          label="Message"
          variant="outlined"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Stack spacing={2} style={{ marginTop: "2rem" }}>
        {messages.map((m, i) => (
          <Typography
            key={i}
            variant="body1"
            component="div"
            style={{
              background: m.sender === "You" ? "#d1e7dd" : "#f8d7da",
              padding: "0.5rem",
              borderRadius: "8px",
            }}
          >
            <strong>{m.sender}:</strong> {m.message}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
