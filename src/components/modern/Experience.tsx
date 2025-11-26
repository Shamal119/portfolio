import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import resumeData from '../../data/resumeData.json';

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-surface text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
                </motion.div>

                <div className="relative border-l border-gray-800 ml-4 md:ml-10 space-y-12">
                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Dot */}
                            <div className="absolute -left-[5px] top-0 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-black" />

                            <div className="bg-background p-4 md:p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                        <div className="flex items-center text-blue-400 mt-1">
                                            <Briefcase size={16} className="mr-2" />
                                            <span>{exp.company}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-500 mt-2 md:mt-0 text-sm">
                                        <Calendar size={16} className="mr-2" />
                                        <span>{exp.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-2">
                                    {exp.responsibilities.map((resp, i) => (
                                        <li key={i} className="text-gray-400 text-sm leading-relaxed flex items-start">
                                            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-gray-600 rounded-full shrink-0" />
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
