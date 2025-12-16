import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean), // Support cả dev và prod
    credentials: true,
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updateOrder')
  handleUpdateOrder(client: any, payload: any): void {
    // Broadcast order update to all clients except sender
    client.broadcast.emit('orderUpdated', payload);
  }

  // Method để emit từ service khác
  emitNotesUpdated(): void {
    this.server.emit('notesUpdated');
  }

  emitOrderUpdated(newNotes: any[]): void {
    this.server.emit('orderUpdated', newNotes);
  }
}
