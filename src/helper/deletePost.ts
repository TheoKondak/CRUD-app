import postsService from '../services/postsService';

// Delete Post
const deletePost: Function = (id: number) => {
  postsService.del(id);
};

export default deletePost;
