# GitBook Plugin: Reflinks

A GitBook plugin that enhances content references with beautiful, interactive link blocks.

## Features

- Transforms `content-ref` blocks into styled reference links
- Automatically extracts titles from referenced markdown files
- Modern, responsive design with hover effects
- Supports both local markdown files and external URLs

## Installation

Add the plugin to your `book.json`:

```json
{
  "plugins": ["reflinks"]
}
```

Then install the plugin:

```bash
gitbook install
```

## Usage

### Basic Syntax

```markdown
{% content-ref href="path/to/file.md" %}
Optional custom text
{% endcontent-ref %}
```

### Examples

1. Reference a local markdown file:
```markdown
{% content-ref href="getting-started.md" %}
{% endcontent-ref %}
```

2. Reference with custom text:
```markdown
{% content-ref href="https://example.com" %}
Click here to learn more
{% endcontent-ref %}
```

3. Reference with URL parameter:
```markdown
{% content-ref url="https://example.com" %}
{% endcontent-ref %}
```

## Styling

The plugin automatically applies a modern, responsive design to all reference links with:
- Clean, minimal layout
- Hover effects
- Chevron icon indicator
- Consistent spacing and padding
- Responsive design for all screen sizes

## Configuration

The plugin supports the following configuration in `book.json`:

```json
{
  "pluginsConfig": {
    "reflinks": {
      "title": "Reference"  // Optional: Custom title for reference section
    }
  }
}
```

## License

MIT © CPBox 