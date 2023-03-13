import Post from './Post';

const Posts: React.FC<Posts> = ({ posts, settings, selectPost, reFetchLocal }) => {
  return (
    <div id="posts" className="flex flex-column items-center justify-center lg:max-w-screen-md xl:max-w-7xl m-4 mt-0 md:mt-0 mx-auto md:m-10 w-full">
      {posts.length > 0 ? (
        <table className="table-auto w-full text-sm text-left backdrop-blur-md  relative border-collapse">
          <thead>
            <tr className=" ">
              <th className="p-4 max-w-max text-left whitespace-nowrap rounded-tl-md sticky top-0 bg-primary-600 dark:bg-primary-900 text-white z-10">Post ID</th>
              <th className="p-4 max-w-max whitespace-nowrap sticky top-0 bg-primary-600 dark:bg-primary-900 text-white z-10">Title</th>
              <th className="p-4 max-w-max whitespace-nowrap sticky top-0 bg-primary-600 dark:bg-primary-900 text-white z-10">Body</th>
              <th className="p-4 max-w-max whitespace-nowrap text-center sticky top-0 bg-primary-600 dark:bg-primary-900 text-white z-10">Created By</th>
              <th className="p-4 max-w-max whitespace-nowrap text-center sticky top-0 bg-primary-600 dark:bg-primary-900 text-white z-10">View</th>
              <th className="p-4 max-w-max whitespace-nowrap text-center sticky top-0 bg-primary-600 dark:bg-primary-900 text-white z-10">Edit</th>
              <th className="p-4 max-w-max whitespace-nowrap text-center rounded-tr-md sticky top-0 bg-primary-600 dark:bg-primary-900 text-white z-10">Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <Post key={post.id} isDarkStripe={index % 2 == 0 ? true : false} post={post} settings={settings} selectPost={selectPost} reFetchLocal={reFetchLocal} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-xl  rounded-lg backdrop-blur-md shadow-2xl text-white text-center bg-primary-700 w-4/6 p-5">No Posts yet</div>
      )}
    </div>
  );
};

export default Posts;
