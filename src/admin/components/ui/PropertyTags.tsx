"use client"
import { useState } from "react";
import { DialogContent, Typography, Chip, Popover, TextField, Button } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { StyledButton } from "./StyledButton";

export const PropertyTags = ({ tags, setTags }: { tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newTag, setNewTag] = useState("");

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      handleClose();
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
  }

  return (
    <DialogContent
      sx={{
        display: "flex",
        alignItems: "center",
        overflowY: "hidden",
        overflowX: "auto",
      }}
    >
      <Typography>Etiquetas: </Typography>
      {tags.length > 0 &&
        tags.map((tag, index) => (
          <Chip key={`${tag}-${index}`} label={tag} sx={{ backgroundColor: "tertiary.main", mx: "2px" }} onDelete={() => handleDeleteTag(tag)}/>
        ))}
      
      <StyledButton
        sx={{padding: '0px', height: '30px', width: '52px', ml: '10px', border: 'none'}}
        onClick={handleOpen}
      >
        <AddOutlined />
      </StyledButton>
      
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <div style={{ padding: "10px", display: "flex", gap: "5px" }}>
          <TextField size="small" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Nueva etiqueta" />
          <Button variant="contained" onClick={handleAddTag}>Agregar</Button>
        </div>
      </Popover>
    </DialogContent>
  );
};
