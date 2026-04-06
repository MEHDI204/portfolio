# 🌟 Portfolio Personnel - El Mehdi Nidkouchi

Portfolio web moderne et interactif présentant mes projets, compétences et parcours en tant qu'étudiant en ingénierie logicielle.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://github.com/MEHDI204/portfolio)
[![GitHub](https://img.shields.io/badge/github-MEHDI204-blue)](https://github.com/MEHDI204)
[![LinkedIn](https://img.shields.io/badge/linkedin-connect-0077B5)](https://www.linkedin.com/in/el-mehdi-nidkouchi-556430226/)

## ✨ Aperçu

Site portfolio personnel développé avec React et TypeScript, mettant en valeur mes compétences en développement full-stack et mes projets académiques. Le design moderne utilise des animations fluides, des dégradés dynamiques et une interface responsive.

## 🚀 Caractéristiques

- **Design Moderne** : Interface élégante avec animations fluides et effets de survol
- **Responsive** : Adapté à tous les appareils (mobile, tablette, desktop)
- **Animations Interactives** : 
  - Orbe de gradient suivant le curseur
  - Animations de particules d'arrière-plan
  - Transitions fluides entre les sections
- **Sections Complètes** :
  - 🏠 Accueil avec présentation
  - 💼 Projets récents avec liens GitHub
  - 💪 Compétences techniques
  - 🎓 Formation académique
  - 📧 Contact et réseaux sociaux

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Icônes modernes

### Outils & DevOps
- **ESLint** - Linting
- **PostCSS** - Transformation CSS
- **Git** - Contrôle de version

## 📂 Structure du Projet

```
portfolio/
├── public/           # Fichiers statiques
├── src/
│   ├── App.tsx      # Composant principal du portfolio
│   ├── main.tsx     # Point d'entrée de l'application
│   ├── index.css    # Styles globaux et animations
│   └── assets/      # Images et ressources
├── index.html       # Template HTML
├── package.json     # Dépendances
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Projets Présentés

### 1. E-commerce Full Stack
Application web monolithique moderne avec Laravel, React.js et Inertia.js
- 🔗 [Voir sur GitHub](https://github.com/MEHDI204/e-commerce-platform.git)

### 2. Station Météorologique
Système C++ utilisant le pattern Observer pour mises à jour en temps réel
- 🔗 [Voir sur GitHub](https://github.com/MEHDI204/weather-station)

### 3. Système de Gestion MIPS
Programme en assemblage MIPS pour gestion d'employés
- 🔗 [Voir sur GitHub](https://github.com/MEHDI204/MIPS-Employee-Management-.git)

## 💻 Installation & Lancement

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/MEHDI204/portfolio.git

# Accéder au dossier
cd portfolio

# Installer les dépendances
npm install
```

### Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build pour production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`

### Aperçu du build

```bash
npm run preview
```

## 🎨 Personnalisation

### Modifier les couleurs
Les couleurs principales sont définies dans `tailwind.config.js` et peuvent être ajustées selon vos préférences.

### Ajouter des projets
Modifiez le tableau `projects` dans `src/App.tsx` :

```tsx
const projects = [
  {
    title: "Nom du Projet",
    tech: ["Tech1", "Tech2"],
    description: "Description du projet",
    icon: <IconComponent className="w-6 h-6" />,
    color: "from-color-500 to-color-500",
    githubLink: "https://github.com/votre-repo"
  }
];
```

## 📱 Contact

- **Email** : elmehdinidkouchi@gmail.com
- **GitHub** : [@MEHDI204](https://github.com/MEHDI204)
- **LinkedIn** : [El Mehdi Nidkouchi](https://www.linkedin.com/in/el-mehdi-nidkouchi-556430226/)
- **Localisation** : Agadir, Maroc

## 🎓 À Propos

Étudiant en Licence ILTI (Ingénierie Logicielle et Technologies de l'Information) à l'Université Ibn Zohr d'Agadir, actuellement en Semestre 5 (S5). Passionné par le développement full-stack et l'architecture logicielle.

## 📄 Licence

Ce projet est open source et disponible sous la [Licence MIT](LICENSE).

## 🙏 Remerciements

- Design inspiré par les tendances modernes du web design
- Icônes fournies par [Lucide Icons](https://lucide.dev/)
- Framework CSS : [Tailwind CSS](https://tailwindcss.com/)

---

⭐ **Si ce projet vous plaît, n'hésitez pas à lui donner une étoile sur GitHub !**

💡 **Feedback et suggestions sont toujours les bienvenus !**

Développé avec ❤️ par El Mehdi Nidkouchi
