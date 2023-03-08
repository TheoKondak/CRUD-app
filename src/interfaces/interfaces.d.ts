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

interface Post {
  post: { id: number; title: String; body: String; userId: number };
  settings: PostSettings;
  isDarkStripe: boolean;
}

interface Posts {
  posts: Post[] | null;
  settings: PostSettings | null;
}

interface PostSettings {
  postSettings: postPreviewLength;
}

interface postPreviewLength {
  postPreviewLength;
}
