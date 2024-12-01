import React from 'react'
import { Message } from '~/types/message'
import { Card, CardContent } from "~/components/ui/card"
import { Button } from "~/components/ui/button"

interface ChatInterfaceProps {
  messages: Message[]
  onReadMessage: (id: string) => void
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onReadMessage }) => {
  return (
    <div className="space-y-4 h-96 overflow-y-auto mb-4 p-4 border rounded-lg">
      {messages.map((message) => (
        <Card key={message.id}>
          <CardContent className="p-4">
            <p className="mb-2">{message.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                阅读次数: {message.readCount}/{message.maxReads}
              </span>
              <span>
                剩余时间: {Math.max(0, message.expiresIn - Math.floor((Date.now() - message.timestamp) / 60000))}分钟
              </span>
            </div>
            <Button 
              className="mt-2" 
              variant="outline" 
              size="sm"
              onClick={() => onReadMessage(message.id)}
            >
              标记为已读
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ChatInterface

