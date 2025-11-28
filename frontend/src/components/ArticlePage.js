import React from "react";
import { useParams } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';

const articles = [
  {
    id: 1,
    title: "The Role of Antibiotics in Treating Infections",
    doctorName: "Dr Rameen Rafiq",
    content: `
      Antibiotics are a class of medications used to treat bacterial infections. They work by either killing bacteria or inhibiting their growth. The advent of antibiotics revolutionized medicine and significantly reduced mortality from bacterial infections. However, their misuse and overuse have led to growing concerns about antibiotic resistance, where bacteria evolve to survive despite the presence of these drugs.

      How Antibiotics Work:
      Antibiotics target specific structures or functions within bacteria. Some antibiotics, like penicillin, disrupt the bacterial cell wall, while others, like tetracyclines, prevent bacteria from synthesizing essential proteins. This selective targeting helps eradicate bacteria without harming human cells.

      Types of Antibiotics:
      Penicillins: Effective against a wide range of bacterial infections, including pneumonia and skin infections.
      Macrolides: Often prescribed for respiratory tract infections and sexually transmitted diseases.
      Cephalosporins: A broader range of activity, often used for infections in hospitals.

      The Risks of Overuse:
      Overprescribing antibiotics for viral infections or incorrect usage contributes to antibiotic resistance. This resistance leads to longer, more expensive treatments, and in some cases, makes infections untreatable with existing medications.

      Conclusion:
      While antibiotics are essential tools in fighting bacterial infections, it’s crucial that they are used judiciously to prevent resistance. Doctors and healthcare providers must educate patients about the proper use of antibiotics, and patients must follow their prescribed courses to help preserve the effectiveness of these life-saving medications.
    `
  },
  {
    id: 2,
    title: "The Impact of Stress on Mental Health",
    doctorName: "Dr Maham Farooqi",
    content: `
      Chronic stress can have a profound effect on mental health. When stress becomes persistent, it can lead to anxiety, depression, and other mood disorders. This article explores the biological mechanisms behind stress, how it affects the brain, and ways to manage stress effectively.

      How Stress Affects the Body:
      Stress activates the body's "fight or flight" response, which releases hormones like adrenaline and cortisol. While this is beneficial in short bursts, long-term exposure to these hormones can have negative effects on mental and physical health.

      Managing Stress:
      Regular physical activity, mindfulness practices like meditation, and cognitive-behavioral techniques are effective strategies for managing stress. Therapy and support groups can also provide valuable support for those dealing with chronic stress.

      Conclusion:
      Understanding the impact of stress on mental health is the first step toward prevention. It is essential to take proactive steps to manage stress and improve overall well-being.
    `
  },
  {
    id: 3,
    title: "Advances in Cancer Treatment: New Therapies and Hope",
    doctorName: "Dr Rameen Rafiq",
    content: `
      This article reviews recent breakthroughs in cancer treatment, including immunotherapy, targeted therapy, and precision medicine, and their potential to improve patient outcomes.

      Immunotherapy:
      Immunotherapy uses the body's immune system to fight cancer. It has shown promise in treating cancers that were once considered untreatable. Immunotherapy drugs work by stimulating the immune system to target and destroy cancer cells.

      Targeted Therapy:
      Targeted therapy involves using drugs to specifically target cancer cells without harming normal cells. This approach has shown significant success in treating certain types of cancers, such as breast cancer and leukemia.

      Precision Medicine:
      Precision medicine tailors treatment based on an individual’s genetic profile, allowing for more effective and personalized treatment options. This approach is still evolving, but it offers hope for better outcomes for cancer patients.

      Conclusion:
      Advances in cancer treatment offer new hope for patients, and as research continues, these therapies will become more accessible and effective in improving cancer care.
    `
  },
  {
    id: 4,
    title: "Vaccination and Public Health: Preventing Disease",
    doctorName: "Dr Sabina Rasheed",
    content: `
      This article examines the role of vaccinations in preventing infectious diseases, protecting communities, and achieving herd immunity.

      The Importance of Vaccines:
      Vaccines have been one of the most significant advances in public health. They protect individuals from infectious diseases and prevent the spread of these diseases within communities. Vaccination programs have led to the eradication or reduction of diseases like polio, measles, and smallpox.

      Herd Immunity:
      Herd immunity occurs when a large portion of a population becomes immune to a disease, making its spread unlikely. Vaccines play a crucial role in achieving herd immunity, protecting those who cannot be vaccinated, such as infants and individuals with certain health conditions.

      Conclusion:
      Vaccination is one of the most effective ways to protect public health, and continuing to promote vaccination programs is essential to preventing the spread of infectious diseases and maintaining herd immunity.
    `
  },
  {
    id: 5,
    title: "The Importance of Sleep for Physical and Mental Health",
    doctorName: "Dr Maham Farooqi",
    content: `
      Sleep is vital for good health and well-being. It plays an essential role in physical health, mental clarity, and emotional stability. A lack of sleep can lead to a variety of health issues, including impaired cognitive function, weakened immune system, and increased risk of chronic diseases.

      How Sleep Affects the Body:
      Sleep is a restorative process that helps the body repair and rejuvenate. During sleep, the body undergoes cellular repair, memory consolidation, and hormone regulation.

      The Mental Health Benefits of Sleep:
      Adequate sleep helps regulate mood, reduces stress, and supports cognitive function. It also enhances decision-making abilities and improves concentration.

      Tips for Better Sleep:
      Establishing a consistent sleep schedule, avoiding caffeine before bedtime, and creating a relaxing bedtime routine can help improve the quality of sleep.

      Conclusion:
      Prioritizing sleep is one of the best things you can do for your health. Aim for 7-9 hours of sleep each night to support both physical and mental well-being.
    `
  },
  {
    id: 6,
    title: "Mental Health in Adolescents: Recognizing Early Warning Signs",
    doctorName: "Dr Rameen Rafiq",
    content: `
      Mental health issues in adolescents are common but often go unrecognized. This article guides understanding common mental health issues in adolescents, such as depression and anxiety, and how to spot early warning signs to seek help.

      Recognizing the Signs:
      Adolescents may experience mood swings, withdrawal from social activities, and changes in sleep or eating patterns. These can be signs of underlying mental health issues, such as depression or anxiety.

      The Importance of Early Intervention:
      Identifying and addressing mental health issues early in adolescence is crucial. Early intervention can lead to better long-term outcomes, helping adolescents to manage their mental health effectively and lead fulfilling lives.

      Conclusion:
      Parents, teachers, and caregivers should be aware of the signs of mental health struggles in adolescents and encourage open communication. Providing support early on can help prevent more serious issues in the future.
    `
  }
];


