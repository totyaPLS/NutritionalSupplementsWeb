import {Content} from "./Content";

export interface Cart {
  id: string;
  userId: string;
  contentList: Array<Content>
}
