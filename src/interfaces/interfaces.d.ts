// Settings

interface Settings {
  view: View;
}

interface View {
  logo: Logo;
  theme: Theme;
  post: PostSettings;
  footer: Footer;
}

interface Theme {
  darkThemeByDefault: boolean;
}

interface PostSettings {
  postPreviewLength: Number;
}

interface Footer {
  settings: {
    copyrightInfo: string;
    githubLink: string;
    githubLinkOpensInNewTab: boolean;
  } | null;
}

// Utility Components

interface Loading {
  type?: string;
  color?: string;
}

interface Logo {
  src: string;
  alt: string;
  width: string;
  height: string;
}

// Components

interface PostComponent {
  post: Post;
  settings: PostSettings;
  isDarkStripe: boolean;
  selectPost: Function<number>;
}

interface Post {
  pop(): unknown;
  id: number;
  title: String;
  body: String;
  userId: number;
}

interface Posts {
  filter(arg0: (post: any) => boolean): Post;
  posts: Post[] | null;
  settings: {
    postSettings: PostSettings | null;
    triggerPostModal: React.MouseEventHandler<HTMLDivElement>;
    isEditablePost: React.MouseEventHandler<HTMLDivElement>;
  };
  selectPost: Function<number>;
}

interface PostSettings {
  postSettings: postPreviewLength;
}

interface postPreviewLength {
  postPreviewLength;
}
