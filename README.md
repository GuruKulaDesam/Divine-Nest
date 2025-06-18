# Takeka - Open Source Modern Svelte Admin Dashboard Template

A modern, responsive admin dashboard template built with Svelte, Vite, and Tailwind CSS. Features a clean design, dark/light mode support, and comprehensive i18n internationalization.

## Features

- 🎨 **Modern Design**: Clean and professional UI with Tailwind CSS
- 🌙 **Dark/Light Mode**: Toggle between themes
- 🌍 **Internationalization**: Full i18n support with svelte-i18n (English, Indonesian, Spanish, Korean)
- 📊 **Dashboard Analytics**: Charts and statistics
- 👥 **User Management**: Complete user CRUD operations
- 📦 **Product Management**: Product catalog management
- 📈 **Analytics Page**: Business performance tracking
- ⚙️ **Settings Page**: Account and application settings
- 📋 **Project Management**: Kanban board with drag & drop
- 🔄 **Drag & Drop**: Interactive task management
- 📱 **Responsive**: Mobile-first design
- ⚡ **Fast**: Built with Vite for optimal performance

## Components

### Global Components

#### DeleteConfirmationModal
A reusable delete confirmation modal that can be used across all pages:

```svelte
<script>
  import DeleteConfirmationModal from '../components/DeleteConfirmationModal.svelte';
  
  let showDeleteModal = false;
  let itemToDelete = null;
  
  function handleDelete(item) {
    itemToDelete = item;
    showDeleteModal = true;
  }
  
  function handleDeleteConfirm() {
    // Handle delete logic here
    console.log('Delete item:', itemToDelete);
    itemToDelete = null;
  }
  
  function handleDeleteCancel() {
    itemToDelete = null;
  }
</script>

<!-- Your page content -->

<!-- Delete Confirmation Modal -->
<DeleteConfirmationModal
  bind:isOpen={showDeleteModal}
  title={$_('deleteConfirmation.title')}
  message={$_('deleteConfirmation.message')}
  itemName={itemToDelete?.name || ''}
  on:confirm={handleDeleteConfirm}
  on:cancel={handleDeleteCancel}
/>
```

**Props:**
- `isOpen` (boolean): Controls modal visibility
- `title` (string): Modal title (optional, uses default if not provided)
- `message` (string): Modal message (optional, uses default if not provided)
- `itemName` (string): Name of item to be deleted (optional)
- `confirmText` (string): Custom confirm button text (optional)
- `cancelText` (string): Custom cancel button text (optional)

**Events:**
- `confirm`: Fired when user confirms deletion
- `cancel`: Fired when user cancels or closes modal

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sveltedashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable components
│   │   ├── DeleteConfirmationModal.svelte
│   │   ├── DashboardLayout.svelte
│   │   └── ...
│   ├── pages/              # Page components
│   ├── data/               # Mock data
│   ├── i18n/               # Internationalization
│   │   └── locales/        # Translation files
│   └── utils/              # Utility functions
├── App.svelte              # Main app component
└── main.js                 # App entry point
```

## Internationalization

The dashboard supports multiple languages:
- English (en)
- Indonesian (id)
- Spanish (es)
- Korean (ko)

Language can be switched using the language switcher in the header.

## Customization

### Adding New Languages

1. Create a new translation file in `src/lib/i18n/locales/`
2. Add the language to the i18n configuration in `src/lib/i18n/index.js`
3. Update the language switcher component

### Styling

The project uses Tailwind CSS for styling. Custom styles can be added in:
- `src/app.css` for global styles
- Component-specific `<style>` blocks for component styles

### Adding New Pages

1. Create a new page component in `src/lib/pages/`
2. Add the route to `src/App.svelte`
3. Add navigation item to the sidebar in `src/lib/components/Sidebar.svelte`
4. Add translations for the new page

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Windster admin template
- Icons by Heroicons
- Charts by Chart.js
- Internationalization by svelte-i18n

## 🎯 Key Components

### Dashboard Features

- **Statistics Cards**: Real-time metrics display
- **Revenue Charts**: Interactive data visualization
- **User Management**: Complete user CRUD operations
- **Product Catalog**: Inventory and product management
- **Analytics**: Detailed reporting and insights
- **Settings**: User preferences and system config

### UI Components

- **Responsive Sidebar**: Collapsible navigation
- **Header**: User profile and notifications
- **Language Switcher**: Multi-language support
- **Data Tables**: Sortable and filterable
- **Modals**: User-friendly dialogs
- **Forms**: Validation and error handling

## 🔧 Configuration

### Tailwind Configuration

Customize your design system in `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6B7280'
      }
    }
  },
  plugins: [require('daisyui')]
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Svelte](https://svelte.dev/) - The amazing reactive framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Beautiful UI components
- [Iconify](https://iconify.design/) - Icon library
- [Windster](https://windster.com/) - Design inspiration

## 📞 Support

If you have any questions or need help, please:

- 📧 Email: iniasya1@example.com
- 🐛 Report bugs: [GitHub Issues](https://github.com/ichsanputr/takeka.git/issues)

---

Made with ❤️ using Svelte and Vite
