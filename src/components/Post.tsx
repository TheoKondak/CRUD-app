const Post = ({ post, settings, isDarkStripe }: PostComponent) => {
  const { id, title, body, userId } = post;

  // console.log(settings.postPreviewLength);
  return (
    <tr className={`${isDarkStripe ? 'bg-primary-transparent text-primary-900 dark:text-white' : 'bg-primary-600 text-white'}  `}>
      <td className="p-2 pl-4">{id}</td>
      <td className="p-2">{title}</td>
      <td className="p-2">{body.length > settings.postPreviewLength ? `${body.substring(0, settings.postPreviewLength)}...` : body}</td>
      <td className="p-2 pl-4">{userId}</td>
    </tr>
  );
};

export default Post;
