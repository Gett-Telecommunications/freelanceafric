import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_ChatMessage } from '@freelanceafric/shared-shared';

@Component({
  selector: 'lib-chat-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  chat = input.required<I_ChatMessage>();
}
