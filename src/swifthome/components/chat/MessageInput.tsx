import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { GoPaperclip, GoPaperAirplane } from 'react-icons/go';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage, handleKeyPress }: MessageInputProps) => {
  return (
  <Box
    component="form"
    onSubmit={(e) => {
      e.preventDefault();
      handleSendMessage();
    }}
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: 2,
      borderTop: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'background.default',
    }}
  >
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Escribe un mensaje..."
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyPress={handleKeyPress}
      autoComplete="off"
      InputProps={{
        sx: {
          borderRadius: '999px',
          backgroundColor: 'action.hover',
          pl: 1,
        },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton edge="start">
              <GoPaperclip />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <IconButton
      type="submit"
      color="primary"
      disabled={!newMessage.trim()}
      sx={{
        ml: 2,
        bgcolor: 'primary.main',
        color: 'white',
        '&:hover': {
          bgcolor: 'primary.dark',
        },
        borderRadius: '12px',
        transition: '0.3s',
      }}
    >
      <GoPaperAirplane />
    </IconButton>
  </Box>
  );
};

export default MessageInput;
