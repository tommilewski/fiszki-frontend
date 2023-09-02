import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { ChatService } from "../../services/chat.service";
import {
    ChatResponse,
    MessageRequest,
    MessageResponse,
} from "../../models/chat.model";

@Component({
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, AfterViewInit {
    @Input() friend!: string;
    @Input() loggedUsername!: string;
    @Output() chatClosed = new EventEmitter<void>();
    newMessageText = "";
    chat!: ChatResponse;
    messageList: MessageResponse[] = [];

    @ViewChild("messageContainer") messageContainer!: ElementRef;
    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        setInterval(() => {
            this.chatService
                .getByFriends(this.loggedUsername, this.friend)
                .subscribe({
                    next: (value) => {
                        this.chat = value;
                        this.messageList = value.messages;
                    },
                });
        }, 1000);
    }

    ngAfterViewInit(): void {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const container = this.messageContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
    }

    sendMessage() {
        const messageRequest: MessageRequest = {
            sender: this.loggedUsername,
            message: this.newMessageText,
        };
        this.chatService.sendMessage(messageRequest, this.chat.id).subscribe({
            next: () =>
                this.chatService.getAllMessagesInChat(this.chat.id).subscribe({
                    next: (value) => (this.messageList = value),
                }),
        });
        this.newMessageText = "";
        this.scrollToBottom();
    }

    closeChat() {
        this.chatClosed.emit();
    }
}
