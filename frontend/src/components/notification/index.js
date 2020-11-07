import { message } from "antd";

message.config({
  duration: 3,
  maxCount: 5
});

const notification = {
  info: text => {
    message.info({ content: text });
  },
  success: text => {
    message.success({ content: text });
  },
  error: text => {
    message.error({ content: text });
  },
  warn: text => {
    message.warn({ content: text });
  }
};

export default notification;
