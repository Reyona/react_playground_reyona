import React from 'react';
import { ThemeContext } from './theme-context';

// 类组件中读取上下文值：设置contextType + this.context
class ThemedButton extends React.Component {
  static contextType = ThemeContext;

  render() {
    let props = this.props;
    let theme = this.context.theme;
    return (
      <button
        {...props}
        style={{ backgroundColor: theme.background, color: theme.foreground }}
      />
    );
  }
}

export default ThemedButton;