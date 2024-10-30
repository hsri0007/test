import { AssetFragment } from '~/cms';

const getStaticImageObject = ({
  url,
  width,
  height,
  description,
  contentType,
}: {
  url: string;
  width?: number;
  height?: number;
  description?: string;
  contentType?: string;
}) => {
  return {
    sys: {
      id: 'anystring',
    },
    contentType: contentType ? contentType : 'image/png',
    url,
    description,
    width,
    height,
  } as AssetFragment;
};

const heroData = {
  title: 'Cardiac & Lung AI',
  subtitle: 'Reduce the threshold for answers',
  eyebrow: 'FDA Cleared | Works on Exo Iris®',
  mobileEyebrow: 'FDA Cleared |\n Works on Exo Iris®',
  image: getStaticImageObject({
    url: 'https://exo-inc-videos.s3.us-west-1.amazonaws.com/Ai+page/AMMM9174.png',
    width: 4096,
    height: 2831,
  }),
};

const introData = {
  title: 'It’s time for a new approach to heart failure',
  description:
    'Heart failure affects more than 64 million people worldwide¹. In the United States alone, over 6.7 million have heart failure² and that number is expected to increase to 8 million with annual healthcare spending ballooning to $240 billion by 2030³.',
  points: [
    'Leading cause of hospitalizations in people over 65 years⁴ with an excess of 1 million admissions per year⁵',
    '23% of patients are readmitted within 30 days⁶',
    'Average HF-related admission cost is $14,000⁷',
  ],
};

const imageBlockData = {
  title:
    'Healthcare providers need innovative solutions to detect and treat heart failure earlier at the point of care – hospital, clinic or home.',
  image: getStaticImageObject({
    url: 'https://images.ctfassets.net/f1onadsih6xk/NH0afG5usryewKMpw0Ivg/ea7ba21d36a5573a66321ce4e58a7910/c06df28eb5b7e1afe48997dec71f71cf.jpeg',
    width: 4096,
    height: 2831,
  }),
  textTitle: 'Accelerating diagnosis',
  text: `
    Echocardiography is the cornerstone of heart failure diagnosis⁸. Today, expert sonographers evaluate this common and costly disease, then cardiologists interpret the tests. What if technology could bring this critical evaluation to the point of care, at a lower cost, and give clinicians reliable answers?\n
    Exo’s AI-enabled point-of-care ultrasound (POCUS) has been designed to bring this information from a few to everyone. Get to answers immediately, accelerating diagnosis and improving patient care.
  `,
};

const introducingData = {
  subtitle: `Say hello to Exo's Cardiac and Lung AI, now on Exo Iris.`,
  title: 'Reliable answers fast',
  paragraph1:
    'Is your patient’s dyspnea (difficulty breathing) caused by the heart or the lungs? Is your heart failure patient ready for discharge? Is your patient progressing with therapy treatment?',
  paragraph2:
    'With Exo AI, you can quickly scan your patient’s heart and lungs to get the answers you need. Reduce diagnostic error and accelerate patient care pathways to treatment or discharge.',
  itemsCollection: {
    items: [
      {
        title: 'Cardiac AI',
        description:
          'With Exo’s Cardiac AI, you can measure left ventricular ejection fraction (LVEF) and stroke volume in a few heartbeats in both parasternal long axis (PLAX) and apical four-chamber (A4C) views, making it easier than ever for POCUS users to get to answers.',
        asset: getStaticImageObject({
          url: 'https://videos.ctfassets.net/f1onadsih6xk/6P6Na1OzJfkXOq9zll4KCH/b46ff297c75fe45efc5d8c7593349eb6/Cardiac_AI_Iris_Page.mp4',
          contentType: 'video/mp4',
        }),
      },
      {
        title: 'Lung AI',
        description:
          'With Lung AI, you can determine the presence or absence of B-lines reliably in seconds.',
        asset: getStaticImageObject({
          url: 'https://videos.ctfassets.net/f1onadsih6xk/61XrDnn7Cb9CmePJZMUPXz/e1bc2c77ca8b218a56496d71d83dbd42/New_Lung_AI_2.3_trimmed_Use_this_one_compressed.mp4',
          contentType: 'video/mp4',
        }),
      },
    ],
  },
};

