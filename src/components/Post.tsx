const Post = ({ post, settings }: Post) => {
  const { id, title, body, userId } = post;
  // console.log(body.length);
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{body.length > settings.ticketPreviewLength ? `${body.substring(0, settings.post.postPreviewLength)}...` : body}</td>
      <td>{userId}</td>
    </tr>
  );
};

export default Post;
