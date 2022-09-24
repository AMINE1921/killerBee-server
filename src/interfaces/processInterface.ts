interface ProcessInterface {
  processId?: string;
  name?: string;
  description?: string;
  model?: string;
  steps?: [
    {
      nbStep?: number;
      descStep?: string;
    }
  ];
}

export default ProcessInterface;