const performanceData = {
  title: 'Unrelenting performance',
  paragraph1: `Exo's Cardiac and Lung AI stands out for its exceptional performance, validated through our rigorous internal qualification process in compliance with FDA regulations. We’ve developed and tested our AI using over 100,000 scans from various patient populations and from various diagnostic types. Not getting the perfect image is not a problem.`,
  paragraph2: `Our AI validation comes from diverse demographics (gender, ethnicity, location), BMI and health conditions (heart failure with reduced ejection fraction, coronary artery disease and cardiomyopathy). This unique and rigorous approach ensures our AI achieves excellence across a spectrum of scenarios.`,
  amenity1Title: 'Cardiac AI',
  amenity1ItemsCollection: [
    {
      title: 'High Reliability',
      description:
        'Excellent agreement with LVEF measurements done by experts (cardiologists or experienced echosonographers) with an Inter Class Correlation (ICC) score of 0.91',
    },
    {
      title: 'High Accuracy',
      description:
        'AI matches or exceeds accuracy seen in expert measurements with a Root-mean square error (RMSE) of 8.82% compared to an inter-observer variability between expert observers of 10-14%',
    },
  ],
  amenity2Title: 'Lung AI',
  amenity2ItemsCollection: [
    {
      title: 'High Reliability',
      description:
        'Excellent agreement with B-lines done by experts (experienced echosonographers) with an Inter Class Correlation (ICC) score of 0.93',
    },
    {
      title: 'High Accuracy',
      description: `AI matches or exceeds accuracy seen in expert measurements for the presence/absence of A-lines with the Cohen's Kappa Coefficient score of 0.84`,
    },
    {
      title: 'High Sensitivity',
      description: `Lung ultrasound has high sensitivity (94%) and specificity (92%) for counting B-lines to detect Acute Cardiogenic Pulmonary Edema (ACPE) ⁹`,
    },
  ],
};

const comparisonData = {
  title1: '5-star answers for 3-star images',
  description1:
    'Whether you’re an early POCUS user or a seasoned expert, Exo’s Cardiac and Lung AI can simplify the process of obtaining and interpreting images. Built on data from over 100,000 images from POCUS users in emergency rooms and critical care units, our AI is developed around real-world images and not perfect images performed in a cardiac lab.',
  title2: 'What does all this mean?',
  description2: 'It means you don’t need the perfect scan to get an answer.',
  imagesCollection: [
    {
      title: 'Cardiac PLAX',
      imageGoodQuality: getStaticImageObject({
        url: 'https://images.ctfassets.net/f1onadsih6xk/1VIUxUXcsIY4Q6c8TGZJWH/d1649cd9d81ae04334af51de20a01ef3/Cardiac_AI_PLAX_5-star_image.png',
        width: 788,
        height: 1674,
      }),
      imageBadQuality: getStaticImageObject({
        url: 'https://images.ctfassets.net/f1onadsih6xk/332HNXG3KY811tqZo2ZNk1/44a624a3415db987ab9b7aa19f179ffa/Cardiac_AI_PLAX_3-star_image.PNG',
        width: 1290,
        height: 2796,
      }),
    },
    {
      title: 'Cardiac A4C',
      imageGoodQuality: getStaticImageObject({
        url: 'https://images.ctfassets.net/f1onadsih6xk/2nFCwJcp7R6A5c1EGMGuKN/b1be4da2bd8e46cf04a19275497a6871/Cardiac_AI_A4C_5-star_image.png',
        width: 780,
        height: 1676,
      }),
      imageBadQuality: getStaticImageObject({
        url: 'https://images.ctfassets.net/f1onadsih6xk/7IBR2Neml5nPb2iBECZH7s/aa7298cb3fa76000d0da26c14e83962f/Cardiac_AI_A4C_3-star_image.png',
        width: 782,
        height: 1674,
      }),
    },
    {
      title: 'Lung',
      imageGoodQuality: getStaticImageObject({
        url: 'https://images.ctfassets.net/f1onadsih6xk/7qFX5MGUhdiOQu1JMokys4/b8797ee0bda58dd0046200b3862c501d/Lung_AI_A-Lines_5-star_image.png',
        width: 784,
        height: 1676,
      }),
      imageBadQuality: getStaticImageObject({
        url: 'https://images.ctfassets.net/f1onadsih6xk/73POnsiuHaJlEH5P5UUVzJ/ac132c739f8e6f22229018818d7655f8/49ae3133950a4ce40d787b5c1108abfa.png',
        width: 1290,
        height: 2796,
      }),
    },
  ],
};

