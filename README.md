# Takeka - Open Source Modern Svelte Admin Dashboard Template

![Cover](https://raw.githubusercontent.com/ichsanputr/takeka/refs/heads/master/public/Cover.jpg)

Free & open source modern, mobile responsive admin dashboard template built with Svelte, Vite, and Tailwind CSS. Features a clean design, dark/light mode support, comprehensive i18n internationalization, and local data management with search capabilities.

## 🚀 Features

- 🎨 **Modern Design**: Clean and professional UI with Tailwind CSS & DaisyUI
- 🌙 **Dark/Light Mode**: Toggle between themes with smooth transitions
- 🌍 **Internationalization**: Full i18n support with svelte-i18n (English, Indonesian, Spanish, Korean)
- 📊 **Dashboard Analytics**: Interactive charts with Chart.js
- 👥 **User Management**: Complete user CRUD operations with search & filtering
- 📦 **Product Management**: Product catalog with inventory tracking
- 📈 **Analytics Page**: Business performance tracking with visualizations
- ⚙️ **Settings Page**: Account and application settings
- 📋 **Project Management**: Gantt charts and Kanban board with drag & drop
- 🔄 **Drag & Drop**: Interactive task management with wx-svelte-grid
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- ⚡ **Fast**: Built with Vite for optimal performance
- 🗺️ **Maps**: Interactive maps with Leaflet
- 🎭 **Animations**: Smooth motion animations with Motion library
- 🎯 **Loading States**: Custom loading spinner with glassmorphism effects

## 🛠️ Technology Stack

### Frontend
- **[Svelte 5](https://svelte.dev/)** - Progressive JavaScript framework
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[DaisyUI](https://daisyui.com/)** - Component library for Tailwind CSS
- **[Svelte I18n](https://github.com/kaisermann/svelte-i18n)** - Internationalization
- **[Motion](https://motion.dev/)** - Animation library
- **[Chart.js](https://www.chartjs.org/)** - Charting library
- **[Leaflet](https://leafletjs.com/)** - Interactive maps
- **[Iconify](https://iconify.design/)** - Icon framework
- **[Melt UI](https://www.melt-ui.com/)** - Headless UI components

## 📦 Key Dependencies

### Core Dependencies

- **@iconify/svelte** `^5.0.0` - Icon framework for Svelte
- **@melt-ui/svelte** `^0.86.6` - Headless UI components
- **chart.js** `^4.5.0` - Charting library
- **daisyui** `^5.0.43` - Component library for Tailwind CSS
- **leaflet** `^1.9.4` - Interactive maps library
- **motion** `^12.18.1` - Animation library
- **svelte-i18n** `^4.0.1` - Internationalization for Svelte
- **wx-svelte-gantt** `^2.1.1` - Gantt chart component
- **wx-svelte-grid** `^2.1.5` - Data grid component with drag & drop

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ichsanputr/takeka
   cd takeka
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

## 🌍 Internationalization

The dashboard supports multiple languages:
- English (en)
- Indonesian (id)
- Spanish (es)
- Korean (ko)

Language can be switched using the language switcher in the header.

## 📱 Pages & Components

### Main Pages
- **Dashboard** - Overview with statistics and charts
- **Users** - User management with search and filtering
- **Products** - Product catalog with inventory tracking
- **Analytics** - Business performance analytics
- **Charts** - Interactive data visualizations
- **Projects** - Project management with Gantt charts
- **Maps** - Interactive location-based features
- **Schedule** - Schedule management
- **Profile** - User profile management
- **Settings** - Application configuration

### Authentication Pages
- **Login V1/V2/V3** - Multiple login page designs
- **Register V1/V2/V3** - Multiple registration page designs

## 🎨 Customization

### Adding New Languages

1. Create a new translation file in `src/lib/i18n/locales/`
2. Add the language to the i18n configuration in `src/lib/i18n/index.js`
3. Update the language switcher component

### Theme Customization

1. Modify `tailwind.config.js` for color schemes
2. Update DaisyUI theme configuration
3. Customize component styles in individual Svelte files

### Adding New Pages

1. Create new page component in `src/lib/pages/`
2. Add route to `src/lib/router.js`
3. Update sidebar navigation in `src/lib/components/Sidebar.svelte`

## 🔧 Data Structure

The app uses local JSON data files for all content:
- `src/lib/data/users.js` - User management data
- `src/lib/data/products.js` - Product catalog data
- `src/lib/data/dashboard.js` - Dashboard statistics
- `src/lib/data/gantt.js` - Project management data
- `src/lib/data/notifications.js` - Notifications and messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help about this project, you can contact me at iniasya1@gmail.com.
