# Static

Static is an [11ty](https://11ty.dev/) starter built with [Snowpack](https://www.snowpack.dev/), deployed on [Netlify](https://www.netlify.com/) and has the option to be managed with [Prismic](https://prismic.io/).

## Get Started

### Clone

**Default**:
`npx degit https://github.com/frzrbox/static/#main <site-name>`

**Prismic**:
`npx degit https://github.com/frzrbox/static/#prismic <site-name>`

### Run Locally

`npm start`

### Build

`npm run build`

## Features

- Typescript
- Babel
- SCSS
- Image Optimization
- Integration with Prismic (Works out of the box if starting from the Prismic template, otherwise you will have to manually set it up)

## Contents

- [Meta Info](#meta-info)
- [Styling](#styling)
- [Typescript](#typescript)
- [Image optimization](#image-optimization)
- [Prismic](#prismic)
- [Deployment](#deployment)

## Meta Info

By default you can globally set meta information in `src/_data/site.json`. You can also customize per page by editing the `metaDesc` and `title` values in the pages frontmatter.

**Example**:

```yaml
---
title: About
metaDesc: This is the meta description for the about page.
---

```

## Styling

Out of the box Static uses SCSS for styling. It comes with helpful utility classes located at `src/scss/partials/_utils.scss` and a [Modern CSS Reset by Andy Bell](https://piccalil.li/blog/a-modern-css-reset/). If you like to write your styling from scratch you can also just delete the entire contents of the `scss` folder.

By default all files located directly in the `src/scss` folder will be passed to `dist/css` (note: all files located in a subfolder will not be passed through). To add multiple stylesheets per page you can set it in the specific layout located at `src/_includes/layouts`.

**Example**:

```tree
-- scss
---- styles.css
---- about.scss
```

Demo for: `src/_includes/layouts/about.njk`

```njk
{# Make sure to use relative paths: the css folder is located in the root #}
{% set pageStylesheets = ['css/styles.css', 'css/about.css'] %}
```

## Typescript

All files located in `src/js` support typescript out of the box. It also uses babel to transpile all code, so modern features like `import / export` and `async / await` can be used. If you need further customization you can edit the babel cli in `snowpack.conifg.js`.

## Image Optimization

Static uses [eleventy-img](https://www.11ty.dev/docs/plugins/image/) and a nunjucks shortcode name `picture` to generate responsive images.

**Note:** The images will be all stored in the `img` folder in the root directory so name relative paths accordingly, configuration can also be changed in `.eleventy.js`

The shortcude is structured like this:

```njk
{% picture src alt className %}
```

- **src**: The path to the image
- **alt**: Alt text for the element (Note: the build will fail if no alt is added)
- **className** (optional): Classes that should be added to the picture element by default all elements will recieve the class `responsive_image`

**Example**:

```yaml
---
image:
  url: src/img/my-cool-image.jpg
  alt: This is a really cool image
---

```

```njk
{% picture image.url, image.alt, 'cool_image width__100' %}
```

## Prismic

If you start from the Prismic template, Static will come with a configuration file (`prismic.js`), a link resolver (`linkResolver.js`), a HTML serializer (`hmtlSerializer.js`) and handy shortcodes that can be customized in `.eleventy.js`.

### Conifguration

The configuration file is `prismic.js`, it exports a `client` that can be used to query the api within `src/_data`. To setup the configuration you will need to add the values for `PRISMIC_ENDPOINT` and `PRISMIC_ACCESS_TOKEN` to the `.env` file.

Useful links

- [Link Resolver](https://prismic.io/docs/technologies/link-resolver-javascript)
- [HTML Serializer](https://prismic.io/docs/technologies/html-serializer-javascript)
- [Querying Data With Prismic](https://prismic.io/docs/technologies/how-to-query-the-api-javascript)

### Link Resolver

Static automatically generates a `link` shortcode that uses options from `linkResovler.js` to generate an `a` tag.

**Example**:

```njk
{% for item in navigation %}
  <li>
      {# shortcode link content classNames target #}
      {% link item.link, item.label, 'nav_link', item.link.target %}
  </li>
{% endfor %}
```

### HTML Serializer

For parts of the site that need rich text, Static has a `richText` shortcode that will generate rich text based of options specified in the `htmlSerializer.js` and the `linkResolver.js`.

**Example**:

```njk
{% set post_content = post.data.content %}
{% richText post_content %}
```

### Querying

All queries will be done within the `src/_data` directory using the `client` from our configuration file. Documentaion on [querying data from Prismic can be found here](https://prismic.io/docs/technologies/how-to-query-the-api-javascript).

**Example**:

`src/_data/header`

```js
const { client } = require('../../prismic');

module.exports = async () => {
  const header = await client.getSingle('header');
  return header;
};
```

`header.njk`

```njk
{% set navigation = header.data.navigation %}

<header>
    <h1 class="ta__center"><a href="/">Site Name</a></h1>

    <nav>
        <ul>
            {% for item in navigation %}
                <li>
                    {# shortcode link content classNames target #}
                    {% link item.link, item.label, 'nav_link', item.link.target %}
                </li>
            {% endfor %}
        </ul>
    </nav>
</header>
```

## Deployment

**Note:** While this site can be deployed anyhwere, to get the best out of Static we reccomend deploying on [Netlify](https://www.netlify.com/).

[![Deploy to Netlify button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/frzrbox/static)

## Thanks

This project was inspired by lessons learned from:

- [Andy Bell's 11ty Course](https://piccalil.li/course/learn-eleventy-from-scratch/)
- [Levelup Tutorials Snowpack & ESM](https://www.leveluptutorials.com/tutorials/esm-and-snowpack)