const ArticlePage = () => {
  const { id } = useParams(); // Capture the article ID from the URL
  const article = articles.find((article) => article.id === parseInt(id)); // Find the article by ID

  if (!article) {
    return <div>Article not found</div>; // If article is not found, display error message
  }

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.articleContainer}>
        <h1 style={styles.articleTitle}>{article.title}</h1>
        <p style={styles.doctorName}>Written by: {article.doctorName}</p>
        <div style={styles.articleContent}>
          <p>{article.content}</p> {/* Display the full content */}
        </div>
      </div>
      <Footer />
    </div>
  );
};


const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    margin: "0",
    padding: "0",
    backgroundColor: "#f4f7fb",
  },
  articleContainer: {
    maxWidth: "1200px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  articleTitle: {
    fontSize: "2.5em",
    fontWeight: "700",
    color: "#0D095A",
    marginBottom: "20px",
    textAlign: "center",
  },
  doctorName: {
    fontSize: "1.2em",
    fontWeight: "500",
    color: "#555",
    marginBottom: "20px",
    textAlign: "center",
  },
  articleContent: {
    fontSize: "1.1em",
    lineHeight: "1.6",
    color: "#333",
  },
  sectionTitle: {
    fontSize: "1.5em",
    fontWeight: "600",
    color: "#0D095A",
    marginTop: "30px",
    marginBottom: "10px",
  },
};
export default ArticlePage;