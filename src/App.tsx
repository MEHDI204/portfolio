import { useState, useEffect } from 'react';
import { Code2, Mail, Github, Linkedin, ChevronDown, ExternalLink, Cpu, Cloud } from 'lucide-react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "E-commerce Full Stack",
      tech: ["Laravel", "React.js", "Inertia.js", "Tailwind CSS"],
      description: "Application web monolithique moderne avec interface responsive et gestion dynamique du panier",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      githubLink: "https://github.com/MEHDI204/e-commerce-platform.git"
    },
    {
      title: "Station Météorologique",
      tech: ["C++", "OOP", "Design Patterns"],
      description: "Système avec pattern Observer pour mise à jour temps réel des conditions météo",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      githubLink: "https://github.com/MEHDI204/weather-station"
    },
    {
      title: "Système de Gestion",
      tech: ["MIPS Assembly", "MARS"],
      description: "Programme optimisé pour gestion d'employés avec algorithmes de tri et statistiques",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      githubLink: "https://github.com/MEHDI204/MIPS-Employee-Management-.git"
    }
  ];

  const skills = {
    "Développement Web": ["Laravel", "React.js", "Inertia.js", "Tailwind CSS", "PHP", "HTML5/CSS3"],
    "Programmation": ["C/C++", "Java", "Python", "SQL", "MIPS Assembly"],
    "Outils & DevOps": ["Git", "GitHub", "VS Code", "Linux"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated gradient orb */}
      <div
        className="fixed pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            EMN
          </div>
          <div className="flex gap-6">
            {['Accueil', 'Projets', 'Compétences', 'Contact'].map((item) => (
              <button
                key={item}
                className="hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-cyan-400/10 rounded-full animate-pulse"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl text-center z-10 space-y-8">
          <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-4 animate-bounce">
            Disponible pour des opportunités
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-300%">
              El Mehdi Nidkouchi
            </span>
          </h1>

          <p className="text-2xl text-slate-300 mb-8">
            Étudiant en Ingénierie Logicielle
          </p>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Passionné par le développement full-stack et l'architecture logicielle.
            Actuellement en S5 à l'Université Ibn Zohr, je transforme des idées en solutions numériques élégantes.
          </p>

          <div className="flex gap-4 justify-center pt-6">
            <a href="mailto:elmehdinidkouchi@gmail.com" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300">
              Me Contacter
            </a>
            <a href="#projets" className="px-8 py-3 border border-cyan-500/50 rounded-full font-semibold hover:bg-cyan-500/10 transition-all duration-300">
              Voir Projets
            </a>
          </div>

          <div className="flex gap-6 justify-center pt-8">
            <a href="https://github.com/MEHDI204" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 rounded-full hover:bg-slate-700 hover:scale-110 transition-all duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/el-mehdi-nidkouchi-556430226/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BN0HUFsl0Rpe4ecGCI5rd6w%3D%3D" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 rounded-full hover:bg-slate-700 hover:scale-110 transition-all duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:elmehdinidkouchi@gmail.com" className="p-3 bg-slate-800/50 rounded-full hover:bg-slate-700 hover:scale-110 transition-all duration-300">
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projets" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projets Récents
            </span>
          </h2>
          <p className="text-center text-slate-400 mb-16">Découvrez mes réalisations techniques</p>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {project.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-cyan-400 border border-slate-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 transition-transform"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Compétences
            </span>
          </h2>
          <p className="text-center text-slate-400 mb-16">Technologies et outils maîtrisés</p>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">{category}</h3>
                <div className="space-y-3">
                  {items.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-slate-300 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all duration-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Formation
            </span>
          </h2>

          <div className="relative border-l-2 border-cyan-500/30 pl-8 space-y-12">
            <div className="relative group">
              <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-4 border-slate-900 group-hover:scale-125 transition-transform duration-300" />

              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">Licence ILTI</h3>
                    <p className="text-slate-400">Université Ibn Zohr, Agadir</p>
                  </div>
                  <span className="px-4 py-1 bg-cyan-500/20 rounded-full text-cyan-400 text-sm">
                    2023 - Présent
                  </span>
                </div>
                <p className="text-slate-300 mb-3">Actuellement en Semestre 5 (S5)</p>
                <p className="text-slate-400 text-sm">
                  Modules: Développement Web, Bases de Données, Architecture Ordinateurs, Algorithmique, Structures de Données
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-slate-900 group-hover:scale-125 transition-transform duration-300" />

              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold">Baccalauréat Scientifique</h3>
                    <p className="text-slate-400">Lycée Almassira, AKKA-IGHAN</p>
                  </div>
                  <span className="px-4 py-1 bg-purple-500/20 rounded-full text-purple-400 text-sm">
                    2021
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Travaillons Ensemble
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Intéressé par une collaboration ? N'hésitez pas à me contacter
          </p>

          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              <a
                href="mailto:elmehdinidkouchi@gmail.com"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Envoyer un Email
              </a>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span>📍 Agadir, Maroc</span>
              <span>•</span>
              <span>📱 0767719105</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-400">
          <p>© 2024 El Mehdi Nidkouchi. Conçu avec passion.</p>
        </div>
      </footer>
    </div>
  );
}