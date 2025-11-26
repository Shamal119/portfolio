import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import resumeData from '../../data/resumeData.json';

const Certifications = () => {
    return (
        <section id="certifications" className="py-20 bg-surface text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resumeData.certifications.map((cert, index) => (
                        <motion.a
                            key={index}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="block group bg-background p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <Award size={24} />
                                </div>
                                <ExternalLink size={16} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                            </div>

                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                                {cert.name}
                            </h3>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
