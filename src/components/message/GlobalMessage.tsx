// Entry component
import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';


// 声明变量用于存储对应的实例
let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

export default () => {
  // 使用 App.useApp() 获取静态函数实例
  const staticFunction = App.useApp();
  // 分别将静态函数实例中的 message、modal、notification 分配给对应的变量
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

// 导出变量以供其他模块使用
export { message, notification, modal };
