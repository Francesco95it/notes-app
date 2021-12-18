export default class Note {
  id: string;

  title: string;

  content: string;

  tags: string[];

  createdAt: string;

  updatedAt: string;

  constructor(
    id: string,
    title: string,
    content: string,
    tags: string[],
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
