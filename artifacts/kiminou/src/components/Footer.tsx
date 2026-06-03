import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-16 bg-primary text-primary-foreground" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="font-serif text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-testid="footer-title"
          >
            KIMINOU KNOX
          </motion.h2>
          <motion.p
            className="text-lg opacity-90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            data-testid="footer-subtitle"
          >
            ATHLETE • AUTHOR • ENTREPRENEUR
          </motion.p>
          
          <motion.div
            className="border-t border-white/20 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm opacity-80" data-testid="footer-copyright">
              © 2026 Kiminou Knox. All rights reserved. | Bay Area Renaissance • Class of 2025
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
