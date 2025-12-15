import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    // Background animation loop
    const animationFrame = requestAnimationFrame(() => {
      const glowElements = sectionRef.current?.querySelectorAll('.absolute.bg-primary');
      glowElements?.forEach((el, index) => {
        const angle = (Date.now() + index * 1000) / 20;
        (el as HTMLElement).style.transform = `rotate(${angle}deg)`;
      });
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_autoresponse', `Thank you for reaching out, ${formData.name}! I will get back to you as soon as possible. - Shashank R`);

      const response = await fetch('https://formsubmit.co/ajax/r8013938@gmail.com', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 4000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    { icon: Mail, label: 'Email', value: 'r8013938@gmail.com', href: 'mailto:r8013938@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 7603945397', href: 'tel:+917603945397' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect with me', href: 'https://linkedin.com' },
    { icon: Github, label: 'GitHub', value: 'View projects', href: 'https://github.com' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 reveal">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base px-4">
            I'm currently looking for internship opportunities in AI/ML or Data Analytics.
            Feel free to reach out if you'd like to collaborate!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-4 reveal flex flex-col w-full max-w-lg mx-auto md:max-w-none">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group glass rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-primary/30 transition-all duration-500 hover:glow w-full"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <method.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {method.label}
                  </p>
                  <p className="font-medium group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                    {method.value}
                  </p>
                </div>
                <Send className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 shrink-0" />
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="reveal delay-200 w-full max-w-lg mx-auto md:max-w-none">
            <div className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

              <h3 className="text-xl font-semibold mb-6 relative z-10">Send a Message</h3>

              {submitSuccess && (
                <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm">Message sent successfully!</span>
                </div>
              )}

              {submitError && (
                <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">Failed to send message. Please try again.</span>
                </div>
              )}

              <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                    rows={4}
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;