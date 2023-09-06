import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
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
import { interval, Subscription, switchMap } from "rxjs";

@Component({
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() friend!: string;
    @Input() loggedUsername!: string;
    @Output() chatClosed = new EventEmitter<void>();
    newMessageText = "";
    chat!: ChatResponse;
    messageList: MessageResponse[] = [];
    sub!: Subscription;

    @ViewChild("messageContainer") messageContainer!: ElementRef;
    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        this.sub = interval(1000)
            .pipe(
                switchMap(() =>
                    this.chatService.getByFriends(
                        this.loggedUsername,
                        this.friend,
                    ),
                ),
            )
            .subscribe({
                next: (value) => {
                    this.chat = value;
                    this.messageList = value.messages;
                },
            });
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.scrollToBottom(), 50);
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
        setTimeout(() => this.scrollToBottom(), 50);
    }

    closeChat() {
        this.chatClosed.emit();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
