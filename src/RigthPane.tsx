import React, { Component } from "react";
import { ConversationDto } from "./chat.d.ts";
import { proxy } from "./Proxy.ts";
import { TextInputAndButton } from "./TextInput.tsx";
import { MessageCard } from "./MessageCard.tsx";

export class RightPane extends Component<{ conversation?: ConversationDto, onBack: () => void }>
{
    componentDidMount()
    {
        proxy.addEventListener( "message", ( cid, m ) =>
        {
            if ( cid === this.props.conversation?.channelId )
            this.forceUpdate();
        }, this );
    }

    componentWillUnmount()
    {
        proxy.removeAllEventListener(this);
    }

    onSend(text: string)
    {
        proxy.sendPacket({
            type: "message",
            channelId: this.props.conversation!.channelId, 
            referenceTo: 0,
            contentType: 0,
            content: "N: " + text
        })
    }
    render()
    {
        return (
            <div className="right-pane column">
                { this.props.conversation &&
                <>
                    <div className="conversation-header">
                        <button 
                            type="button" 
                            className="only-narrow"
                            onClick={ () => this.props.onBack() }>
                                Back
                        </button>
                        <p>{ this.props.conversation?.name }</p>
                    </div>
                    <div className="messages">
                        { this.props.conversation?.lastMessages.map( x =>
                        <MessageCard key={ x.id } message={ x }
                        own={ x.senderId === proxy.inbox?.user.id } /> ) }
                    </div>
                    <div className="send-message row">
                        <TextInputAndButton type="text" placeholder="Type something awesome here..."
                        buttonContent="Send" onClick={ x => this.onSend( x ) } />
                    </div>
                </>
                }
            </div>
        );
    }
}