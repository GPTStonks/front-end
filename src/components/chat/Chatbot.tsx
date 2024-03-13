'use client'
import '@fontsource-variable/exo-2';
import '@fontsource-variable/fira-code';
import '@fontsource/source-sans-pro';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  TextField,
  Typography
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { Suspense, useEffect, useRef, useState } from 'react';

interface ChatbotProps {
  className?: string;
  style?: React.CSSProperties;
  apiConfig: APIConfig;
  themeConfig: ThemeConfig;
  messageRender?: (message: Message, index: number) => JSX.Element;
}

interface APIConfig {
  apiQueryEndpoint: string;
  queryParams?: Record<string, any>;
}

interface ThemeConfig {
  style?: React.CSSProperties;
  palette?: {
    primary?: { main: string };
    secondary?: { main: string };
    error: { main: string };
    warning: { main: string };
    info: { main: string };
    success: { main: string };
    background: { default: string; paper: string };
    text: { primary: string; secondary: string };
  };
  typography?: { fontFamily?: string };
  components?: {
    ChatBox?: React.CSSProperties;
    LowPartBox?: React.CSSProperties;
    TextField?: { label?: string, fullWidth?: boolean, style?: React.CSSProperties };
    Button?: { style: React.CSSProperties, hoverBackgroundColor: string };
    Disclaimer?: { appears?: boolean, text: string, style: React.CSSProperties };
    Avatar?: { botAvatarUrl?: string; userAvatarUrl?: string, style?: React.CSSProperties };
    MessageBubbleBot?: React.CSSProperties;
    MessageBubbleUser?: React.CSSProperties;
    Divider?: { appears?: boolean; style?: React.CSSProperties };
  };
}

interface Message {
  text: string;
  user: string;
  loading?: boolean;
  graphData?: any;
}

const Chatbot: React.FC<ChatbotProps> = ({
  className,
  apiConfig,
  themeConfig,
  messageRender = () => <div />,
}: ChatbotProps) => {
  const humanUser = 'humanUser';
  const botUser = 'botUser';
  const customTheme = createTheme(themeConfig ? { palette: themeConfig.palette, typography: themeConfig.typography } : {});
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isAnyMessageLoading, setIsAnyMessageLoading] = useState<boolean>(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    setIsAnyMessageLoading(messages.some((message: Message) => message.loading));
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isAnyMessageLoading) {
      sendMessage();
      event.preventDefault();
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = { text: newMessage, user: humanUser };
    const loadingMessage: Message = { loading: true, text: 'Asking the server...', user: botUser };

    setMessages((prevMessages: []) => [...prevMessages, userMessage, loadingMessage]);
    setNewMessage('');

    try {
      const response = await fetch(apiConfig?.apiQueryEndpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...apiConfig?.queryParams, message: newMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const botMessageData = await response.json();

      const botMessage: Message = {
        text: botMessageData.text,
        user: botUser,
      };

      setMessages((prevMessages: [Message]) => {
        const newMessages = [...prevMessages];
        newMessages.pop();
        newMessages.push(botMessage);
        return newMessages;
      });
    } catch (error) {
      const message = (error as Error).message;
      setMessages((prevMessages: []) => {
        const newMessages = prevMessages.slice(0, -1);
        const errorMessage: Message = { text: message, user: botUser };
        return [...newMessages, errorMessage];
      });
    }
  };

  return (
    <div className={`chatbot-default ${className}`} style={{
      ...themeConfig.style,
    }}>
      <ThemeProvider theme={customTheme}>
        <Box className={`chatbot-default ${className}`}
          sx={{
            ...themeConfig.components?.ChatBox,
          }}>
          <List>
            {messages.map((message: Message, index: number) => (
              <ListItem key={index} sx={{ display: 'flex', flexDirection: message.user === botUser ? 'row' : 'row-reverse', marginBottom: '1rem' }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Avatar
                    sx={{
                      marginRight: message.user === botUser ? '1rem' : '0',
                      marginLeft: message.user === humanUser ? '1rem' : '0',
                      ...themeConfig?.components?.Avatar?.style,
                    }}
                    src={message.user === botUser ? themeConfig?.components?.Avatar?.botAvatarUrl : themeConfig?.components?.Avatar?.userAvatarUrl}
                  />
                  {message.user == botUser ?
                    <Box
                      sx={themeConfig?.components?.MessageBubbleBot}
                    >
                      {message.text}
                    </Box>
                    :
                    <Box
                      sx={themeConfig?.components?.MessageBubbleUser}
                    >
                      {message.text}
                    </Box>
                  }
                </Suspense>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        {themeConfig?.components?.Divider?.appears && <Divider sx={themeConfig?.components?.Divider?.style} />}

        <Box sx={themeConfig.components?.LowPartBox}>
          <TextField
            fullWidth={themeConfig?.components?.TextField?.fullWidth || true}
            value={newMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="outlined"
            size="small"
            label={themeConfig?.components?.TextField?.label || 'Ask our chatbot!'}
            sx={{
              ...themeConfig?.components?.TextField?.style,
            }}
          />
          {isAnyMessageLoading ? <CircularProgress sx={{ marginLeft: '1rem' }} /> :
            <Button
              variant="outlined"
              onClick={sendMessage}
              disabled={isAnyMessageLoading}
              sx={{
                marginLeft: '1rem',
                ...themeConfig?.components?.Button?.style,
                '&:hover': {
                  backgroundColor: themeConfig?.components?.Button?.hoverBackgroundColor || '#b8bb26',
                },
              }}
            >
              Send
            </Button>
          }
        </Box>
        {themeConfig?.components?.Disclaimer?.appears && (
          <Typography sx={themeConfig.components.Disclaimer.style}>
            {themeConfig?.components?.Disclaimer?.text || 'This is an open-source chatbot. Have some fun and enjoy! 🚀'}
          </Typography>
        )}

      </ThemeProvider>
    </div >
  );

};

export default Chatbot;
