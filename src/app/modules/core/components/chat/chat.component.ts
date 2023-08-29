import { Component, EventEmitter, Input, Output } from "@angular/core";

interface Message {
    text: string;
    incoming: boolean;
    timestamp: Date;
}

@Component({
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.component.css"],
})
export class ChatComponent {
    @Input() friend!: string | null;
    @Output() chatClosed = new EventEmitter<void>();
    newMessageText = "";

    messages: Message[] = [
        { text: "Cześć!", incoming: true, timestamp: new Date() },
        { text: "Cześć! Co słychać?", incoming: false, timestamp: new Date() },
        // Add more messages here
    ];
    sendMessage() {
        if (this.newMessageText.trim() === "") {
            return;
        }

        const newMessage: Message = {
            text: this.newMessageText,
            incoming: false,
            timestamp: new Date(),
        };

        this.messages.push(newMessage);
        this.newMessageText = "";
    }

    closeChat() {
        this.chatClosed.emit();
    }
}
