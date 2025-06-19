# Takeka - Open Source Modern Svelte Admin Dashboard Template

Free & open source modern, mobile responsive admin dashboard template built with Svelte, Vite, and Tailwind CSS. Features a clean design, dark/light mode support, and comprehensive i18n internationalization.

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

## Getting Started

You can clone this repository or download the built files from the release page.

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

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help about this project, you can contact me at iniasya1@gmail.com.

---