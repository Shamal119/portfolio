// src/data/resumeData.ts
export const resumeData = {
    personal: {
      name: "Shamal Musthafa",
      location: "Kannur, India",
      email: "shamalmusthafa59@gmail.com",
      phone: "+91 7012464811",
      linkedin: "linkedin.com/in/shamalmusthafa",
    },
  
    experience: [
      {
        title: "Data Scientist",
        company: "Truwave Software LLC",
        location: "Madurai",
        period: "August 2023 - Present",
        responsibilities: [
          "Architected and deployed enterprise chatbots using Dialogflow CX and Gemini technologies",
          "Designed and maintained scalable APIs using FastAPI",
          "Developed custom middleware and webhooks for enhanced Dialogflow conversation flows",
          "Implemented Generative AI and LLMs to build advanced AI models",
          "Utilized Azure AI and OpenAI for AI-based functionalities in production environments",
          "Created robust backend systems using Python and FastAPI for data processing pipelines"
        ]
      },
      {
        title: "Data Analyst Intern",
        company: "Truwave Software LLC",
        location: "Madurai",
        period: "January 2023 - April 2023",
        responsibilities: [
          "Analyzed call center audio data using OpenAI Whisper Timestamp and LDA",
          "Identified common customer issues and recommended service improvements",
          "Developed proficiency in Alteryx, Microsoft Power BI, and NLP techniques"
        ]
      }
    ],
  
    projects: [
      {
        title: "Chatbot Platform",
        description: "Developed enterprise-grade chatbot using Dialogflow, FastAPI, and cloud services. Implemented custom middleware for enhanced conversation handling and integrated with multiple backend systems for seamless data flow. With addition to data store usage and Generative AI.",
        technologies: ["Dialogflow", "FastAPI", "Python", "GCP Cloud"]
      },
      {
        title: "AI-Powered Chatbot Application",
        description: "Developed Chatbot using Generative AI, Azure AI search, and OpenAI technologies from scratch using Azure AI search, FastAPI and ReactJS.",
        technologies: ["Azure OpenAI", "Azure AI search", "FastAPI", "Python", "ReactJS"]
      },
      {
        title: "Call Center Data Analytics Dashboard",
        description: "Transcribed call data using OpenAI Whisper, analyzed content, and created Power BI dashboard.",
        technologies: ["Python", "NLP", "Power BI", "Alteryx"]
      },
      {
        title: "Sentiment Analysis Dashboard",
        description: "Built a real-time sentiment analysis tool that monitors social media platforms for brand sentiment using NLP. Created dashboards to visualize sentiment trends and volume.",
        technologies: ["Python", "NLP", "Power BI", "FastAPI"]
      },
      {
        title: "Breast Cancer Detection Using Machine Learning",
        description: "Developed classification model achieving 95% accuracy using Random Forest and k-Nearest Neighbors (KNN). Implemented cross-validation and hyperparameter tuning to optimize model performance.",
        technologies: ["Python", "scikit-learn", "Random Forest", "KNN", "PCA", "Flask", "Pandas", "Matplotlib"]
      }
    ],
  
    skills: {
      ai_ml: ["Machine Learning", "Deep Learning", "NLP", "Generative AI", "LLM", "TensorFlow", "PyTorch"],
      cloud_tools: ["Azure AI", "OpenAI", "Dialogflow CX", "AWS Bedrock", "Google Gemini", "Google Vertex AI", "LangChain"],
      programming: ["Python", "FastAPI", "SQL", "JavaScript", "Java", "R"],
      web_development: ["ReactJS", "NextJS", "Django"],
      data_analysis: ["Pandas", "NumPy", "Scikit-Learn", "OpenCV"],
      visualization: ["Power BI", "Tableau CRM", "Excel", "Alteryx"]
    },
  
    education: [
      {
        degree: "Master of Science in Data Science",
        institution: "CHRIST (Deemed to be University)",
        location: "Pune Lavasa Campus",
        period: "2021 - 2023"
      },
      {
        degree: "Bachelor of Computer Applications",
        institution: "Kannur University",
        period: "2017 - 2020"
      }
    ]
  };