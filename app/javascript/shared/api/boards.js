import { get, post, patch, del } from '../../shared/api_helper';

export function createBoard(boardInfo) {
  return post('/boards', { board: boardInfo });
}

export function updateBoard(boardId, boardInfo) {
  return patch(`/boards/${boardId}`, boardInfo);
}

export function deleteBoard(boardId) {
  return del(`/boards/${boardId}`);
}

export function retrieveBoards() {
  return get('/boards');
}
