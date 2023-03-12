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
