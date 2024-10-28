export declare interface NatsConfig {
  name?: string;
  user?: string;
  pass?: string;
  servers?: string[];
}

export const natsConfig: NatsConfig = {
  name: process.env.NATS_NAME,
  user: process.env.NATS_USER,
  pass: process.env.NATS_PASS,
  servers: process.env.NATS_SERVERS?.split(','),
};