const innovationCalloutData = {
  title: 'Introducing SweepAI™',
  description:
    'Exo’s FDA-cleared SweepAI™ continuously evaluates and monitors the quality of your ultrasound images and provides immediate feedback, ensuring you are capturing the best scan possible. SweepAI automatically identifies the usable parts of the data during scanning and indicates when enough diagnostic information has been captured. It takes mere seconds. With SweepAI for cardiac and lung, Exo Iris includes automated AI-based indicators for heart failure (CHF, HFrEF), cardiac hypertrophy, cardiomyopathies, valvular disease, pneumonia, and pulmonary embolism.',
};

const outroData = {
  heading: 'Get started with Exo AI',
  hideBackground: true,
  ctasCollection: {
    items: [
      {
        label: 'Buy Iris',
        href: '/iris',
        sys: {
          id: 'anystring',
        },
      },
      {
        label: 'Get Demo',
        href: '/iris/demo',
        sys: {
          id: 'anystring',
        },
      },
    ],
  },
  subtextCopy: [
    `Gianluigi Savarese, Peter Moritz Becher, Lars H Lund, Petar Seferovic, Giuseppe M C Rosano, Andrew J S Coats, Global burden of heart failure: a comprehensive and updated review of epidemiology, Cardiovascular Research, Volume 118, Issue 17, December 2022, Pages 3272–3287, https://doi.org/10.1093/cvr/cvac013`,
    `Biykem Bozkurt, Tariq Ahmad, Kevin M. Alexander, et. al. Heart Failure Epidemiology and Outcomes Statistics: A Report of the Heart Failure Society of America. Journal of Cardiac Failure. Volume 29, Issue 10, Pages 1412-1451. https://doi.org/10.1016/j.cardfail.2023.07.006`,
    `Heidenreich PA, Fonarow GC, Opsha Y, Sandhu AT, Sweitzer NK, Warraich HJ; HFSA Scientific Statement Committee Members Chair. Economic Issues in Heart Failure in the United States. J Card Fail. 2022 Mar;28(3):453-466. doi: 10.1016/j.cardfail.2021.12.017. Epub 2022 Jan 24. PMID: 35085762; PMCID: PMC9031347`,
    `Azad N, Lemay G. Management of chronic heart failure in the older population. J Geriatr Cardiol. 2014 Dec;11(4):329-37. doi: 10.11909/j.issn.1671-5411.2014.04.008. PMID: 25593582; PMCID: PMC4292097.`,
    `Katherine A.A. Clark, Samuel W. Reinhardt, Fouad Chouairi, P. Elliott Miller, Bradley Kay, Michael Fuery, Avirup Guha, Tariq Ahmad, Nihar R. Desai, Trends in Heart Failure Hospitalizations in the US from 2008 to 2018, Journal of Cardiac Failure, Volume 28, Issue 2, 2022, Pages 171-180, ISSN 1071-9164, https://doi.org/10.1016 j.cardfail.2021.08.020.`,
    `Nair R, Lak H, Hasan S, Gunasekaran D, Babar A, Gopalakrishna KV. Reducing All-cause 30-day Hospital Readmissions for Patients Presenting with Acute Heart Failure Exacerbations: A Quality Improvement Initiative. Cureus. 2020 Mar 25;12(3):e7420. doi: 10.7759/cureus.7420. PMID: 32351805; PMCID: PMC7186095.`,
    `Hussein Tahanulqiwa, Jahanavi Ramakrishna, Abdullah Yesilyaprak, Anoopa Matthew, Ahmad Refai, Vesna Tegeltija. A Resident-led Initiative To Improve Heart Failure Readmission Rate By Targeting Factors Of Social Vulnerability. Journal of Cardiac Failure. Volume 30, Issue 1, Pages 142-143. doi: https://doi.org/10.1016 j.cardfail.2023.10.064`,
    `Zohrabian A, Kapp JM, Simoes EJ. The economic case for US hospitals to revise their approach to heart failure readmission reduction. Annuals of Translational Medicine. 2018 Aug;6(15):298.`,
    `Mohammad Al Deeb, Skye Barbic, Robin Featherstone, Jerrald Dankoff, David Barbic. Point-of-care Ultrasonography for the Diagnosis of Acute Cardiogenic Pulmonary Edema in Patients Presenting With Acute Dyspnea: A Systematic Review and Meta-analysis. Academic Emergency Medicine. Volume 21, Issue 8, August 2014, pages 843-852. https://doi.org/10.1111/acem.12435`,
  ],
};

const DATA = {
  hero: heroData,
  intro: introData,
  imageBlock: imageBlockData,
  introducing: introducingData,
  comparison: comparisonData,
  performance: performanceData,
  innovation: innovationCalloutData,
  outro: outroData,
};

export default DATA;
