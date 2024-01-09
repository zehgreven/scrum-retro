import React, { useEffect } from "react";

const Card: React.FC<
  CardProps & {
    onRemove: (index: string) => void;
    onChange: (index: string, text: string) => void;
  }
> = ({ id, color, text, onRemove, onChange }) => {
  const [isEditing, setIsEditing] = React.useState(true);
  const [editableText, setEditableText] = React.useState(text);

  // TODO : Remove the logs
  useEffect(() => console.log("editableText", editableText), [editableText]);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(e.target.value);
    onChange(id, e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableText?.trim().length === 0) {
        onRemove(id);
      }
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsEditing(false);
    if (editableText?.trim().length === 0) {
      onRemove(id);
    }
  };

  return (
    <div
      key={id}
      className={`bg-${color}-100 max-h-80 min-h-20 overflow-auto shadow-lg rounded-lg p-4 m-2 flex items-center justify-between transition duration-300 ease-in-out`}
      onClick={handleTextClick}
    >
      {isEditing ? (
        <textarea
          autoFocus
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          value={editableText}
          style={{ height: `${Math.round(editableText.length / 25)}em` }}
          className="text-gray-800 text-justify text-sm font-semibold w-full max-h-60 min-h-20"
        />
      ) : (
        <span className="text-gray-800 text-justify text-sm font-semibold">
          {editableText}
        </span>
      )}
    </div>
  );
};

export default Card;
