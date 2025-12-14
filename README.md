# Burgizza
# 🍕 Burgizza - Modern HTML Restaurant Template

This is a modern and responsive HTML, CSS, and JavaScript template specifically designed for Pizza and Burger outlets, cafes, and other fast-casual restaurants.

## ✨ Template Features

* Fully Responsive Design (Mobile, Tablet, Desktop ready)
* Clean and Well-Structured Code
* Dedicated Menu Section
* Reservation Form ready for simple backend integration

## 🚀 Setup and Installation Guide

Using and setting up this template is very straightforward:

1.  **Download:** Download all template files (`index.html`, `css/`, `js/`, `images/`).
2.  **Extract:** Unzip the files to a folder on your system.
3.  **Editing:** Open the `index.html` file in any code editor (e.g., VS Code) to start customization.
4.  **Preview:** Open `index.html` in your browser to view the live design.

---

## 🎨 Customization Guide

Here is how you can easily modify the template to match your brand:

### 1. **Colors and Fonts**

* **Change Main Color:** The template's main colors (used for buttons and highlights) are controlled by CSS variables for easy change.
    * File: `css/style.css`
    * Find the `:root` selector at the beginning of the CSS file and change these variables:
        ```css
        :root {
            --primary-color: #ffc107; /* Orange/Yellow accent */
            --secondary-color: #333;  /* Dark background color */
        }
        ```
    Replace the color codes (`#ffc107`, `#333`) with your brand's color codes.
* **Fonts:** Fonts are managed via a Google Fonts link inside the `<head>` tag of the `index.html` file.

### 2. **Menu Items and Pricing**

All menu content is located within the `index.html` file.

* File: `index.html`
* Locate the **`<section class="menu">`** tag.
* You can edit the name, description, and price of each menu item (Burger, Pizza, sides) by changing the text inside the relevant `<h2>` and pricing `<span>` tags.

### 3. **Image Replacement**

High-quality food images are essential for a professional look.

* **Replace:** Put your own high-resolution image files inside the **`images/`** folder.
* **Update Path:** Ensure you update the image file names and paths in the relevant `<img>` tags in `index.html` (or in `style.css` if they are background images).

---

## 🔗 Reservation Form Setup

The form in the template is primarily for design and does not contain server-side code (like PHP). To make it functional, you must connect it to a form handling service.

### Recommended Service: Formspree

1.  Create an account and set up a new form on **Formspree**.
2.  Copy the unique **Endpoint URL** provided by Formspree.
3.  In your `index.html` file, find the `<form>` tag and paste the URL into the `action` attribute:

```html
<form action="https://formspree.io/f/mwpgzrlz" method="POST">
    </form>

🤝 Support and Contact
If you require assistance with setting up the template or fixing any issues, please contact the developer at this email address: hk5718721@gmail.com
