# Email Scramble Protection

A React component that protects email addresses from web scrapers while maintaining a sleek user experience. The component continuously scrambles the email address until a user physically interacts with it, making it difficult for bots to capture the real address.

## Features

- 🔒 Continuous email scrambling for bot protection
- 📱 Touch and mouse support for all devices
- 🎨 Clean, modern design with customizable styling
- ♿ Accessibility considerations
- 🔄 Smooth slider interaction
- 📦 Easy to integrate

## Live Demo

You can see the component in action at: [https://email-scramble.onrender.com](https://email-scramble.onrender.com)

## Integration Guide

### WordPress Integration

Add this component to your WordPress site using either a shortcode or direct iframe embedding.

#### Using Shortcode

Add this to your theme's `functions.php` or a site-specific plugin:

```php
function email_protector_shortcode() {
    return '<iframe 
        src="https://email-scramble.onrender.com" 
        width="100%" 
        height="200" 
        frameborder="0" 
        scrolling="no"
        style="overflow:hidden; max-width: 500px; margin: 0 auto; display: block;"
    ></iframe>';
}
add_shortcode('email_protector', 'email_protector_shortcode');
```

Then use it in any post or page with:
```
[email_protector]
```

#### Direct HTML Integration

Add this HTML where you want the email protection to appear:

```html
<iframe 
    src="https://email-scramble.onrender.com" 
    width="100%" 
    height="200" 
    frameborder="0" 
    scrolling="no"
    style="overflow:hidden; max-width: 500px; margin: 0 auto; display: block;"
></iframe>
```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/redmorestudio/Email-Scramble.git
cd Email-Scramble
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Building for Production

```bash
npm run build
```

## Customization

The component uses Tailwind CSS for styling and includes these brand colors:

- Main Brand Color: Teal (#2AA8B3) - titles and links
- Accent Color: Yellow (#FFD93D) - buttons and sliders
- Secondary Accent: Coral (#FF6F61) - content headers
- Text Color: Dark Gray (#3A3A3A) - body text
- Background: Light Gray (#F5F5F5) - containers

## Security Features

- Email is never present in the HTML source
- Continuous scrambling makes scraping difficult
- Human interaction required to reveal email
- Touch/click events required (can't be automated)

## License

MIT License - feel free to use in any project

## Credits

Created by Seth Redmore / Redmore Studio