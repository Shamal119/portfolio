import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Globe, Terminal } from 'lucide-react';
import resumeData from '../../data/resumeData.json';

const Skills = () => {
    const categories = [
        {
            id: 'ai_ml',
            title: 'AI & Machine Learning',
            icon: <Cpu size={24} />,
            skills: resumeData.skills.ai_ml,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20'
        },
        {
            id: 'cloud_ai_tools',
            title: 'Cloud & AI Tools',
            icon: <Globe size={24} />,
            skills: resumeData.skills.cloud_ai_tools,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20'
        },
        {
            id: 'data_tools',
            title: 'Data Science & BI',
            icon: <Database size={24} />,
            skills: [...resumeData.skills.data_tools, ...resumeData.skills.bi_visualization],
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20'
        },
        {
            id: 'programming',
            title: 'Programming & Web',
            icon: <Terminal size={24} />,
            skills: resumeData.skills.programming,
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20'
        }
    ];

    return (
        <section id="skills" className="py-20 bg-surface text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 md:p-8 rounded-2xl border ${category.border} bg-background/50 backdrop-blur-sm hover:bg-background transition-colors`}
                        >
                            <div className="flex items-center mb-6">
                                <div className={`p-3 rounded-lg ${category.bg} ${category.color} mr-4`}>
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold">{category.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-surface rounded-lg text-gray-300 text-sm font-medium border border-gray-800 hover:border-gray-600 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
