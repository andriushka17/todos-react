import React, { useState } from 'react';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';

import ActionButton from '../../components/Button/Button';
import TodoInput from '../../components/Input/Input';
import CheckIcon from '../../icons/CheckIcon';
import TrashIcon from '../../icons/TrashIcon';

interface LiProps {
  completed: boolean;
}

const ListItem = styled.li<LiProps>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem;
  padding: 0rem 0.5rem;
  height: auto;
  width: 25rem;
  font-size: 18px;
  border-radius: 25px;
  border-color: 2e7d32;
  border-width: 1px;
  background: white;
  color: black;
  word-break: break-all;
  transition: all 0.5s ease;
  ${(props) =>
    props.completed
      ? 'text-decoration: line-through;  opacity: 0.3; color: green;'
      : 'text-decoration: none;  opacity: none; color: black;'}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 255px;
  color: rgb(0, 0, 0);
  border: none;
  user-select: none;
  cursor: pointer;
`;

const Text = styled.div`
  width: 100%;
`;

const StyledSecondaryInput = styled(TodoInput)`
  height: 50px;
  font-size: 18px;
`;

const StyledActionButton = styled(ActionButton)`
  min-width: 80px;
`;

const StyledTrashActionButton = styled(ActionButton)`
  position: absolute;
  min-width: 80px;
  height: 100%;
  right: 16px;
`;

interface TodoListItemProps {
  id: string;
  text: string;
  completed: boolean;
}

const TodoListItem = ({ id, text, completed }: TodoListItemProps) => {
  const dispatch = useDispatch();

  const [isActiveInput, setIsActiveInput] = useState(false);

  const hideInput = () => setIsActiveInput(false);
  const showInput = () => setIsActiveInput(true);

  const handleCheckTodo = () => {
    dispatch({ type: 'CHECK_TODO', payload: id });
  };

  const handleDeleteTodo = () => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleUpdateTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, value: e.target.value } });
  };

  return (
    <ListItem key={id} completed={completed}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignContent: 'center',
          width: 400,
          minHeight: 80,
          borderRadius: '16px',
        }}
      >
        <StyledActionButton color="success" onClick={handleCheckTodo}>
          <CheckIcon />
        </StyledActionButton>
        <Wrapper>
          {!isActiveInput ? (
            <Text onDoubleClick={showInput}>{text}</Text>
          ) : (
            <StyledSecondaryInput
              autoFocus
              text={text}
              defaultValue={text}
              onChange={handleUpdateTodo}
              onBlur={hideInput}
            />
          )}
        </Wrapper>
        <StyledTrashActionButton color="error" onClick={handleDeleteTodo}>
          <TrashIcon />
        </StyledTrashActionButton>
      </Paper>
    </ListItem>
  );
};

export default TodoListItem;
