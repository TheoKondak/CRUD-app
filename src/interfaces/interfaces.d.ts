// Settings

interface Settings {
  view: View;
}

interface View {
  logo: Logo;
  theme: Theme;
  post: PostSettings;
}

interface Theme {
  darkThemeByDefault: boolean;
}

interface PostSettings {
  postPreviewLength: Number;
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
  id: number;
  title: String;
  body: String;
  userId: number;
  settings: PostSettings;
}

interface Posts {
  posts: Post[];
  settings: PostSettings;
}

interface PostSettings {
  postSettings: postPreviewLength;
}

interface postPreviewLength {
  postPreviewLength;
}
