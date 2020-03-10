# svelte-quill

> A preprocessor for Svelte that can be used to fetch data before components are compiled.

## Demos

IMAGE HERE

## Installation

```bash
yarn add -D svelte-preprocessor-fetch
```

## Usage

### With `rollup-plugin-svelte`

```js
// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import preprocessFetch from 'svelte-preprocessor-fetch'

export default {
  ...,
  plugins: [
    svelte({
      preprocess: preprocessFetch()
    })
  ]
}
```

### In components

Create a function called `getStaticProps()` in your script tag and do your fetches here. The data is available using as `data` in your component.

```html
<script>
  async function getStaticProps() {
    const query = `{
			continents {
				name
			}
		}`;

    const res = await fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    const { data } = await res.json();

    return data;
  }
</script>

<main>
  <h2>Continents:</h2>
  <ul>
    {#each data.continents as { name }}
    <li>
      <h3>{name}</h3>
    </li>
    {/each}
  </ul>
</main>
```

## Caveats

This preprocessor is probably extremely brittle, PRs are welcome to improve it further.
