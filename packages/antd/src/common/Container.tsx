import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { PropsWithChildren } from 'react';

const Container: React.FC<PropsWithChildren<{ container?:Element | ShadowRoot, colorPrimary?: string}>> = ({ children, container, colorPrimary = "#00b96b" }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary,
      },
    }}
  >
    <StyleProvider container={container}>
      {children}
    </StyleProvider>
  </ConfigProvider>
);

export default Container