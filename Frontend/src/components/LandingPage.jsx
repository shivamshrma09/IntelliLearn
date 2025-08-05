import React, { useState, useEffect } from "react";
import { FaRocket, FaAward } from "react-icons/fa";
import {
  MdLightbulb,
  MdCheckCircle,
  MdBarChart,
  MdBook,
  MdPeople,
  MdTrendingUp,
  MdStar,
  MdQuestionMark
} from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon
} from "lucide-react";


// Helper function for merging Tailwind classes
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Dummy style function for demonstration
const navigationMenuTriggerStyle = () => "";

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

// Floating Circles Component
const FloatingCircles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-accent/15 rounded-full animate-float-medium"></div>
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-primary/5 rounded-full animate-float-fast"></div>
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-accent/10 rounded-full animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-primary/8 rounded-full animate-float-medium transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-32 left-1/3 w-16 h-16 bg-accent/12 rounded-full animate-float-fast"></div>
      <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-primary/6 rounded-full animate-float-slow"></div>
    </div>
  );
};

const LandingPage = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Add custom CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes float-medium {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(-180deg); }
      }
      @keyframes float-fast {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-25px) rotate(360deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
      }
      @keyframes bounce-in {
        0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
        50% { transform: scale(1.05) rotate(5deg); }
        70% { transform: scale(0.9) rotate(-2deg); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
      .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
      .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
      .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      .animate-bounce-in { animation: bounce-in 0.8s ease-out; }
      .hover-lift { transition: transform 0.3s ease; }
      .hover-lift:hover { transform: translateY(-5px); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-background text-primary-foreground font-sans relative">
      <FloatingCircles />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold text-primary" >IL</div>
              <span className="text-2xl font-bold text-primary">IntelliLearn</span>
            </div>
            <nav className=" md:flex items-center space-x-8">
              <a href="#features" className="text-primary hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-primary hover:text-primary transition-colors">How It Works</a>
              <a href="#testimonials" className="text-primary hover:text-primary transition-colors">Testimonials</a>
              <a href="#pricing" className="text-primary hover:text-primary transition-colors">Pricing</a>
              <button
                className="px-4 py-2 rounded-lg text-primary bg-transparent border border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => onNavigate("login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition-colors duration-300 shadow-lg"
                onClick={() => onNavigate("signup")}
              >
                Get Started
              </button>
            </nav>
            <button
              className="md:hidden text-primary-foreground hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-secondary/95 z-40 flex flex-col items-center justify-center space-y-6 animate-fade-in-up">
          <a href="#features" className="text-2xl text-primary-foreground hover:text-primary transition-colors" onClick={toggleMobileMenu}>Features</a>
          <a href="#how-it-works" className="text-2xl text-primary-foreground hover:text-primary transition-colors" onClick={toggleMobileMenu}>How It Works</a>
          <a href="#testimonials" className="text-2xl text-primary-foreground hover:text-primary transition-colors" onClick={toggleMobileMenu}>Testimonials</a>
          <a href="#pricing" className="text-2xl text-primary-foreground hover:text-primary transition-colors" onClick={toggleMobileMenu}>Pricing</a>
          <button
            className="w-4/5 px-6 py-3 rounded-lg text-primary bg-transparent border border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg"
            onClick={() => { toggleMobileMenu(); onNavigate("login"); }}
          >
            Login
          </button>
          <button
            className="w-4/5 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition-colors duration-300 text-lg shadow-lg"
            onClick={() => { toggleMobileMenu(); onNavigate("signup"); }}
          >
            Get Started Free
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 text-center bg-gradient-to-br from-black to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full animate-float-slow"></div>
          <div className="absolute top-20 right-16 w-48 h-48 bg-accent/8 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-primary/10 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-32 right-1/4 w-56 h-56 bg-accent/6 rounded-full animate-float-slow"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl animate-fade-in-up relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-bounce-in">
            Master Your Exams with <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text animate-pulse-glow">AI-Powered Learning</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in-up">
            IntelliLearn is your personal AI tutor, providing adaptive lessons, instant feedback, and
            in-depth analytics to help you excel in any competitive exam.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-lg font-semibold hover:bg-primary/80 transition-all duration-300 shadow-xl transform hover:scale-105 animate-pulse-glow hover-lift"
              onClick={() => onNavigate("signup")}
            >
              Start Free Trial
            </button>
            <button
              className="px-8 py-3 rounded-full border border-muted-foreground text-muted-foreground text-lg font-semibold hover:border-primary hover:text-primary transition-all duration-300 transform hover:scale-105 hover-lift"
              onClick={() => onNavigate("login")}
            >
              Login Now
            </button>
          </div>
        </div>
      </section>
      {/* Hero Stats Section */}
      <div className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-primary-foreground animate-slide-in-right">
          <div className="flex flex-col items-center hover-lift bg-card/20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-4xl font-bold text-accent animate-bounce-in">100K+</h3>
            <p className="text-muted-foreground text-sm mt-1">Happy Students</p>
          </div>
          <div className="flex flex-col items-center hover-lift bg-card/20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-4xl font-bold text-accent animate-bounce-in">95%</h3>
            <p className="text-muted-foreground text-sm mt-1">Success Rate</p>
          </div>
          <div className="flex flex-col items-center hover-lift bg-card/20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-4xl font-bold text-accent animate-bounce-in">50+</h3>
            <p className="text-muted-foreground text-sm mt-1">Exams Covered</p>
          </div>
          <div className="flex flex-col items-center hover-lift bg-card/20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-4xl font-bold text-accent animate-bounce-in">24/7</h3>
            <p className="text-muted-foreground text-sm mt-1">AI Tutoring</p>
          </div>
        </div>
      </div>

      {/* "As Featured In" Section */}
      <section className="py-16 bg-card border-t border-border animate-fade-in-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-2xl mb-8  font-bold">Trusted by leading educators and students worldwide:</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {/* Replace with actual logos or more stylized placeholders */}
          
          <img src="data:image/png;base64,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" alt="" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAZHjzXL27UGOPu9byjZ1bgJY-KdikMBdINQ&s" alt="" />
          <img src="data:image/png;base64,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" alt="" />
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDxAPEA8QEBAQDw8QEBANDw8PDxAQFREWFhYVFxUYHSggGBolHBUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQYEBQcDAgj/xABHEAACAQICBAkHCQYFBQAAAAAAAQIDEQQFBhIhMQcTIkFRcYGRoTJSVGGSwdEUFyNCU3KTseEWQ2JzwtIzgqKjshU0Y+Lx/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAUGAQMEAgf/xAAyEQACAgECBQIEBQQDAQAAAAAAAQIDBAUREiExQVETYRUiMlIUcYGRoSMzQrEkQ2I0/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAIbAMTFZjSp+XUivVe77kaLcqmpfPJI02ZFdf1M0+J0pgv8Om5euT1URVuu1R+hNkfZq1a+lbmuraSV5btSHUrvxI+zXL5fTsjinqtr+nkYdTNq8t9WXY7fkcUtSyZdZnLLOvfWR4yxtZ/vantyNLy731mzX+Jtf+TCxdX7Wp7cviYWVcv8mPxFv3M9IZlXW6tP2m/wAzbHUMiPSbNizLl0kZVLSDER+upfeivcdVes5Mer3N0NTuj1e5n4bSp/vKXbB+5nfVryf9yP7HZDV1/nE2uEz2hU2a+q+ifJ8SUp1LHt5KX7nfVnU2dHsbOMkztTT6HWmmfRkyAAAAAAAAAAAAAAAAAAAAAQ2AavMc6pUbpvWl5sd/fzHDlajTRyb3fg4782qrq92VrHZ9Wq7E+Lj0Q39rK7k6vdbyjyRC36lbPkuSNW2RMpOXUj3JvqDB5JAAAAAAAAAAIG4MrB5jVpeRNpea9sTtx8++n6Xy8HXTmW1dGWLL9JYStGqtR+ctsP0LBi61XZ8ti2f8Evj6nCfKfJm+p1FJJppp7miZjJSW6JSLTW6PQyegAAAAAAAAAAAAAAAAeGKxMacXKckkuk8WWwqjxTeyPFlka48Uip5rpBOpeNK8IdP138CsZ2sSs+WrkvJA5WpSn8tfJGkZBt79SJb36gwYJAAAAAAAAAAAAAIAJAIAM3L8zq0XeLvHng9z+B3Ymfbjvk+Xg7MfMspfJ8i35Xm1OutmyS3xe/sLZiZ1eSuXXwWLGy4XLl1Nkdp1AAAAAAAAAAAAAAwcyzGFCOtJ7X5Meds5srLrxocU/wBjnyMiFMd5FJzHMKleWtN7OaK8lFOzM2zJlvJ8uyKzk5c7pc+ngxDiOU+gCACQAAAAAQASAAAAAAAAAAACac3FqUW01ua5j3XZKuXFF7M9wnKD4o9S3ZHniq2p1LKpzPcpfqWzT9Ujf8k+Uv8AZYcLPVvyz6m+JglAAAAAAAAAAAYOaZhGhBylv3RjztnNlZUMevjl+hz5F8aYcTKNjMVOrNzm7t9yXQik5WTO+fFIq+RkSuluzwOc5wAAAAACQAAACAAASAAAAAAAAAAQAEzKk090ZTae6Ldo/nPGJU6j5a3Pzl8S2aXqXqpV2fV58ljwc5WLhn1LATRKAAAAAAAA8MViI04SnJ2UVc8W2Rrg5y6I8WWRhFykULMsdKvUc5bt0V0IpGbmSybHJ9OyKplZLunv27GKcRykgEAEMJbmSjZtwk0KVWVOlRlWUXZz11CLa322O5P0aHOcFKUtt+xL1aTKUd5PYwfnUXob/GX9pu+AL7/4Nnwd/cPnVXob/GX9o+Af+/4Hwd/ePnUXob/GX9o+Af8Av+B8Hf3D51V6G/xv/Ux8AX3/AMD4O/uJhwpxur4SVr7fpl/aHoHL6/4MPR39x0WnNNJrc1ddRXrIOMnHwQ048LaPs8HkAAAAAAAAAAAARk0007NO6a3pnqE3B7o9Rm4vdF3yLNFWhZ/4kdkl0+sumnZqya+f1ItGFlK+HujbEidwAAAAIYBTdJcy4yfFRfIg9v8AFIq2sZ3qS9KD5Lr+ZXtTyuOXprojSECRBIAAABqtJsS6WDxNROzjRnZ9DasvzOzAgp3xT8nTiQ47or3Pz+Xst5AAAAAAPumrtLpaD6GH0P0dQjaMY9CS8D59e97JP3Kbc95tnqaTUAAAAAAAAAAAAAD3wGLlRqRnHm3rpXOjqxMmVFimjox73VYpIv8AhcRGpCM47pK6LzVbG2CnHoy2V2KyKkj3NhsAAANVn+O4mi7Ply5Mfezg1HK9Clvu+SOPNv8ASqbXUozKQ3u9yqN78yTBgAAAgArHCRW1ctrbfKdOHfNe5MldGjxZK9iR0yO+QvY4iXIs4AAAAABttGMG62Mw9JK+tVg392L1peCZpybFXVKT8Gq+ahVJ+x35Hz9vd7lNfU+jBgAAAAAAAAAAAAAAAsGimP1ZOjJ7JXcevnRYdFy9m6ZfoTel5H/W/wBC2lmJ0AEMAo2keM42u0nyafJXXzsp+r5Hq38K6R5FZ1K/1Ldl0RqyII0kAAEAAAovC3Wtg6UPPrp9kYv4ontBhvbKXsS+kR3sb9jkpaSwlk0ByynicdCnVgp01CpOUXezsrLxaOLULpU0OcepyZtsqqXKPU6h+xWXeiw75/Eq/wAWyvuID4jf9w/YrLvRIe1P4j4tlfcPiGR9w/YrLvRIe1P4j4tk/cZ+IX/cZeW6O4TDT4yhQhTna2srt2e/ezVdqF9seGcuRrty7rI8MnyNqcRyEgAAAAAAAAAAAAAAAH1RquEozWxxaaNtVrrmprsbKpuE1JdjoeDxCqU4zW6STL7Rara1Ndy302KyCkj3ubTaYeaYniqM586i7db2I0ZVvpUyn4RoyLPTqcjnzZQJScnuynye73BgwSAAAAQAcy4YK3KwtPoVWb7dVL8mWfQY/LORPaOvlkznBYCaL7wRYe+Kr1PMoKPbKa/tZDa5PhoS8si9WltUl5OroqJWyQAAACACQAAAAAAAAAAAAAAACAC1aIYm8JUn9R3XU/1LVoV/FW632LDpV3FBwfYsZOksVzTDEWhCn50m31L/AOkHrlvDUoeSK1azatR8lVKoV0kAAAAgAAHIeFirfHQj5mHgu+Un70XDRI7Y+/lll0qO1O/llIJckzqXA/QtSxVXzqlOC/yxbf8AyRXdfnyhEg9Yl9KOhlaIMkAAAAAAAAAAAAAAEAEgAAAAAgA2ejlfUxEeid4vt3EppN3p5C9+R36dZwXJeS8WLoWjcpulVXWxGr5kEu17X7ipa5ZxXqPhFc1We9vD4NOQhFgAAAAAEMA4fwh1tfMsQ731XCHdCKfjcvGmR4cWBbMCPDRErR3nYdj4K6Grl+t9pWqS7FaPuKprst7kvCK5q0t7UvCLmQZFAAgAAEgHnOrGLim0nJtRXS0m7dyZ7jXKSbXY9qLabR9ng8EgAAAHlOrGLim0nKWrG/O7N27k+49xrlJNrse1FyTa7HojweCQAAAAAAD6oT1Zxl5sk+5m2mfBZGXubKpcM1LwX35bHpLt+LgWn14lMzmetiKr/ja7thUtSlxZMyu50t7pGGcJyAAAAAgABdTKPz7pFW18XiZ+dXqvs1mfQcaPDTFeyLjjx4aor2NYbjcW7I9O6+EoQw8KNGUYa22evrO7b22frI3K0urInxyb3ODIwIXT4pMz/nRxX2FD/c+Jz/A6PLNHwiryx86OK+wof7nxHwKjyzPwivyyyaEaZVcdWqUqtKENWnrxdPW85Jp3frI/UdLhj1ccGcWdgQpr4osuhBESAChcJOczw1bAunvp1JVmulKys/U05IsWjY8bK7N+/ImtMpU6579+ReMHiI1acKsHeM4RnF+pq5BXVuubg+xE21uE3F9j2NRrABDAOf6VaQ6ubYKhF8ijVhxm3Zr1OS79UZeJZNPw/wDiTk+sl/onMPG/485Pui/lbZCMkGCQAAAAAQxuD3+Vz6WdH4qzyb/Xl5GPd61X+ZP/AJMzlve+b9xkve2X5nicxoAAAAAAPLET1YSl5sZPuRsqjvNL3Pda3kkfnKrNuTb3ttvtZ9CitlsXRLZbHmZMgAAEoAv3BDRvicRPmjRUe2U0/wCkhtcntQl5ZFatLapL3OrFRK4GAcc4UsTr5hq3/wAKjCNuhu8v6kXLRq+HGT8stGmQ4aE/JauCvN+Nw0sNJ8qhK8eni5O/g795Ga5jcM1au/U4NWo4ZKxdy8kAQxIBjZhio0aVSrN8mnCUn2I20VO2xQXc21Vuc1FH5+xmNnVrTryfLnUdRv1t3L/CuMK1BdEi4QrUYKCP0Hgq6qUqdRfXhCftRT95QciHDbKPuVC6PDNo9zSaQAAAAAAAAD1xq+lqfzJ/8mdGUtrpfmb8j+7L8zyOc0AAAAAAGr0mramCxUr2aoVLdbi0jrwI8WRBe504keK6K9z8+l8LeTYAnVfQwY3RGq+gGdyVF9DBjc6vwTZe4YerXkrcdUUY354QTV+9vuKzrtycowXYgtXtTaiuxfCvEKGEEcB0rxXG47E1OmtNL7sXqrwRf8OHBRBexccWHBTFex76G5v8kxlKo3aEnxdXo1JbLvqdn2HnNx1fTKPfsYyqfVqcTu0WUOUeF7MqDWzJMGCh8K2a8Xh4YaL5VZ60/uR+Lt3E/oePxTdr7EzpVO8nN9jk5aCfO7aC4njcuw0ueNPi3/kbj+SRStWr4MmXvzKrqMOG9+5viNOEkAAAAAAAAGVmkbV6q/jk+93OzUI8OTNe51ZkdrpGKcZygAAAAgArPCNX1Mtr2e2WpDvmr+FyV0eO+SiQ02O96OIlyLQbbRTD8ZjsLDpr02+pSu/BGjKnwUyl7GnIlw1Sfsd4WFp/Zw9mJRHfZ9z/AHKk7Z+WT8lp/Zw9mI9e37n+5j1Z+WPk1P7OHsxHr2/c/wBzPqz8s+4QS2JJLoW41yk5Pdmtyb6n0zBg8MwrqnSqVG7KFOc32RbNtEOO2MV5RtpjxTivc/OlSd22+dt97PoK5LYuSWy2PkyZO4aA5t8qwNNyd6lL6KpffeK2PtVvEpmr4/pXtro+ZV9Ro9O1tdHzLG2RaW5wJbnCdNM2+VY2tUTvCL4un0akdl11u77S+YGP6FEY9+5bsOn0qkjRHYdJ1vglxOthKlO/+HWbXqU4r3plW16G1kZeUV/V4fPGReSAIckAAAAAAAar6DPC/BnhZs9JaeriZfxKMvC3uJXWYcOS35JDUocN2/k1hEkcAAAACACj8LNa2Cpw8+vG/VGLfwJ3QYb3Sl4RL6RH+o37HIy1FhLVwaUNfMqT5oQqzfsNLxaODVJ8ONL3OLPlw0SO1FHKoSAAAAQAV/TzFcVl2JfPKCpr/O0n4NklpVfHkx9uZ26fDjvj7HCi6lrABdODDN+JxfEyf0eIWp6lUW2L/NdpF6vjerRxLqjg1Gj1Kt11R0HTnNfkuBqzTtOp9FT6daW9rqVyvaXj+tet+i5shcCn1Ll4XM4WXUtJAB0HghxVq+Io+fSjNdcJW/qIPXa+KmMvDInVob1KXg6oVQrpIAAAAAJiruy53Y9QjxSSPUFvJItn/RoFp+HR8Fg/BxMXTChtp1OuL/Ne806/VyjZ+hp1evpMrhWiDAAAABABzXhhr/8AaU/5s3/pS95ZtAhynIntHjylI5qWEmi98EdC+KrVPMoW7ZTX9rIbW57UJeWReqy2qS8nWSolbJAAAAIAKfwiw42OEwl2vlGKhF236qW1+KJvRfllOx9kS2lpRlKb7I5LmeDlQrVKMvKpzlB+uz3lprmrIqS6MsEJqcVJGIez0etCtKEozi7Si1KLW9NO6DSa2ZhpNbM6Q8Ss6xeHp/uaGG42sttuOkrW9e3VXeQ0a44EJS7t8vyIuMFhwlLu3y/I5tWg4ylFqzjJproaZMJ7rclE90eZkyWfg6xPF5jQ22U9em/XrQdl3pHFqVfHjSRyZ0OKiR25FFKlsSAAAAADNyajr4inHolrPs2nbp1XqZEV77/sdmDXx3JF9sXstXCa7SHC8ZQmlvjyl2focGpUetjyXdczlzqvUpa8FFKMVRgGCQAAQAci4Wat8bTj5uHj3ucn8C36JHbH38ssulR2p38so5MEmdP4H6HIxVTplSguxSb/ADRXtelyhEhNYlyijoxWSCJAABAAYBUc2lxud4Kl9WhQq1n1yTS/KJOYv9PAsn5exLY/yYc5eSt8LGUatSnjIrZUXF1PvpclvrWzsO/RMnjg6n26HXpN/FF1vsc9JwlwAdj4Mcp4jB8dJWniHr+vi1sivzfaVXWsnjtVa6Iruq3cViguiOZaWYfi8diof+abXVJ6y8GWLDnx0QfsTeNLiqi/Y1B0G8zcpxPFV6NTzKtOXdJM8Wx4q5L2PFkeKDR+h072Pns1tJopsls9iTyeCQAAACx6IYa8p1Xzchfm/cWLQqOcrX+SJvSaus/0LQWXcm9mJK6MNbrYy1ujn2aYTiq04c17x+69xRs/H9G9x7dip5lPp2NGKcRyAAAEMA4jwi1tfMq/8PFwXZBfqXjS48OLEtenx2oiVk7ztOp8GmYYahg5KriKNOc605as6kIySUYpb36mV3WaLbbFwRbSRB6pVZZYuFbot37Q4L0vD/jU/iQv4DJ+xkb+Eu+xj9ocF6Xh/wAan8TP4DI+xmPwl32MftDgvTMP+NT+Jj8Bk/Yx+Eu+xmfh8RCpFTpzjOL3ShJSi9ttjRz2VyrlwyWzNM4Sg9pLY9GeDwU3JHxud46rzUaNOiut2v4xZO5K9PT4R8vcl7/kworyzfaR5WsVhqtB75x5L6JrbF95HYOR6N0ZfucOJc6rVJHA61Jxk4yVpRbTT3pp2Ze001ui3JprdGXkeXSxOJpUI76k0m+iO+T7Ema77VVXKb7Hm2xQg5PsfoGhRjCMYRVoxioxS3JJWRQLbHZNyfcptk3Obl5OO8KGF1MwlL7WlTn4av8ASW/R7OLGXsWXTJ8VC9ioEoSBKYB+g9HMVx2Ew9XnlRp3+8opPxRRM+vgyJIqGXDgukjYnGcxIBAARlc+RlLd7F/ybCcVRjDntd9b2l7waPRojHv3LdiU+lUomcdh1EmDBXtKsBrQVWK5UNj9cWQus4nqV+pHqv8ARFanj8cONdUVIqRXAASAQwgcA0nr8ZjcVPpr1LdSlZeCPoGLHhpgvYuWPHhqivY1RvNxAAAAAAO08GN/+m0/5lW3VrlP1v8A+n9Ctaqv65a5y2bSKgt5JEdFbvYpfBt9J8uxX2+Ke/fZXl/WTmsPhhXX4RK6n8sYQ8IutiBIhM49wm5PxGL46K5GITl1VF5S7d/aXLSMn1aeF9Ylo02/1Ktn1RteCXKdtXGSW76Gn1vbN91kc2uZG0VUu/NnPq1/DFVrudMKsV85nww4flYWrbfGpBvqaaXiyz6DPeMok/o8vllE5sWAmQAdp4McVr5dCPPSqVKb79ZeEio63Xw5HF5RWtVhtdv5RbCGIwkAgA22jeB42spNcmntf3uZEtpOJ61vE+iJLTsf1LOJ9EXdFxLMSAAD4qQTTT3NWZiSUlszEkmtmUHN8C6NVx+q9sH0opGoYjx7Wuz6FUzMZ02NduxhnAcYAPipK0W+hNnqtbySPUFvJH5xxE3KcpPe5Sb7WfRILaKRdYrZI8zJkAEAAAkA7roHhuKy3DRe+VN1Pbk5LwZS9Ws48mXtyKtqM+K9+xm6R4nisHiKnPGjUa69VpeLObBhx3wj7mjFjxWxXuafgzoauXUnby51Z/6mvcd2tz3yNvCOvVJb3beEWshyMK9pxk3yvBzhFXq0/pKXS5Leu1X8CS0vK9C5N9HyZ3YGR6NnPo+pnaO5YsLhaNBWvCC12ueb2yffc1Z+R61zl27GvMu9W1yNkcRylL4VsNrYGM1+7rRb+604/m0TmhT2ucfKJXSZ7WuPlHHi1ljJAOm8D+K5OKovmdOqu28X+USva9XyhP8AQhdYhyjI6OVkgSQCacHJqMVdt2S9Z7hXKclGPVnuEXOSiu5fcowKo0ow598n0yLzg4qx6lHv3LZi0KmtRM86zpAAAABrc5y9V6bjuktsX0M487EWRVw9+xy5eMrobdyi1abjJxkrNOzTKPZXKuTjLqiqTrcJOMup8ng8ENGYvZ7mU9mc2zLgylKrOVHEU405SbjGcJXjfmut5Z6tcgopSi9yeq1aCilJPcxfmtxHpNH2Zmz47T9rPfxerwx81tf0mj7Mx8dp+1mfi1Xhj5ra/pNH2Jj47T9rHxarwx81tf0mj7NQfHaftZj4vV4Z90uC2trLWxNPVutbVjK9ue1zzLXqtuUWYer17ckzptCkoRjCKtGMVGK6ElZFZtsc5uT7kDZJzm5PuanTDAVcTgq1Gik5z1LJu10pptX6kdem3QpvU59DowrIVXKU+hl5BgXh8LQoO16dOMZW3a1ttu25qzblddKa6HjKtVlsprozPOU5wAACQDV6R5Z8qwtXDpqLqJWk72TUk0/A68HIWPcps6cW70bFM5981tf0mj7Myw/HaftZNfF6vDHzW1/SaPsTHx2n7WY+L1eGb/Q3Q6tgK8qsq0KkZUnBqKknfWTT29Rw6hqdWRVwxT3OTNz67q+FJ7l1IEiAAWjRjKrfTTW1+QnzLpLPo+Bwr1prn2J/TcPh/qSXPsWYsBMgAAAAAAA0OkGT8auMguWltXnL4kPqmnK+PHD6l/JGZ+F6q4o9UU9lRlFxezK4009mDB5AAQG4AAAAAAAAAAJAAAAABAAAAAAABu9H8n4xqrUXIT2LzmvcTml6c7X6li5L+SWwMF2Pjl0LlFFr/IsKWxIMgAAAAAAAAGgz3I1UvUpq1TnXNL9SG1LTFcvUr+r/AGRedgKxcUepUZRabTTTWxp70VScXB8LWzK7ODi9mDweQAAAAAAAAAAAAAAAAAAAAAAQDJu8jyR1GqlRWp8yexy/QnNN0t2P1LFy/wBkrhYDn80+hb6dNRSSVktyRaoxUVsiwxiorZHoZMgAAAAAAAAAAAGqzfJoV1fyZ80lz+pkdm6dXkLfpLycWVhQuW/RlOxuCqUZas426H9V9pU8nEsx5bTX6lcvxp1PaSPA5TnAAAAAAAAAAAAAAAABABIBMIOTUYptvcke4Vym9ordnuMJSe0VzLPk+jqVp1tr5ocy6yyYOjqO07uvgnMPTVH5rP2LJGNifSS5EwlsSZMgAAAAAAAAAAAAAAHhicPGpFxnFST5ma7aoWx4ZrdGudcZraSK1mWjLV5UXdeZLf2Mr+Xon+VL/QhsjS39Vb/Q0FWlKDtOLi+iWwgbap1vaa2ZETqlB7SWx8mo1gAAAAAAAAAAAAAhIylvyRlRb6G2y/IKtWzktSPTLyn1IlcXSLrecvlXuSOPptlnOXJFpy/K6dFWhHbzye2T7SzY2FVjr5Vz8k7Ri10raK/UzzrOkAAAAAAAAAAAAAAAAAAAAAx8ThIVFacFJetGq2iu1bTW5rsqhYtpI0mM0Xg9tKTh6pcpfEh8jQ65c63sRl2lQl9D2NPicixEPqay6YO/gRFuk5Ffbf8AIjrNOuh0W5gVaMobJRlH7yaOGdM4fUmjjlVOP1I8zUayQAAABGLbsk31K56jCUnskelCT6IzaGUV57qbXrlyUdlenZFnSDOmvCun0ibbCaLN7atS3qh8WSlGhPrbL9ESFWk/ezd4PKqNLyIK/S9r7yZowaKfpjz8kpTiV1fSjPsdh0gAAAAAAAAAAAAAAAAAAAAAAAEAAGCAwYeYeS+pnHlfScuR9JRsZ5b6ymZP9xlYv+o8TnNIACMx6mUW/I/ILVpv0lhw/pN4txOEquhKAAMkgAAAAAAAAAAAAH//2Q==" alt="" />
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBg4SEA0PDxMQEhEQEBESDRUQFQ8QFxIWFhYTFRUYHSgsGBolJxYTITEjMSkrLi4uFx8zODM4NzAtLisBCgoKDg0OGhAQGDcmHyUtKy0tLysrLS0tMC0tLSsrLSsvLS03LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQcCBAYFA//EAD8QAQABAgMDCAcECAcAAAAAAAABAgMEBREGITESFkFRUmGT0hUiVHGBkZITcqGxFCMyM1NiwdEHNEKCorLw/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAEFAwQGAv/EACwRAQACAQIEBQMEAwAAAAAAAAABAgMEERIVMVEFITJBUhMUYSKRobFxgcH/2gAMAwEAAhEDEQA/ALxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGpuGoGqA1A1A1A1A1A1A1A1A1A1A1A1SGoGoJAAAAAAAAAABo53j/AEZld29yeV9nGunXPCI+cwyYcc5bxSPdjy5OCk2V5O32Kmf2bEd32dXmX9fCMO3WVTPiGT2Rz9xfZseHPmeuUYe8o5hkTz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMhz9xfZseHPmOUYe8nMMiOfuL7Njw58xyjD3k5hkOfuL7Njw58yOUYe8pjX5HdbLZvOdZXF2aYpqiqaK4jhyo6Y7t8KTVaf6GSabrPT5vq04nsNZnAAAAAAAAAAeXtPh/wBK2fxNPTNuqY99PrR+TPpb8Gas/lh1FeLHMKY4uzjps5yeoIAAAAAAAAAAAAAA91sbAYf7DZq3P8Squ586tI/CIcn4jfi1E/jyX+irw4odG0W2AAAAAAAAAAxuU8qiYnhO6fcb7eaJjdR+Z4ScBmF61Mfu66qY92u6fjGjs9NkjJjraOzmstJpaa/lrM7GAAAAAAAAAAAAAyt0TduRTTGtVUxTTHXM7oh5yXileKekPVa8UxXuvDLcNGCwNq3HC3RTRHwjRxN7cdpt+XS468NYhsvL2AAAAAAAAAAirgEq5/xIyv7LF0YimN1zS3c7q4j1Zn3xGnwX3hGojhnFPt5wqPEMW08ce7i14rAAAAAAAAAAAABI6bYLK/07OYuVR6ljSue+5/oj85+Cp8V1EUx8EdZb2hw8d959lqUuaXiQAAAAAAAAAAAaWb5dRmeXXLVfCuN09mrjTVHfE6SyYck47xarHlxxek1lTOYYKvL8ZXauRpVROk9Ux0THdPF2ODNXLji1ejncmOaWms9WuysYAAAAAAAAAAkZ2bVV+9TTRTNVVUxTTEcZmZ0iHjJeKV4p6PVK72295XFszk8ZNlVNvdNU+tcq7VcxGvwjdHwcfqc85sk2/Z0OnxRjpt7vWa7OAAAAAAAAAAAAieAOa2x2djOMPy7cRF63Hqzwi5T2Jn8p6G9odZOC+0+lp6rT/VrvHVVly3Nq5NNVM01UzMVRMaTExxiYdVS0WrFo6So7RMTtLF6eQAAAAAAAABEzt16JiPNZGxGzX6BTF+/T+tqj1KZj91TPTP8ANP4a6OZ8R131bcFOn9rnR6Xgjjt1dlTwViwSAAAAAAAAAAAAACJg8zZzW1Oy1GcU8uiYt3ojdVpur6or/u3dJrraeeGfTLU1OljLG8dVZ4/A3MvxE0XaJoqjonpjriemHT4dRTLXirKlyYrY52s1mdjEIAAAAAEpfXDYerFX6aLdE11VboppjWZYsmWmON7S9UpN52hY2yeyMZdVF2/pXd4008abX96u/o6Otzet8RnNPBT0rjS6SMf6rdXXRG5Wt7ZkJAAAAAAAAAAAAAAARoI2aeZZZbzPD8i9bprjo1jfTPXTPRLJiy3xTvWXjJjreNrQ4bONgK7UzVhrkXI/h1zyao7oq4T+C50/i0dMsf7hW5fD5jzo5PGYC7ga9Ltmu3P81MxE+6eErbFqceT023V98VqeqGsz7sYRMT0TtMdYCZiOpETPQN4P8vthcLXi7nJt267k9VNM1flwYsmemP1Ts9Vpa3SHUZTsJexOk364sU9mJ5dc/wBI+c+5VajxakeWON5b2Lw+1vW7zKMls5Ra0s24p1/aqnfVV76lLlz3yzveVniwUxxtWHoaMDMlIAAAAAAAAAAAAAAAAAAxmNUDGu3FdGk0xVE8YmNYTEzDzMRPWHlYnZjCYqZ5WEtx30RNuf8Ajo2KavNT02lhtpsVutWjXsLg6p3UXafdeqn89WxzTUd/4YuX4eyKdhMJE76bs++9P9Dmmo7/AMHL8PZu4bZTB4aY0wlFX35m5/2mWG+tz363ZK6XFXpV61qxTZo0oopoiOEU0xTHyhqzabdWeKxHSGemiPNOzJKQAAAAAAAAAAAAAAAAAAAADUETOkcREzDRv5xh7FWleKsUz1TepiflqnZgvqsNPVaP3RZzrD36tKcVYqnqi9TM/LU2RTV4beUWj92/TVrG6dUNiJiU6iQAAAAAAAAAAAAAAAAAAAAAETIjdzW0W1dGV1TbtxF271a+rR96evuSqtb4nTB5RG8/04PMc5v5lVP2t2qY7MTyaY/2wOcz63Nmn9U/8aGmiGpv+TTUTvMt3AZpey6vW1eqp/l11pn30zuGxh1eXFP6Jdzs7tfTmFdNu9EW7k7qZ19W5PVGvCe5Lo9F4rXL+m8bS6qJ1Qt0iQAAAAAAAAAAAAAAAAAAAHMbZZ76Lw32duf1tzXSf4dHTV7+pKp8T1v0K8Fes/wraZ1mZmdZnfM9c9aHJWtNp3lA8gAAAmJ2lYexGfzjrU2btWtyiNaKpnfco7++P/dKXVeFa76sfTv1j3dchdAAAAAAAAAAAAAAAAAAAMap0hLzM7ean88x85lmt65M6xNUxR3URup/Df8AFDiNbmnLmtb2aA0wAAAAGzl+MnL8dbu08bdUVadcdMfGNRn02acN4v2lclu5F23FUTrFURMe6YS7ytuKN494fRD0AAAAAAAAAAAAAAAAAA1sfFVWCuxR+1NFUU/e5O5LFliZpO3XZU8ZDiYj/KXvoHFz4fqPhKfQWJ9kvfQg+w1Hwk9BYn2S99AfYaj4SegsT7Je+gPsNR8JPQWJ9kvfQH2Go+EnoLE+yXvoD7DUfCT0FifZL30B9hqPhJ6BxXsl76BP2Go+ErPyO3XayjD03I0rptUU1RM74mIiN6XYaWtq4qxbrs9GOCGxAAAAAAAAAAAAAAAAAACNANBGxoGxoGxoGxoGxoGxoGxoJNASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z" alt="" />

          </div>
        </div>
      </section>
      {/* Problem/Solution Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-primary">
              Solving <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Your Biggest Study Challenges</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Traditional learning methods often fall short. IntelliLearn fills the gaps, ensuring a
              smarter, more effective path to success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="bg-card p-6 rounded-lg shadow-xl border border-border animate-scale-in">
              <MdLightbulb className="text-primary mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">Feeling Overwhelmed by Vast Syllabi?</h3>
              <p className="text-muted-foreground">
                Textbooks are dense, and knowing where to start can be daunting. You waste precious time trying to
                figure out what's important.
              </p>
            </div>
            {/* Solution 1 */}
            <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-lg shadow-xl text-primary-foreground animate-scale-in delay-100">
              <MdCheckCircle className="text-white mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">AI-Driven Personalized Learning Paths</h3>
              <p className="text-white/90">
                IntelliLearn's AI intelligently analyzes your weaknesses and creates a tailored study plan,
                guiding you efficiently through complex topics.
              </p>
            </div>
            {/* Problem 2 */}
            <div className="bg-card p-6 rounded-lg shadow-xl border border-border animate-scale-in delay-200">
              <MdLightbulb className="text-primary mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">Stuck on Concepts, No One to Ask?</h3>
              <p className="text-muted-foreground">
                When you hit a roadblock outside of class hours, getting immediate, clear explanations is
                almost impossible.
              </p>
            </div>
            {/* Solution 2 */}
            <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-lg shadow-xl text-primary-foreground animate-scale-in delay-300">
              <MdCheckCircle className="text-white mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Instant AI-Powered Tutoring</h3>
              <p className="text-white/90">
                Get instant, step-by-step explanations for any question or concept, available 24/7.
                Never be stuck again.
              </p>
            </div>
            {/* Problem 3 */}
            <div className="bg-card p-6 rounded-lg shadow-xl border border-border animate-scale-in delay-400">
              <MdLightbulb className="text-primary mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">Guessing Your Exam Readiness?</h3>
              <p className="text-muted-foreground">
                Mock tests help, but often lack deep insights into <i>why</i> you made errors or how to improve
                strategically.
              </p>
            </div>
            {/* Solution 3 */}
            <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-lg shadow-xl text-primary-foreground animate-scale-in delay-500">
              <MdTrendingUp className="text-white mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Predictive Performance Analytics</h3>
              <p className="text-white/90">
                Our platform provides detailed reports, predicting your exam scores and highlighting
                exact areas for improvement, ensuring targeted practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-primary">
              Discover Powerful <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">IntelliLearn Features</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Harness the power of AI to transform your learning experience and achieve your academic goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-background p-6 rounded-lg shadow-lg border border-border flex flex-col items-center text-center animate-scale-in hover-lift transition-all duration-300 hover:shadow-2xl hover:border-primary/50">
              <div className="p-4 bg-primary/20 rounded-full mb-4 animate-pulse-glow">
                <MdBarChart className="text-primary" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">Adaptive AI Tutoring</h3>
              <p className="text-muted-foreground text-sm">
                Our intelligent AI tutor personalizes your learning path, adapting to your pace and
                understanding, ensuring efficient learning.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-background p-6 rounded-lg shadow-lg border border-border flex flex-col items-center text-center animate-scale-in delay-100 hover-lift transition-all duration-300 hover:shadow-2xl hover:border-primary/50">
              <div className="p-4 bg-primary/20 rounded-full mb-4 animate-pulse-glow">
                <MdBook className="text-primary" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">Comprehensive Practice</h3>
              <p className="text-muted-foreground text-sm">
                Access a vast library of practice questions and mock tests, all curated to match your
                exam syllabus and difficulty.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-background p-6 rounded-lg shadow-lg border border-border flex flex-col items-center text-center animate-scale-in delay-200 hover-lift transition-all duration-300 hover:shadow-2xl hover:border-primary/50">
              <div className="p-4 bg-primary/20 rounded-full mb-4 animate-pulse-glow">
                <MdPeople className="text-primary" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">Real-time Performance</h3>
              <p className="text-muted-foreground text-sm">
                Get instant feedback and detailed analytics on your progress, identifying strengths and
                areas needing more attention.
              </p>
            </div>
            {/* Feature Card 4 */}
            <div className="bg-background p-6 rounded-lg shadow-lg border border-border flex flex-col items-center text-center animate-scale-in delay-300 hover-lift transition-all duration-300 hover:shadow-2xl hover:border-primary/50">
              <div className="p-4 bg-primary/20 rounded-full mb-4 animate-pulse-glow">
                <FaAward className="text-primary" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">Concept Clarity Boost</h3>
              <p className="text-muted-foreground text-sm">
                AI-powered explanations break down complex topics into easy-to-understand modules,
                ensuring fundamental understanding.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-primary">
              Your Path to Success in <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">3 Simple Steps</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with IntelliLearn is easy. Follow these steps to unlock your full academic potential.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center animate-fade-in-up delay-100 hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground mb-4 shadow-lg animate-pulse-glow hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary-foreground">Sign Up & Set Goals</h3>
              <p className="text-muted-foreground">
                Create your free account and tell us which exams or subjects you're preparing for.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center animate-fade-in-up delay-200 hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground mb-4 shadow-lg animate-pulse-glow hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary-foreground">Learn with AI Tutor</h3>
              <p className="text-muted-foreground">
                Engage with personalized lessons, practice questions, and get instant doubt resolution.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center animate-fade-in-up delay-300 hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground mb-4 shadow-lg animate-pulse-glow hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary-foreground">Track & Achieve</h3>
              <p className="text-muted-foreground">
                Monitor your progress with detailed analytics and achieve your target scores with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-primary">
              What Our Students <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Are Saying</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from thousands of students who achieved their academic dreams with IntelliLearn.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div className="bg-background p-6 rounded-lg shadow-lg border border-border flex flex-col justify-between animate-scale-in hover-lift transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-semibold animate-pulse-glow">JS</div>
                  <div>
                    <p className="font-bold text-primary-foreground">John Smith</p>
                    <p className="text-sm text-muted-foreground">JEE Aspirant</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "IntelliLearn transformed my JEE preparation. The AI tutor explained complex physics concepts better than any textbook. I saw a significant jump in my scores!"
                </p>
              </div>
              <div className="flex text-yellow-500">
                <MdStar size={18} /><MdStar size={18} /><MdStar size={18} /><MdStar size={18} /><MdStar size={18} />
              </div>
            </div>
            {/* Testimonial Card 2 */}
            <div className="bg-background p-6 rounded-lg shadow-lg border border-border flex flex-col justify-between animate-scale-in delay-100 hover-lift transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-semibold animate-pulse-glow">AS</div>
                  <div>
                    <p className="font-bold text-primary-foreground">Ananya Sharma</p>
                    <p className="text-sm text-muted-foreground">NEET Student</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "The adaptive practice questions are a game-changer. IntelliLearn identified my weak areas in Biology and helped me master them. Highly recommend!"
                </p>
              </div>
              <div className="flex text-yellow-500">
                <MdStar size={18} /><MdStar size={18} /><MdStar size={18} /><MdStar size={18} /><MdStar size={18} />
              </div>
            </div>
            {/* Testimonial Card 3 */}
            <div className="bg-background p-6 rounded-lg shadow-lg border border-border flex flex-col justify-between animate-scale-in delay-200 hover-lift transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-semibold animate-pulse-glow">RK</div>
                  <div>
                    <p className="font-bold text-primary-foreground">Rahul Kumar</p>
                    <p className="text-sm text-muted-foreground">CAT Aspirant</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "The detailed performance analytics are incredible. I could see exactly where I was losing marks and the AI suggested the right modules to improve. My scores have skyrocketed!"
                </p>
              </div>
              <div className="flex text-yellow-500">
                <MdStar size={18} /><MdStar size={18} /><MdStar size={18} /><MdStar size={18} /><MdStar size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-primary">
              Flexible Plans for <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Every Student</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your study needs and unlock unlimited access to IntelliLearn's
              powerful AI tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-card p-8 rounded-lg shadow-xl border border-border flex flex-col items-center text-center animate-scale-in">
              <h3 className="text-2xl font-bold mb-4 text-primary-foreground">Basic</h3>
              <p className="text-5xl font-extrabold text-primary mb-6">$99<span className="text-xl font-medium text-muted-foreground">/year</span></p>
              <ul className="text-left space-y-3 mb-8 text-muted-foreground">
                <li className="flex items-center"><MdCheckCircle className="text-primary mr-2" size={20} /> Access to core AI tutor</li>
                <li className="flex items-center"><MdCheckCircle className="text-primary mr-2" size={20} /> Limited practice questions</li>
                <li className="flex items-center"><MdCheckCircle className="text-primary mr-2" size={20} /> Basic performance reports</li>
                <li className="flex items-center"><MdCheckCircle className="text-primary mr-2" size={20} /> Email support</li>
              </ul>
              <button
                className="w-full px-6 py-3 rounded-lg text-primary bg-transparent border border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold"
                onClick={() => onNavigate("signup")}
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan (Popular) */}
            <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-lg shadow-xl flex flex-col items-center text-center relative overflow-hidden animate-scale-in delay-100">
              <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">Most Popular</span>
              <h3 className="text-2xl font-bold mb-4 text-white">Pro</h3>
              <p className="text-5xl font-extrabold text-white mb-6">$199<span className="text-xl font-medium text-white/80">/year</span></p>
              <ul className="text-left space-y-3 mb-8 text-white">
                <li className="flex items-center"><MdCheckCircle className="text-white mr-2" size={20} /> Unlimited AI tutoring</li>
                <li className="flex items-center"><MdCheckCircle className="text-white mr-2" size={20} /> Full practice question library</li>
                <li className="flex items-center"><MdCheckCircle className="text-white mr-2" size={20} /> Advanced performance analytics</li>
                <li className="flex items-center"><MdCheckCircle className="text-white mr-2" size={20} /> Priority chat support</li>
                <li className="flex items-center"><MdCheckCircle className="text-white mr-2" size={20} /> Access to premium content</li>
              </ul>
              <button
                className="w-full px-6 py-3 rounded-lg bg-white text-primary hover:bg-white/90 transition-colors duration-300 font-semibold shadow-lg"
                onClick={() => onNavigate("signup")}
              >
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-card p-8 rounded-lg shadow-xl border border-border flex flex-col items-center text-center animate-scale-in delay-200">
              <h3 className="text-2xl font-bold mb-4 text-primary-foreground">Premium</h3>
              <p className="text-5xl font-extrabold text-primary mb-6">$299<span className="text-xl font-medium text-muted-foreground">/year</span></p>
              <ul className="text-left space-y-3 mb-8 text-muted-foreground">
                <li className="flex items-center"><MdCheckCircle className="text-primary mr-2" size={20} /> All Pro features</li>
                <li className="flex items-center"><MdCheckCircle className="text-primary mr-2" size={20} /> Dedicated personal learning coach</li>
                <li className="flex items-center"><MdCheckCircle className="text-primary mr-2" size={20} /> Exclusive webinars & workshops</li>
                <li className="flex items-center"><MdCheckCircle className="text-primary mr-2" size={20} /> Early access to new features</li>
              </ul>
              <button
                className="w-full px-6 py-3 rounded-lg text-primary bg-transparent border border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold"
                onClick={() => onNavigate("signup")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-primary">
              Frequently Asked <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to the most common questions about IntelliLearn.
            </p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-background p-5 rounded-lg border border-border shadow-md transition-all duration-300 open:bg-secondary animate-fade-in-up">
              <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-primary-blue hover:text-primary transition-colors text-primary" >
                How does IntelliLearn's AI tutor work?
                <MdQuestionMark size={24} className="text-primary" />
              </summary>
              <p className="pt-4 text-muted-foreground leading-relaxed">
                Our AI tutor uses advanced machine learning to analyze your learning patterns, identify
                knowledge gaps, and then provides personalized explanations, practice problems, and
                tailored study plans to help you master concepts efficiently.
              </p>
            </details>
            <details className="bg-background p-5 rounded-lg border border-border shadow-md transition-all duration-300 open:bg-secondary animate-fade-in-up delay-100">
              <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-primary-foreground hover:text-primary transition-colors text-primary">
                What exams and subjects does IntelliLearn cover?
                <MdQuestionMark size={24} className="text-primary" />
              </summary>
              <p className="pt-4 text-muted-foreground leading-relaxed">
                IntelliLearn supports a wide range of competitive exams including JEE, NEET, UPSC, CAT,
                GMAT, and many more. We cover subjects like Physics, Chemistry, Mathematics, Biology,
                English, General Knowledge, and Reasoning. New exams and subjects are added regularly!
              </p>
            </details>
            <details className="bg-background p-5 rounded-lg border border-border shadow-md transition-all duration-300 open:bg-secondary animate-fade-in-up delay-200">
              <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-primary hover:text-primary transition-colors text-primary text-primary">
                Can I use IntelliLearn on my mobile device?
                <MdQuestionMark size={24} className="text-primary" />
              </summary>
              <p className="pt-4 text-muted-foreground leading-relaxed">
                Yes! IntelliLearn is fully responsive and optimized for all devices. You can access
                our platform seamlessly on your desktop, laptop, tablet, or smartphone through your web browser.
                Dedicated mobile apps are also in development.
              </p>
            </details>
            <details className="bg-background p-5 rounded-lg border border-border shadow-md transition-all duration-300 open:bg-secondary animate-fade-in-up delay-300">
              <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-primary hover:text-primary transition-colors text-primary">
                Is my data safe and private with IntelliLearn?
                <MdQuestionMark size={24} className="text-primary" />
              </summary>
              <p className="pt-4 text-muted-foreground leading-relaxed">
                Absolutely. We prioritize your privacy and data security. All your learning data is
                encrypted and stored securely. We adhere to strict data protection regulations and
                never share your personal information with third parties.
              </p>
            </details>
            <details className="bg-background p-5 rounded-lg border border-border shadow-md transition-all duration-300 open:bg-secondary animate-fade-in-up delay-400">
              <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-primary hover:text-primary transition-colors text-primary">
                What kind of support can I expect?
                <MdQuestionMark size={24} className="text-primary" />
              </summary>
              <p className="pt-4 text-muted-foreground leading-relaxed">
                All users have access to email support. Pro and Premium plan subscribers receive
                priority chat support and dedicated personal learning coach (Premium only) for a more
                hands-on guidance.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section (Re-designed with more emphasis) */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground text-center animate-fade-in-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Ready to Transform Your <br className="hidden sm:inline" /> Learning Journey?
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Join thousands of successful students who are achieving their academic goals with
            IntelliLearn's cutting-edge AI platform.
          </p>
          <button
            className="px-10 py-4 rounded-full bg-white text-primary text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
            onClick={() => onNavigate("signup")}
          >
            Get Started Now
          </button>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black text-muted-foreground py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Info */}
            <div>
              <a href="#" className="flex items-center space-x-3 mb-4">
                < div className="text-primary font-bold text-3xl" >IL</div>
                <span className="text-2xl font-bold text-primary-foreground">IntelliLearn</span>
              </a>
              <p className="text-sm leading-relaxed max-w-xs">
                IntelliLearn is revolutionizing education with AI-powered personalized learning,
                making complex subjects easy and academic success attainable for everyone.
              </p>
            </div>
            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold text-primary-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold text-primary-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Demo</a></li>
              </ul>
            </div>
            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold text-primary-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm border-t border-gray-800 pt-8 mt-8">
            © {new Date().getFullYear()} IntelliLearn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
