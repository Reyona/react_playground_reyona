import React, { useState } from 'react';
import { ThemeContext, Themes } from './theme-context';
import ThemedButton from './themed-button';
import ThemeSwitcher from './theme-switcher';

const ThemedPage = () => {
  let [theme, setTheme] = useState(Themes.light);
  const toggleTheme = () => {
    setTheme(theme === Themes.dark ? Themes.light : Themes.dark);
  };
  return (
    <>
      <h3>可变上下文测试：</h3>
      <p>在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，而外部的组件使用默认的 theme 值</p>
      <section>
        <p>1. 这里的ThemedButton组件跟其他的不在同一上下文之内，而且既没有绑定this.state.theme也没有绑定切换主题的点击事件，因此只能读到默认值</p>
        <ThemedButton>
          不可改变主题上下文
        </ThemedButton>
      </section>
      <p />

      <section>
        <p>2. 这里的ThemedButton组件放在了ThemeContext.Provider内部，这个上下文中只放了this.state.theme，通过给组件绑定的onClick来改变上下文值</p>
        <p>类组件中读取上下文值：设置contextType + this.context</p>
        <ThemeContext.Provider value={{ theme: theme }}>
          <ThemedButton onClick={toggleTheme}>
            点击改变主题上下文
          </ThemedButton>
        </ThemeContext.Provider>
      </section>
      <p />

      <section>
        <p>3. 这里的ThemedButton组件放在了另一个ThemeContext.Provider内部，但改变上下文值的方法也放进了上下文中</p>
        <p>函数组件中读取上下文值：Comsumer组件 + 箭头函数</p>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ThemeSwitcher>点击改变主题上下文</ThemeSwitcher>
        </ThemeContext.Provider>
      </section>
      <p />

    </>
  );
}

export default ThemedPage;