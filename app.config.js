import 'dotenv/config';

const config = {
  name: 'ExpoKRWebchat',
  version: '1.0.0',
  extra: { ...process.env }
}

export default config;