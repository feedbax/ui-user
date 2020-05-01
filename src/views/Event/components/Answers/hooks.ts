import store from 'store';
import api from 'lib/api';

export function useHasLiked(answerLikes: string[]): boolean {
  const { api: apiStore } = store.getState();
  const { likes } = apiStore;

  for (let i = 0; i < answerLikes.length; i += 1) {
    const answerLike = answerLikes[i];
    const like = likes[answerLike];

    if (like && like.author === api.uuid) {
      return true;
    }
  }

  return false;
}

export function useLiked(answerLikes: string[]): [number, boolean] {
  const { api: apiStore } = store.getState();
  const { likes } = apiStore;

  for (let i = 0; i < answerLikes.length; i += 1) {
    const answerLike = answerLikes[i];
    const like = likes[answerLike];

    if (like && like.author === api.uuid) {
      return [answerLikes.length, true];
    }
  }

  return [answerLikes.length, false];
}
