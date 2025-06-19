import { Box, Grid, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';
import PropertyCard from '../PropertyCard';
import Typography from '@mui/material/Typography';
import littleRobotAnimation from '../../media/little-robot.json'
import { Player } from '@lottiefiles/react-lottie-player';

interface MessageListProps {
  messages: any[];
  loading: boolean;
}

const MessageList = ({ messages, loading }: MessageListProps) => {
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      className="card-body msg_card_body"
      ref={scrollableContainerRef}
      sx={{
        overflowY: 'auto',
        height: '100%',
        padding: 2,
        scrollBehavior: 'smooth',
      }}
    >
      {messages.map((msg, index) => (
        Array.isArray(msg.properties) ? (
          <Grid
            container
            spacing={2}
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '10px',
              padding: '5px',
              marginBottom: '10px',
            }}
          >
            {msg.properties.map((property: any, propIndex: number) => (
              <Grid key={propIndex}
                size={{xs:12, sm:12, md:6, lg:6, xl:4}}
              >
                <PropertyCard
                  title={property.title}
                  price={property.price}
                  tags={property.tags}
                  bathrooms={property.bathrooms}
                  bedrooms={property.bedrooms}
                  image={property.image}
                  link={property.link}
                  reason={property.reason}
                  rate={property.rate}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            key={index}
            className={`d-flex ${
              msg.sender === 'self' ? 'justify-content-end' : 'justify-content-start'
            } mb-5`}
            sx={{display: "flex", justifyContent: `${msg.sender === 'self' ? 'flex-end' : 'flex-start'}`, mb: 5}} 
          >
            {msg.sender === 'other' && (
              <Box>
             <Player 
             autoplay
             loop
             src={littleRobotAnimation} 
             style={{width:"5rem", 
              transform:"scaleX(-1)", 
              margin:"0",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"}}
              className='lottieChat'
             />
                
              </Box>
            )}
            <Box className={`msg_cotainer${msg.sender === 'self' ? '_send' : ''}`}>
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    <img {...props} style={{ maxWidth: '160px', maxHeight: '160px' }} />
                  ),
                }}
              >
                {msg.text}
              </ReactMarkdown>
              <Typography component="span" className={`msg_time${msg.sender === 'self' ? '_send' : ''}`}>
                {msg.time}
              </Typography>
            </Box>
          </Box>
        )
      ))}
      <div ref={messagesEndRef} />
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default MessageList;
