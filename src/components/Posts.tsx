import Post from './Post';

interface Posts {
  concat(newPost: { userId: number | void; id: number | void; title: string; body: string }): React.SetStateAction<Posts | null>;
  map(arg0: (post: any) => any): unknown;
  filter(arg0: (post: any) => boolean): Post;
  posts: Post[] | null;
  settings: {
    postSettings: PostSettings | null;
    triggerPostModal: React.MouseEventHandler<HTMLDivElement>;
    isEditablePost: React.MouseEventHandler<HTMLDivElement>;
    setFormInUpdateMode: Function;
  };
  selectPost: Function;
  reFetchLocal: Function;
}

const Posts: React.FC<Posts> = ({ posts, settings, selectPost, reFetchLocal }) => {
  return (
    <div id="posts" className="flex flex-column items-center justify-center  lg:max-w-screen-md xl:max-w-7xl m-4 mt-0 md:mt-0 mx-auto md:m-10 w-full ">
      {posts.length > 0 ? (
        <table className="table-auto w-5/6 text-sm text-left backdrop-blur-md shadow-2xl">
          <thead>
            <tr className="bg-primary-600 dark:bg-primary-900 text-white ">
              <th className="p-2 max-w-max text-left rounded-tl-md">Post ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Body</th>
              <th className="p-2 max-w-max text-center">Created By</th>
              <th className="p-2 max-w-max text-center">View</th>
              <th className="p-2 max-w-max text-center">Edit</th>
              <th className="p-2 max-w-max text-center rounded-tr-md">Delete</th>
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
