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

interface Post {
  pop(): unknown;
  id: number;
  title: string;
  body: string;
  userId: number;
  reFetchLocal: Function;
}

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

interface PostSettings {
  postSettings: postPreviewLength;
}

interface postPreviewLength {
  postPreviewLength;
}

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};
