import { ThemeContext } from './theme-context';

// 函数组件中读取上下文值：Comsumer组件 + 箭头函数
function ThemeSwitcher({ children }) {
  // 这个组件不仅获取theme值，还从context中获取到一个toggleTheme函数
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background, color: theme.foreground }}>
          { children }
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeSwitcher;