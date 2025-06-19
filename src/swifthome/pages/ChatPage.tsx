"use client";
import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useMutation } from "react-query";
import MessageList from '@/src/swifthome/components/chat/MessageList';
import MessageInput from '@/src/swifthome/components/chat/MessageInput';
import { postAssistantNewMessage, PostAssistantNewMessageRequest, PostAssistantNewMessageResponse } from '@/src/swifthome/api/api-gateway/assistant';

interface ChatPageProps {
  sessionId: string;
  clientId: string;
  userId: string;
}

const ChatPage = ({ sessionId, clientId, userId }: ChatPageProps) => {
  const [messages, setMessages] = useState<any[]>([
    { text: 'Hola, soy Swifty. Tu asistente personal en la búsqueda de la propiedad perfecta', sender: 'other', time: '08:40 am, Hoy' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { mutate: sendMessageToAssistant } = useMutation(
    (messageData: PostAssistantNewMessageRequest) => postAssistantNewMessage(messageData),
    {
      onSuccess: (data: PostAssistantNewMessageResponse) => {
        setLoading(false);
        const newMessages = [
          { text: data.initialText, sender: 'other', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Hoy' },
          { properties: data.properties },
          { text: data.finalText, sender: 'other', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Hoy' }
        ];
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      },
      onError: (error) => {
        setLoading(false);
        console.error('Error al enviar el mensaje al asistente:', error);
      }
    }
  );

  const handleSendMessage = async () => {
    if (!sessionId || !clientId || !userId || newMessage.trim().length < 10) return;
    
    const newMsg = { 
      text: newMessage, 
      sender: 'self', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Hoy' 
    };
    setMessages([...messages, newMsg]);
    setLoading(true);
    
    
    sendMessageToAssistant({
      sessionId: sessionId,
      message: newMessage,
      clientId: clientId,
      userId: userId
    });
    setNewMessage('');
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
  <Grid container justifyContent="center" sx={{ height: '100%', minHeight: '80vh', py: 4 }} className='chat-container'>
    <Grid size={{xs:11, sm:10, md:9, lg:8}}>
      <Box
        sx={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          boxShadow: 3,
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}
      >
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <MessageList messages={messages} loading={loading} />
        </Box>
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      </Box>
    </Grid>
  </Grid>
  );
};

export default ChatPage;
