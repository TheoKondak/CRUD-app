import Post from './Post';

const Posts: React.FC<Posts> = ({ posts, settings }) => {
  return (
    <div id="posts">
      {posts.length > 0 ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <Post key={post.id} post={post} settings={settings} />
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Posts yet</div>
      )}
    </div>
  );
};

export default Posts;
