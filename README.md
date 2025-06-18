# Takeka - Svelte Dashboard Admin Template

A modern, responsive admin dashboard built with Svelte, Vite, and Tailwind CSS. Features a clean design inspired by Windster template with full internationalization (i18n) support.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, responsive design with smooth animations
- 🌍 **Internationalization** - Support for English, Indonesian, Spanish, and Korean
- 📊 **Dashboard Analytics** - Revenue charts, user statistics, and data visualization
- 👥 **User Management** - Complete CRUD operations for users with filtering and search
- 📦 **Product Management** - Product catalog with inventory tracking
- 📈 **Analytics Page** - Detailed analytics and reporting
- ⚙️ **Settings Panel** - User preferences and system configuration
- 🎭 **Dark/Light Mode** - Theme switching capability
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **Accessibility** - WCAG compliant with proper ARIA labels

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
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

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🌍 Internationalization (i18n)

The dashboard supports multiple languages out of the box:

- 🇺🇸 **English** (en)
- 🇮🇩 **Indonesian** (id)
- 🇪🇸 **Spanish** (es)
- 🇰🇷 **Korean** (ko)

### Adding New Languages

1. Create a new translation file in `src/lib/i18n/locales/`
2. Add the language configuration in `src/lib/i18n/index.js`
3. Update the language switcher component

### Translation Structure

```json
{
  "dashboard": {
    "title": "Dashboard",
    "welcome": "Welcome back!"
  },
  "users": {
    "title": "Users",
    "add_user": "Add User"
  }
}
```

## 🎨 Customization

### Styling

The project uses Tailwind CSS for styling. You can customize:

- **Colors**: Edit `tailwind.config.js`
- **Components**: Modify component files in `src/lib/components/`
- **Layout**: Update `DashboardLayout.svelte`

### Adding New Pages

1. Create a new page component in `src/lib/pages/`
2. Add the route in `src/lib/router.js`
3. Update the sidebar navigation in `Sidebar.svelte`
4. Add translations for the new page

### Data Management

- **Mock Data**: Located in `src/lib/data/`
- **API Integration**: Replace mock data with real API calls
- **State Management**: Use Svelte stores for global state

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🛠️ Tech Stack

- **Frontend Framework**: [Svelte 5](https://svelte.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Iconify](https://iconify.design/)
- **Internationalization**: [svelte-i18n](https://github.com/kaisermann/svelte-i18n)
- **UI Components**: [DaisyUI](https://daisyui.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Animations**: [Motion](https://motion.dev/)

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
