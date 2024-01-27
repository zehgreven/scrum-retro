import { NextResponse } from "next/server";
import { Server } from "socket.io";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  let res = NextResponse.next();

  if (res?.socket?.server?.io) {
    console.log("Socket is already running.");
  } else {
    console.log("Socket is initializing...");

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
    });
  }

  res.end();
}
