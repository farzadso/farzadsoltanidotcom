# My statically generated blog using Next.js, Markdown, and TypeScript

The blog posts are stored in `/_posts` as Markdown files with front matter support. Adding a new Markdown file in there will create a new blog post.

To create the blog posts this project uses [`remark`](https://github.com/remarkjs/remark) and [`remark-html`](https://github.com/remarkjs/remark-html) to convert the Markdown files into an HTML string, and then send it down as a prop to the page. The metadata of every post is handled by [`gray-matter`](https://github.com/jonschlinkert/gray-matter) and also sent in props to the page.

## Scripts

Start development server

```bash
yarn dev
```

Build project

```bash
yarn build
```

Start production server

```bash
yarn start
```

Check types

```bash
yarn typecheck
```

## Notes

This project uses [Tailwind CSS](https://tailwindcss.com). To control the generated stylesheet's filesize, this project uses Tailwind CSS' v2.0 [`purge` option](https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css) to remove unused CSS.

[Tailwind CSS v2.0 no longer supports Node.js 8 or 10](https://tailwindcss.com/docs/upgrading-to-v2#upgrade-to-node-js-12-13-or-higher). To build your CSS you'll need to ensure you are running Node.js 12.13.0 or higher in both your local and CI environments.
