import Post from './Post';

// Helper
import isPrime from '../helper/isPrime';

const Posts: React.FC<Posts> = ({ posts, settings }) => {
  return (
    <div id="posts" className="flex flex-column items-center justify-center w-full max-w-10xl m-4  md:m-10 ">
      {posts.length > 0 ? (
        <table className="table-auto  text-sm text-left rounded-lg overflow-hidden backdrop-blur-md shadow-2xl">
          <thead>
            <tr className="bg-primary-600 dark:bg-primary-900 text-white ">
              <th className="p-2 ">Post ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Body</th>
              <th className="p-2">Created By</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <Post key={post.id} isDarkStripe={index % 2 == 0 ? true : false} post={post} settings={settings} />
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
