export interface Country {
  displayName: string;
  name: string;
  alpha2Code: string;
  translations: { [key: string]: string };
}
