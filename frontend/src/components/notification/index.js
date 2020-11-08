import { message } from "antd";

message.config({
  duration: 3,
  maxCount: 5
});

const notification = {
  info: (text) => {
    message.info({ content: text }, 5);
  },
  success: text => {
    message.success({ content: text }, 5);
  },
  error: text => {
    message.error({ content: text }, 5);
  },
  warn: text => {
    message.warn({ content: text }, 5);
  }
};

export default notification;
