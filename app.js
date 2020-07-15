let idCounter = 0;

/**
 * @param {SocketIO.Server} io
 */
function initSocketApp(io) {
  io.on("connection", (socket) => {
    const userId = idCounter++;
    console.log(`User connected, id: ${userId}`);

    // emit `user-connected` event to all open connections except this
    socket.broadcast.emit("user-connected", { userId });

    socket.on("disconnect", () => {
      console.log(`User disconnected, id: ${userId}`);
      socket.broadcast.emit("user-disconnected", { userId });
    });

    socket.on("message", (event) => {
      console.log(event);
      socket.broadcast.emit("message", event);
    });
  });
}

module.exports = { initSocketApp };
