export class ResponseEntity {
  error: {
    code: number;
    title: string;
    description: string;
  };

  constructor(data: { code: number; title: string; description: string }) {
    this.error = {
      code: data.code,
      title: data.title,
      description: data.description,
    };
  }
}
