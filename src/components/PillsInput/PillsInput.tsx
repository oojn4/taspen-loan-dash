import { Badge, Box, CloseButton, TextInput } from '@mantine/core';
import { useState } from 'react';

const PillInput = ({ tags, setTags }: { tags: string[], setTags: (tags: string[]) => void }) => {
    
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag:string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInputValue(''); // Clear input after adding tag
  };

  const removeTag = (tagToRemove:string) => {
    setTags(tags.filter((tag:string) => tag !== tagToRemove));
  };

  return (
    <Box>
      <TextInput
      label="Tags"
        placeholder="Tambahkan tag"
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            addTag(inputValue);
          }
        }}
      />
      <Box mt="xs">
        {tags.map((tag:string) => (
          <Badge
            key={tag}
            rightSection={<CloseButton onClick={() => removeTag(tag)} size="xs" />}
            style={{ marginRight: 5, marginBottom: 5 }}
          >
            {tag}
          </Badge>
        ))}
      </Box>
    </Box>
  );
};

export default PillInput;
