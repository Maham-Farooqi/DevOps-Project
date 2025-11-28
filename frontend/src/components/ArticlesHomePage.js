import React, { useState } from "react";
import Footer from './Footer';
import Header from './Header';
const ArticlesHomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const navigate = (path) => {
    window.location.href = path;
  };
  const articles = [
    { 
      id:1,
      name: "The Role of Antibiotics in Treating Infections",
      writtenby: "Dr Rameen Rafiq",
      description: "This article explores the importance of antibiotics in treating bacterial infections, how they work, and the risks of overuse and antibiotic resistance" 
    },
    {
      id:2,
      name: "The Impact of Stress on Mental Health",
      writtenby: "Dr Maham Farooqi",
      description: "This article discusses how chronic stress can contribute to mental health issues like anxiety and depression, and offers tips on managing stress for better mental well-being"
    },
    {
      id:3,
      name: "Advances in Cancer Treatment: New Therapies and Hope",
      writtenby: "Dr Rameen Rafiq",
      description: "Reviews recent breakthroughs in cancer treatment, including immunotherapy, targeted therapy, and precision medicine, and their potential to improve patient outcomes"
    },
    {
      id:4,
      name: "Vaccination and Public Health: Preventing Disease",
      writtenby: "Dr Sabina Rasheed",
      description: "This article examines the role of vaccinations in preventing infectious diseases, protecting communities, and achieving herd immunity"
    },
    {
      id:5,
      name: "The Importance of Sleep for Physical and Mental Health",
      writtenby: "Dr Maham Farooqi",
      description: "Discusses the critical role sleep plays in maintaining overall health, including its effects on memory, immune function, and emotional well-being"
    },
    {
      id:6,
      name: "Mental Health in Adolescents: Recognizing Early Warning Signs",
      writtenby: "Dr Rameen Rafiq",
      description: "A guide to understanding common mental health issues in adolescents, such as depression and anxiety, and how to spot early warning signs to seek help"
    },
  ];
  const filteredArticles = articles.filter((article) => {
    const matchesDoctor =
      selectedDoctor === "" || article.writtenby.toLowerCase().includes(selectedDoctor.toLowerCase());
    const matchesSearch = article.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDoctor && matchesSearch;
  });
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <h1 style={styles.largetextblue}>Read Medical Articles</h1>
      <div style={styles.controlsContainer}>
        <select
          onChange={(e) => setSelectedDoctor(e.target.value)}
          style={styles.dropdown}
          defaultValue=""
        >
          <option value="" disabled>Select Doctor</option>
          <option value="Dr Rameen Rafiq">Dr Rameen Rafiq</option>
          <option value="Dr Maham Farooqi">Dr Maham Farooqi</option>
          <option value="Dr Sabina Rasheed">Dr Sabina Rasheed</option>
        </select>
        <input
          type="text"
          placeholder="Search for article..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
      </div>
      <div style={styles.articlesContainer}>
        {filteredArticles.map((article, index) => (
          <div key={index} style={styles.articleCard}>
            <h3>{article.name}</h3>
            <p><strong>Written By:</strong> {article.writtenby}</p>
            <p>{article.description}</p>
            <button style={styles.readNowButton} onClick={() => navigate(`/readarticle/${article.id}`)} >Read Now </button>
          </div>
        ))}
        {filteredArticles.length === 0 && (
          <p style={styles.noArticlesMessage}>No articles found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};
const styles = {
  largetextblue: {
    fontSize: "3em",
    fontWeight: "700",
    margin: "10px 0",
    textAlign: "center",
    color: "#0D095A",
    marginTop: "30px",
    marginBottom: "30px",
  },
  controlsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  dropdown: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "200px",
  },
  searchBar: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "300px",
  },
  articlesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#9CC4F2",
    marginBottom: "10px"
  },
  articleCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  readNowButton: {
    backgroundColor: "#DA8026",
    color: "white",
    fontSize: "1em",
    fontWeight: "600",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  noArticlesMessage: {
    textAlign: "center",
    color: "#888",
    fontSize: "1.2em",
    marginTop: "20px",
  },
};
export default ArticlesHomePage;