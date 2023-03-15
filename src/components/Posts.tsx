import Post from './Post';

const Posts: React.FC<Posts> = ({ posts, settings, selectPost, reFetchLocal }) => {
  return (
    <div id="posts" className="flex flex-column items-center justify-center lg:max-w-screen-md xl:max-w-7xl m-4 mt-0 md:mt-0 mx-auto md:m-10 w-full">
      {posts.length > 0 ? (
        <div className="w-full text-sm text-left backdrop-blur-md  relative">
          <div id="posts-head" className="hidden md:grid grid-cols-table lg:grid-cols-table-lg sticky top-0 z-20">
            <div id="post-id" className="p-4 text-left whitespace-nowrap rounded-tl-md rounded-bl-md  bg-tertiary-600 mb-5 dark:bg-slate-700 text-white flex items-center justify-center">
              <span>Post ID</span>
            </div>
            <div id="post-content" className="p-4 whitespace-nowrap  bg-tertiary-600 mb-5 dark:bg-slate-700 text-white flex items-center justify-center">
              <span>Content</span>
            </div>
            <div id="Created By" className="p-4 whitespace-nowrap text-center  bg-tertiary-600 mb-5 dark:bg-slate-700 text-white flex items-center justify-center">
              <span>Created By</span>
            </div>
            <div id="view-post-modal" className="p-4 whitespace-nowrap text-center  bg-tertiary-600 mb-5 dark:bg-slate-700 text-white flex items-center justify-center">
              <span>View</span>
            </div>
            <div id="edit-post-modal" className="p-4 whitespace-nowrap text-center  bg-tertiary-600 mb-5 dark:bg-slate-700 text-white flex items-center justify-center">
              <span>Edit</span>
            </div>
            <div id="delete-post" className="p-4 whitespace-nowrap text-center rounded-tr-md rounded-br-md  bg-tertiary-600 mb-5 dark:bg-slate-700 text-white flex items-center justify-center">
              <span>Delete</span>
            </div>
          </div>
          <div>
            {posts.map((post, index) => (
              <Post key={post.id} isDarkStripe={index % 2 == 0 ? true : false} post={post} settings={settings} selectPost={selectPost} reFetchLocal={reFetchLocal} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xl  rounded-lg backdrop-blur-md shadow-2xl text-white text-center bg-primary-700 w-4/6 p-5">No Posts yet</div>
      )}
    </div>
  );
};

export default Posts;
