import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <main className="pt-20 min-h-screen bg-[#0A0A0C]">
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1759159347914-88541fa4bd14?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGFyY2hpdGVjdHVyZSUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3NjQzNDc0Mnww&ixlib=rb-4.1.0&q=85"
            alt="Abstract architecture"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/50 to-[#0A0A0C]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.span
            className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our Story
          </motion.span>
          <motion.h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-[#F3F3F1] leading-none mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Fifteen Years of
            <br />
            Architectural <span className="italic">Curation</span>
          </motion.h1>
          <motion.p
            className="font-body font-light text-lg text-[#A1A1A5] max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            We don't simply sell properties — we connect discerning individuals with architectural masterpieces that reflect their vision, values, and legacy.
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-6">
              Philosophy
            </span>
            <h2 className="font-heading text-4xl font-light tracking-tight text-[#F3F3F1] mb-8">
              Every Home Tells <span className="italic">a Story</span>
            </h2>
            <div className="space-y-5">
              <p className="font-body font-light text-base text-[#A1A1A5] leading-relaxed">
                At Estate Tours, we believe that a home is the most personal expression of one's identity. Our curatorial approach ensures that every property we represent meets the highest standards of design, craftsmanship, and livability.
              </p>
              <p className="font-body font-light text-base text-[#A1A1A5] leading-relaxed">
                We partner with the world's most visionary architects, designers, and developers to bring forward residences that push the boundaries of what's possible in luxury living.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden border border-white/10">
              <img
                src="https://images.pexels.com/photos/34277650/pexels-photo-34277650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Luxury interior"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold/20 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#111114]">
        <div className="max-w-7xl mx-auto">
          <motion.span
            className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Leadership
          </motion.span>
          <motion.h2
            className="font-heading text-4xl font-light tracking-tight text-[#F3F3F1] mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Meet the <span className="italic">Team</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Victoria Sterling",
                role: "Founding Director",
                image: "https://images.pexels.com/photos/7642003/pexels-photo-7642003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                bio: "With two decades of experience in ultra-luxury real estate, Victoria has orchestrated over $4 billion in transactions across Beverly Hills, Malibu, and Manhattan."
              },
              {
                name: "Alexander Mercer",
                role: "Senior Advisor",
                image: "https://images.unsplash.com/photo-1772987438485-ac832640c8a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjByZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzY0MzQ3NDJ8MA&ixlib=rb-4.1.0&q=85",
                bio: "Alexander brings a unique blend of architectural expertise and market intelligence, specializing in penthouse acquisitions and new-development advisory."
              },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                className="group border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-body text-gold mb-2">
                      {member.role}
                    </span>
                    <h3 className="font-heading text-2xl font-light text-[#F3F3F1] mb-4">
                      {member.name}
                    </h3>
                    <p className="font-body font-light text-sm text-[#707076] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
