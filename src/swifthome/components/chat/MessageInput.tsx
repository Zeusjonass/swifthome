import { Box } from '@mui/material';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (event: any) => void;
}

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage, handleKeyPress }: MessageInputProps) => {
  return (
    <Box className="card-footer">
      <Box className="input-group">
        <Box className="input-group-append">
          <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
        </Box>
        <textarea
          name=""
          className="form-control type_msg"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        ></textarea>
        <Box className="input-group-append">
          <span className="input-group-text send_btn" onClick={handleSendMessage}>
            <i className="fas fa-location-arrow"></i>
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageInput;
