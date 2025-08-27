# SvelteKit 

以下是一些常见问题及问题解析

##  如何开启 `SPA` 模式

`SPA`是指前端单页应用，也就是在前端控制路由。

- `ssr` 表示服务端渲染，会开启水合功能，需要部署到`JS运行时`上，如`nodejs`，`deno`等。

- `prrender` 表示预渲染处理，会将页面直接编译为静态页面，不能包含任何动态路由参数，直接处理为`*.html`。

同时将 `ssr` 和 `prerender` 设置为`false`，将开启`SPA`模式，同时需要修改`adapter`为`@sveltejs/adapter-static`，并设置`fallback`参数，详情如下：

```ts
/**
 * +layout.ts
 */
export const prerender = false;
export const ssr = false;
```

```ts
/**
 * svelte.config.js
 * 文件中其他部分内容已省略
 */
import adapter from '@sveltejs/adapter-static';
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		})
	}
};
```

## `load` 和 `onMount` 的区别

`+page.ts`中的`load`的加载顺序更靠前，鼠标移入到对应的`a`链接上时就会开始加载，而`onMount`则会在页面时挂载完成后才加载。

在`ssr`模式下，两者区别更多，`ssr`模式下`load`方法在服务端运行，如可以获取数据库数据等操作，不建议使用`ssr`模式，不展开讲解。

- `load` 方法相当于预加载，用户可以更快的看到页面，一次性页面使用这个，比如博客展示页。
- `onMount` 则是在页面挂载完成后触发，可以操作`DOM`，也可以操作状态数据等。

- 首次加载数据能使用`load`时尽量使用`load`方法，同时两者也可以搭配使用，更灵活。

## 路由和静态文件路径冲突

如果路由地址和静态文件路径相同了，在不同的场景可能导致不同的效果，有些会优先加载路由页面，有些则会加载静态文件.

为了杜绝这种问题，除了极个别必须放在根目录的文件外，如`index.html`和`robots.txt`外，其他静态文件都放置在一个独立的`文件夹`中。

这样只要避开这个文件夹的前缀，就能一劳永逸的解决问题。

## 嵌套布局

默认`+layout.svelte`布局是对所有子页面生效的，而且会循环嵌套布局，也就是路由树的每一层都可以包含一个`+layout.svelte`文件，生成套娃布局。

但是有些场景需要打破这种布局，如有些页面显示菜单，而其他的则不显示。此时需要使用分组，也就是将具有布局结构的放到同一个`(group)`目录下，其中`group`为分组名，每个分组可以起任意名，并且`()`这种目录不会被视作路由路径的一部分。
