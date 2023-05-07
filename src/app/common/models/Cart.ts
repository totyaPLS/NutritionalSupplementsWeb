import {Content} from "./Content";

export interface Cart {
  id: string;
  userId: string;
  content: Array<Content>
}
