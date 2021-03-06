import { State } from './state';
import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPosts from './reducer';
import { Post } from 'shared-models/posts/post.model';
import { AdminFeatureNames } from 'shared-models/ngrx-store/feature-names';

const getIsLoading = (state: State): boolean => state.isLoading;
const getIsSaving = (state: State): boolean => state.isSaving;
const getIsDeleting = (state: State): boolean => state.isDeleting;
const getIsTogglingPublished = (state: State): boolean => state.isTogglingPublished;
const getIsTogglingFeatured = (state: State): boolean => state.isTogglingFeatured;
const getLoadError = (state: State): any => state.loadError;
const getSaveError = (state: State): any => state.saveError;
const getDeleteError = (state: State): any => state.deleteError;
const getPostsLoaded = (state: State): boolean => state.postsLoaded;

export const selectPostState: MemoizedSelector<object, State>
= createFeatureSelector<State>(AdminFeatureNames.POSTS);

export const selectAllPosts: (state: object) => Post[] = createSelector(
  selectPostState,
  fromPosts.selectAll
);

export const selectPostById: (postId: string) => MemoizedSelector<object, Post>
= (postId: string) => createSelector(
  selectPostState,
  postsState => postsState.entities[postId]
);

export const selectLoadError: MemoizedSelector<object, any> = createSelector(
  selectPostState,
  getLoadError
);

export const selectSaveError: MemoizedSelector<object, any> = createSelector(
  selectPostState,
  getSaveError
);

export const selectDeleteError: MemoizedSelector<object, any> = createSelector(
  selectPostState,
  getDeleteError
);

export const selectIsLoading: MemoizedSelector<object, boolean>
= createSelector(selectPostState, getIsLoading);

export const selectIsSaving: MemoizedSelector<object, boolean>
= createSelector(selectPostState, getIsSaving);

export const selectIsDeleting: MemoizedSelector<object, boolean>
= createSelector(selectPostState, getIsDeleting);

export const selectIsTogglingPublished: MemoizedSelector<object, boolean>
= createSelector(selectPostState, getIsTogglingPublished);

export const selectIsTogglingFeatured: MemoizedSelector<object, boolean>
= createSelector(selectPostState, getIsTogglingFeatured);

export const selectPostsLoaded: MemoizedSelector<object, boolean>
= createSelector(selectPostState, getPostsLoaded);

