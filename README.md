# Socket.io Chat App

A simple real-time chat application built using **Node.js**, **Socket.io**, and **React.js**. This project demonstrates the use of rooms in Socket.io for group communication and Material-UI components for a polished front-end.

---

## Features

- Real-time communication using WebSockets.
- Room-based messaging (join specific rooms to chat privately).
- Differentiation between sender and receiver messages in the UI.
- Modern and clean design using Material-UI.

---

## Project Structure

```
/server
  |-- index.js       # Backend server code using Socket.io and Express.js
/client
  |-- src
      |-- App.jsx    # React front-end application
      |-- index.js   # Entry point for the React app
```

---

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- A modern web browser

---

## Installation and Usage

### Backend (Server)

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

4. The server will run on `http://localhost:3000`.

---

### Frontend (Client)

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3001` (or the port specified in your React setup).

---

## How to Use

1. Open the application in your browser.
2. Enter a **room name** in the "Room" input field and click **Join Room**.
3. Type a message in the "Message" input field and click **Send**.
4. Open another browser/tab, join the same room, and start chatting in real-time!

---

## Example Commands

- **Join Room**:  
   Click the "Join Room" button after entering a room name.

- **Send Message**:  
   Type your message and click the "Send" button to broadcast it to the room.

---

## Technical Details

### Backend
- Built with **Express.js** and **Socket.io**.
- Handles real-time connections and room-based communication.

### Frontend
- Built with **React.js**.
- Styled using **Material-UI** for clean and modern UI components.

---

## Code Walkthrough

### Backend Highlights
- **`io.on('connection')`**: Listens for incoming socket connections.
- **`socket.join(room)`**: Allows a user to join a specific room.
- **`socket.to(room).emit()`**: Sends messages to other users in the same room.

### Frontend Highlights
- **`useMemo(() => io('http://localhost:3000'))`**: Initializes the Socket.io client.
- **`socket.emit('join-room', room)`**: Sends a request to join a specific room.
- **`socket.on('receiver-message')`**: Listens for new messages from the server.

---

## Known Issues

- Ensure users join the correct room before sending a message.
- Users outside a room will not receive messages sent to the room.

---

## Future Enhancements

- Add user authentication for secure room access.
- Implement persistent message storage (e.g., using a database).
- Add typing indicators and user presence status.

---

## License

This project is licensed under the MIT License. Feel free to use and modify the code as per your requirements.

---

## Acknowledgments

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Material-UI Documentation](https://mui.com/)

---

Enjoy building with Socket.io and React! 🚀

