import os
import datetime

# Define directories
BASE_DIR = r"X:\CaseVault\documents"
CATEGORIES = {
    "constitution": "Constitution",
    "acts": "General Act",
    "labour": "Labour Law",
    "criminal": "Criminal Law",
    "civil": "Civil Law",
    "tax": "Tax Law",
    "judgements": "Judgement"
}

documents = [
    # CONSTITUTION (5 documents)
    {
        "category": "constitution",
        "slug": "constitution-preamble",
        "title": "Preamble of the Constitution of the People's Republic of Bangladesh",
        "year": 1972,
        "act_number": "N/A",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2022-12-18",
        "tags": ["constitution", "preamble", "sovereignty", "principles"],
        "content": """# Preamble of the Constitution

We, the people of Bangladesh, having proclaimed our Independence on the 26th day of March, 1971 and through a historic struggle for national liberation, established the independent, sovereign People's Republic of Bangladesh;

Pledging that the high ideals of nationalism, socialism, democracy and secularism, which inspired our heroic people to dedicate themselves to, and our brave martyrs to lay down their lives in, the national liberation struggle, shall be the fundamental principles of the Constitution;

## Fundamental Principles
The state shall endeavor to secure for all citizens:
1. **Nationalism**: Bengali nationalism based on language and culture.
2. **Socialism**: A socialist economic system to ensure a social exploitation-free society.
3. **Democracy**: A democratic polity ensuring fundamental human rights and freedom.
4. **Secularism**: Elimination of communalism and political abuse of religion.

Further pledging that it shall be a fundamental aim of the State to realise through the democratic process a socialist society, free from exploitation- a society in which the rule of law, fundamental human rights and freedom, equality and justice, political, economic and social, will be secured for all citizens."""
    },
    {
        "category": "constitution",
        "slug": "constitution-article-27-equality",
        "title": "Article 27: Equality before Law",
        "year": 1972,
        "act_number": "N/A",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2022-12-18",
        "tags": ["constitution", "fundamental-rights", "equality", "discrimination"],
        "content": """# Article 27: Equality before Law

All citizens are equal before law and are entitled to equal protection of law.

## Interpretation & Application
This article guarantees two key concepts:
1. **Equality before the law**: No one is above the law, and every citizen is subject to the same legal framework.
2. **Equal protection of the law**: Under like circumstances, all persons shall be treated alike.

### Gender Equality (Article 28 connection)
* The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex or place of birth.
* Women shall have equal rights with men in all spheres of the State and of public life.
* Nothing shall prevent the State from making special provision in favor of women or children or for the advancement of any backward section of citizens."""
    },
    {
        "category": "constitution",
        "slug": "constitution-article-32-right-to-life",
        "title": "Article 32: Protection of Right to Life and Personal Liberty",
        "year": 1972,
        "act_number": "N/A",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2022-12-18",
        "tags": ["constitution", "fundamental-rights", "liberty", "human-rights"],
        "content": """# Article 32: Protection of Right to Life and Personal Liberty

No person shall be deprived of life or personal liberty save in accordance with law.

## Scope of Right to Life
The right to life is not merely confined to physical existence. As interpreted by the Supreme Court of Bangladesh, it includes:
* The right to a livelihood.
* The right to a healthy environment.
* Protection against arbitrary arrest and detention.
* Humane treatment during detention.

## Exceptions
Deprivation is only permissible under valid law, which must be fair, just, and non-arbitrary. Any detention without procedural safeguards violates this article."""
    },
    {
        "category": "constitution",
        "slug": "constitution-article-39-freedom-expression",
        "title": "Article 39: Freedom of Thought, Conscience and Speech",
        "year": 1972,
        "act_number": "N/A",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2022-12-18",
        "tags": ["constitution", "fundamental-rights", "speech", "expression", "press"],
        "content": """# Article 39: Freedom of Thought, Conscience and Speech

1. Freedom of thought and conscience is guaranteed.
2. Subject to any reasonable restrictions imposed by law in the interests of the security of the State, friendly relations with foreign states, public order, decency or morality, or in relation to contempt of court, defamation or incitement to an offence-
   * (a) the right of every citizen to freedom of speech and expression; and
   * (b) freedom of the press;
   are guaranteed.

## Key Elements
* **Absolute Right**: Freedom of thought and conscience cannot be restricted.
* **Qualified Right**: Freedom of speech, expression, and the press are subject to "reasonable restrictions" under specific constitutional grounds.
* **Judicial Review**: The courts determine if a restriction imposed by law is "reasonable" and in public interest."""
    },
    {
        "category": "constitution",
        "slug": "constitution-article-44-enforcement-rights",
        "title": "Article 44: Enforcement of Fundamental Rights",
        "year": 1972,
        "act_number": "N/A",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2022-12-18",
        "tags": ["constitution", "fundamental-rights", "writ", "high-court"],
        "content": """# Article 44: Enforcement of Fundamental Rights

1. The right to move the High Court Division in accordance with clause (1) of Article 102 for the enforcement of the rights conferred by this Part is guaranteed.
2. Without prejudice to the powers of the High Court Division under Article 102, Parliament may by law empower any other court, within the local limits of its jurisdiction, to exercise all or any of those powers.

## Judicial Enforcement (Article 102 Writ Jurisdiction)
Citizens can file Writ petitions under Article 102 to enforce their fundamental rights against state authorities. The types of writ include:
* **Habeas Corpus**: Produce the detained person.
* **Mandamus**: Command public officials to do their duty.
* **Prohibition**: Restrain inferior courts.
* **Quo Warranto**: Challenge the title to a public office.
* **Certiorari**: Quash illegal proceedings."""
    },

    # ACTS (6 documents)
    {
        "category": "acts",
        "slug": "penal-code-1860-murder",
        "title": "The Penal Code, 1860: Section 300-302 (Murder)",
        "year": 1860,
        "act_number": "Act XLV",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-01-15",
        "tags": ["penal-code", "homicide", "murder", "criminal-liability"],
        "content": """# Section 300: Murder

Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death, or-

* **Secondly**: If it is done with the intention of causing such bodily injury as the offender knows to be likely to cause the death of the person to whom the harm is caused.
* **Thirdly**: If it is done with the intention of causing bodily injury to any person and the bodily injury intended to be inflicted is sufficient in the ordinary course of nature to cause death.
* **Fourthly**: If the person committing the act knows that it is so imminently dangerous that it must, in all probability, cause death.

## Section 302: Punishment for Murder
Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.

## Key Exceptions
1. Grave and sudden provocation.
2. Private defense exceeded.
3. Public servant acting in good faith.
4. Sudden fight in the heat of passion.
5. Consent (above 18 years)."""
    },
    {
        "category": "acts",
        "slug": "contract-act-1872-agreement",
        "title": "The Contract Act, 1872: Section 2-10 (Essential Elements of Contract)",
        "year": 1872,
        "act_number": "Act IX",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-05-10",
        "tags": ["contract-law", "agreement", "consideration", "consent"],
        "content": """# Essential Elements of a Contract

Under the Contract Act, 1872, a contract is defined as an agreement enforceable by law.

## Section 10: What agreements are contracts
All agreements are contracts if they are made by the:
* **Free consent** of parties competent to contract,
* For a **lawful consideration**, and
* With a **lawful object**,
* And are not hereby expressly declared to be void.

## Essential Components
1. **Proposal and Acceptance**: An offer must be made and accepted.
2. **Competency of Parties (Section 11)**: Parties must be of major age, of sound mind, and not disqualified by law.
3. **Free Consent (Section 14)**: Consent is free when not caused by coercion, undue influence, fraud, misrepresentation, or mistake.
4. **Lawful Consideration (Section 23)**: The consideration or object must not be forbidden by law, fraudulent, or oppose public policy."""
    },
    {
        "category": "acts",
        "slug": "specific-relief-act-1877",
        "title": "The Specific Relief Act, 1877: Section 42 (Declaratory Decree)",
        "year": 1877,
        "act_number": "Act I",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-03-22",
        "tags": ["civil-law", "specific-relief", "declaration", "title"],
        "content": """# Section 42: Discretion of Court as to Declaration of Status or Right

Any person entitled to any legal character, or to any right as to any property, may institute a suit against any person denying, or interested to deny, his title to such character or right.

The court may in its discretion make therein a declaration that he is so entitled, and the plaintiff need not in such suit ask for any further relief.

## Proviso
No court shall make any such declaration where the plaintiff, being able to seek further relief than a mere declaration of title, omits to do so.

## Key Requirements for Section 42
* The plaintiff must have a legal character or right to property.
* The defendant must be denying or interested in denying that character or right.
* If consequential relief (like possession or injunction) is possible, it must be prayed for, otherwise the suit is barred by the proviso."""
    },
    {
        "category": "acts",
        "slug": "evidence-act-1872-relevancy",
        "title": "The Evidence Act, 1872: Section 5-9 (Relevancy of Facts)",
        "year": 1872,
        "act_number": "Act I",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-11-05",
        "tags": ["evidence-law", "relevancy", "facts", "admissibility"],
        "content": """# Relevancy of Facts under the Evidence Act

Evidence may be given in any suit or proceeding of the existence or non-existence of every fact in issue and of such other facts as are declared to be relevant, and of no others.

## Section 6: Relevancy of Facts forming part of same transaction (Res Gestae)
Facts which, though not in issue, are so connected with a fact in issue as to form part of the same transaction, are relevant, whether they occurred at the same time and place or at different times and places.

## Section 7: Facts which are the occasion, cause or effect of facts in issue
Facts which are the occasion, cause, or effect, immediate or otherwise, of relevant facts, or facts in issue, or which constitute the state of things under which they happened, or which afforded an opportunity for their occurrence or transaction, are relevant.

## Section 8: Motive, preparation and previous or subsequent conduct
Any fact is relevant which shows or constitutes a motive or preparation for any fact in issue or relevant fact. The conduct of any party is also relevant if it influences or is influenced by any fact in issue."""
    },
    {
        "category": "acts",
        "slug": "limitation-act-1908",
        "title": "The Limitation Act, 1908: Section 3 (Dismissal of Suits)",
        "year": 1908,
        "act_number": "Act IX",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-02-18",
        "tags": ["limitation-law", "time-bar", "civil-procedure", "delay"],
        "content": """# Section 3: Dismissal of Suits instituted after Period of Limitation

Subject to the provisions contained in sections 4 to 25 (inclusive), every suit instituted, appeal preferred, and application made after the period of limitation prescribed therefor by the first schedule shall be dismissed, although limitation has not been set up as a defense.

## Key Concepts
* **Mandatory Dismissal**: The court is bound to dismiss a time-barred suit even if the defendant does not raise the plea.
* **Condonation of Delay (Section 5)**: Applies to appeals and applications, but **not** to suits. The applicant must show "sufficient cause" for the delay.
* **Sufficient Cause**: External, unavoidable circumstances (e.g., severe illness, fraud by opposing party, or honest mistake of counsel). Not negligence."""
    },
    {
        "category": "acts",
        "slug": "registration-act-1908",
        "title": "The Registration Act, 1908: Section 17 (Compulsory Registration)",
        "year": 1908,
        "act_number": "Act XVI",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-08-14",
        "tags": ["property-law", "registration", "transfer", "validity"],
        "content": """# Section 17: Documents of which Registration is Compulsory

The registration of several categories of documents is compulsory in Bangladesh if they affect immovable property.

## Compulsorily Registrable Documents
1. **Gifts of Immovable Property**: Every deed of gift must be registered regardless of value.
2. **Non-testamentary Instruments**: Which purport or operate to create, declare, assign, limit or extinguish any right, title or interest of the value of BDT 100 and upwards in immovable property.
3. **Leases of Immovable Property**: From year to year, or for any term exceeding one year, or reserving a yearly rent.
4. **Sale Deeds (Saf Kabala)**: Transferring ownership of land/apartments.

## Section 49: Effect of Non-Registration
No document required by Section 17 to be registered shall:
* Affect any immovable property comprised therein.
* Be received as evidence of any transaction affecting such property, unless registered."""
    },

    # LABOUR (6 documents)
    {
        "category": "labour",
        "slug": "labour-act-2006-classification-workers",
        "title": "Bangladesh Labour Act, 2006: Section 4 (Classification of Workers)",
        "year": 2006,
        "act_number": "Act XLII",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-05-01",
        "tags": ["labour", "employment", "classification", "probation"],
        "content": """# Section 4: Classification of Workers and Probation Period

Workers employed in any establishment shall be classified into the following categories according to the nature of their work:

1. **Apprentice (শিক্ষানবিস)**
2. **Badli (বদলী)**
3. **Casual (আকস্মিক)**
4. **Temporary (অস্থায়ী)**
5. **Probationer (শিক্ষাধীন)**
6. **Permanent (স্থায়ী)**
7. **Seasonal (মৌসুমি)**

## Section 4(2): Probationary Period
* For a worker whose function is of clerical nature, the probation period is **six months**.
* For other workers, the probation period is **three months**.
* If a worker's service is terminated during probation, no notice or compensation is required unless specified in the contract."""
    },
    {
        "category": "labour",
        "slug": "labour-act-2006-discharge-redundancy",
        "title": "Bangladesh Labour Act, 2006: Section 22-26 (Discharge and Retrenchment)",
        "year": 2006,
        "act_number": "Act XLII",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-05-01",
        "tags": ["labour", "termination", "retrenchment", "compensation"],
        "content": """# Discharge and Retrenchment of Workers

The Bangladesh Labour Act, 2006 outlines clear procedures and compensations for terminating worker services on various grounds.

## Section 22: Discharge (ডিসচার্জ)
A worker may be discharged from service for reasons of physical or mental incapacity or continued ill-health certified by a registered medical practitioner.
* **Compensation**: A discharged worker with at least 1 year of continuous service is entitled to **30 days' wages** for each year of service.

## Section 20: Retrenchment (ছাঁটাই)
A worker may be retrenched from service on the ground of redundancy (surplus workforce).
* **Procedure (Section 21)**: "Last Come, First Go" principle within the specific category of workers.
* **Notice**: One month's notice in writing or pay in lieu of notice.
* **Compensation**: **30 days' wages** for each completed year of service, or gratuity, whichever is higher."""
    },
    {
        "category": "labour",
        "slug": "labour-rules-2015-welfare",
        "title": "Bangladesh Labour Rules, 2015: Welfare Measures and Safety",
        "year": 2015,
        "act_number": "S.R.O. No. 290-Law/2015",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-10-10",
        "tags": ["labour", "welfare", "safety", "factory"],
        "content": """# Bangladesh Labour Rules, 2015: Safety and Welfare

These rules provide detailed guidelines for implementing the safety and welfare provisions of the Bangladesh Labour Act, 2006.

## Health and Hygiene
* **Ventilation and Temperature**: Proper temperature control in production rooms (maximum 30°C to 35°C depending on activity).
* **Overcrowding**: At least 300 cubic feet of space per worker.
* **Drinking Water**: At least 4.5 liters of pure drinking water per worker per day. Must be cooled in factories with 250+ workers.

## Safety Committees
* Every establishment employing **50 or more workers** must form a Safety Committee.
* The committee must consist of equal representatives of employers and workers.
* Tasks include inspecting safety equipment, analyzing accident patterns, and organizing safety drills."""
    },
    {
        "category": "labour",
        "slug": "maternity-benefit-act-1939",
        "title": "Maternity Benefit provisions in Labour Act 2006",
        "year": 2006,
        "act_number": "Act XLII",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-05-01",
        "tags": ["labour", "maternity", "women", "benefit"],
        "content": """# Maternity Benefit Provisions

Sections 45 to 50 of the Bangladesh Labour Act, 2006 govern maternity benefits for female employees.

## Prohibition of Employment of Women (Section 45)
No employer shall knowingly employ a woman in any establishment:
* During the **eight weeks** immediately following the day of her delivery.
* For doing arduous physical work during the ten weeks prior to delivery.

## Right to Maternity Benefit (Section 46)
Every female worker is entitled to maternity benefit for a total of **16 weeks (8 weeks pre-natal and 8 weeks post-natal)**, provided she has worked under the employer for at least **6 months** preceding the delivery.

## Calculation of Benefit (Section 48)
* The benefit is paid at the rate of the average daily wage (divided by the working days of the last three months).
* Paid in cash as a fully paid leave."""
    },
    {
        "category": "labour",
        "slug": "labour-act-2006-working-hours",
        "title": "Bangladesh Labour Act, 2006: Section 100-108 (Working Hours and Overtime)",
        "year": 2006,
        "act_number": "Act XLII",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-05-01",
        "tags": ["labour", "hours", "overtime", "wages"],
        "content": """# Working Hours and Overtime Regulations

The law protects workers against excessive work hours and ensures proper compensation for extra labor.

## Section 100: Daily Hours
No adult worker shall ordinarily be required or allowed to work in an establishment for more than **eight hours** in any day.

## Section 102: Weekly Hours
* Normal weekly working hours are capped at **forty-eight hours**.
* Total weekly hours, including overtime, cannot exceed **sixty hours** in a week.
* The average weekly hours in a year must not exceed fifty-six hours.

## Section 108: Overtime Wages
Where a worker works for more than the normal hours (8 hours daily or 48 hours weekly), they are entitled to overtime wages calculated at **double the rate of their ordinary basic wages**."""
    },
    {
        "category": "labour",
        "slug": "labour-act-2006-gratuity",
        "title": "Bangladesh Labour Act, 2006: Gratuity & Provident Fund",
        "year": 2006,
        "act_number": "Act XLII",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-05-01",
        "tags": ["labour", "gratuity", "provident-fund", "retirement"],
        "content": """# Gratuity and Provident Fund Requirements

Gratuity is a statutory retirement benefit payable to workers upon cessation of employment.

## Definition of Gratuity (Section 2(10))
"Gratuity" means the wages payable to a worker:
* Equivalent to **30 days' wages** (based on the last basic wage drawn) for every completed year of service, or
* **45 days' wages** for service exceeding 10 years.

## Eligibility
A worker who completes at least **5 years** of continuous service under the same employer is eligible for gratuity upon resignation, retirement, or termination (except dismissal for misconduct).

## Provident Fund (Section 251)
* Every factory/establishment in the private sector employing 100+ workers can set up a Provident Fund.
* It must be a contributory fund, where both the worker and employer contribute equally (usually 7-10% of basic wages)."""
    },

    # CRIMINAL (6 documents)
    {
        "category": "criminal",
        "slug": "special-powers-act-1974-detention",
        "title": "Special Powers Act, 1974: Section 3 (Power to Detain)",
        "year": 1974,
        "act_number": "Act XIV",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-04-12",
        "tags": ["criminal-law", "preventive-detention", "national-security", "special-powers"],
        "content": """# Section 3: Power to Make Orders Detaining Certain Persons

The Government may, if satisfied with respect to any person that with a view to preventing him from doing any **prejudicial act** it is necessary so to do, make an order directing that such person be detained.

## Prejudicial Act Defined (Section 2(f))
Any act intended or likely to:
* Prejudice the sovereignty or defense of Bangladesh.
* Prejudice friendly relations with foreign powers.
* Threaten public safety or maintenance of public order.
* Create feelings of enmity or hatred between different communities.
* Disrupt supplies of essential services.

## Safeguards & Limitations
* **Grounds of Detention**: Must be communicated to the detenu within **15 days** of detention.
* **Advisory Board Review**: Every detention case must be placed before an Advisory Board within **120 days**.
* **High Court Intervention**: Can be challenged via a Writ of Habeas Corpus under Article 102 of the Constitution."""
    },
    {
        "category": "criminal",
        "slug": "arms-act-1878-unlicensed",
        "title": "The Arms Act, 1878: Section 19 (Penalties for Unlicensed Arms)",
        "year": 1878,
        "act_number": "Act XI",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2022-09-30",
        "tags": ["criminal-law", "weapons", "licensing", "arms-possession"],
        "content": """# Section 19: Penalties for Breach of Sections 5, 13, 14, and 15

This section governs the illegal possession, manufacture, and sale of firearms and ammunition without a valid license in Bangladesh.

## Offences and Punishment
Whoever commits any of the following offences:
* Manufactures, converts or sells arms without a license.
* Keeps or exposes for sale any arms without a license.
* Carries or possesses any arms or ammunition in contravention of Sections 13, 14 or 15.

Shall be punished with **imprisonment for life** or with rigorous imprisonment for a term which may extend to **14 years**, and shall not be less than **7 years**.

## Judicial Interpretation
Possession must be conscious and active. Joint family possession requires proof of knowledge of the specific accused regarding the existence of the weapon."""
    },
    {
        "category": "criminal",
        "slug": "narcotics-control-act-2018",
        "title": "Narcotics Control Act, 2018: Section 36 (Penalties Table)",
        "year": 2018,
        "act_number": "Act No. 63 of 2018",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-02-28",
        "tags": ["criminal-law", "narcotics", "drug-offences", "punishment"],
        "content": """# Section 36: Penalties for Drug Possession, Cultivation, and Trafficking

This section contains a comprehensive table mapping drug types and quantities to specific punishments.

## Category 'A' Drugs (e.g., Yaba, Heroin, Cocaine)
* **Heroin/Cocaine (exceeding 25 grams)**: Death penalty or life imprisonment.
* **Yaba (Methamphetamine tablets)**:
  * Up to 200 tablets: 1 to 5 years imprisonment and fine.
  * 200 to 10,000 tablets: 5 to 10 years imprisonment.
  * Exceeding 10,000 tablets: Death penalty or life imprisonment.

## Category 'B' Drugs (e.g., Cannabis, Phensedyl)
* **Cannabis (exceeding 10 kg)**: 5 to 10 years imprisonment and fine.
* **Phensedyl (Codeine syrup, exceeding 100 bottles)**: Life imprisonment or 5 to 10 years imprisonment.

## Key Features
* Strict liability applies to possession.
* Establishing a drug-testing laboratory report is mandatory to sustain a conviction."""
    },
    {
        "category": "criminal",
        "slug": "cyber-security-act-2023",
        "title": "Cyber Security Act, 2023: Section 21-25 (Digital Offences)",
        "year": 2023,
        "act_number": "Act No. 28 of 2023",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-09-18",
        "tags": ["criminal-law", "cyber-security", "digital-crime", "speech"],
        "content": """# Cyber Security Act, 2023 (Replacement of Digital Security Act, 2018)

This act regulates cyber activities, protects digital infrastructure, and defines offences related to computer networks.

## Section 21: Propaganda against Liberation War, Father of the Nation, National Anthem
* Punishment: Imprisonment for a term not exceeding **5 years** or a fine not exceeding BDT 1 crore, or both.

## Section 25: Transmitting Offensive, False or Defamatory Information
* Punishment: Imprisonment for a term not exceeding **2 years** or a fine not exceeding BDT 3 lakhs.
* Recidivism (repeat offence): Imprisonment up to 5 years or fine up to BDT 10 lakhs.

## Bail Status
Under the Cyber Security Act 2023, several sections that were non-bailable under the Digital Security Act 2018 have been made **bailable**, providing judicial discretion for release pending trial."""
    },
    {
        "category": "criminal",
        "slug": "crpc-1898-section-54-arrest",
        "title": "Code of Criminal Procedure, 1898: Section 54 (Arrest without Warrant)",
        "year": 1898,
        "act_number": "Act V of 1898",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-03-01",
        "tags": ["criminal-law", "procedure", "arrest", "police-power"],
        "content": """# Section 54: When Police may Arrest without Warrant

Any police officer may, without an order from a Magistrate and without a warrant, arrest any person:

1. Who has been concerned in any **cognizable offence** or against whom a reasonable complaint has been made, or credible information has been received.
2. Having in his possession without lawful excuse any implement of house-breaking.
3. Who has been proclaimed as an offender.
4. In whose possession anything is found which may reasonably be suspected to be stolen property.
5. Who obstructs a police officer while in the execution of his duty, or who has escaped or attempts to escape from lawful custody.

## High Court Division Guidelines (BLAST Case)
The Supreme Court has issued binding guidelines restricting the abuse of Section 54:
* The officer must record reasons in writing.
* The arrestee must be allowed to meet their lawyer.
* Medical examination is required if torture is alleged."""
    },
    {
        "category": "criminal",
        "slug": "penal-code-1860-theft",
        "title": "The Penal Code, 1860: Section 378-379 (Theft)",
        "year": 1860,
        "act_number": "Act XLV",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-01-15",
        "tags": ["penal-code", "theft", "property-crime", "criminal-liability"],
        "content": """# Section 378: Theft

Whoever, intending to take dishonestly any movable property out of the possession of any person without that person's consent, moves that property in order to such taking, is said to commit theft.

## Essential Ingredients
1. **Dishonest Intention**: Intention to cause wrongful gain or wrongful loss.
2. **Movable Property**: Property must be capable of being moved.
3. **Out of Possession**: Property must be in the possession of someone else.
4. **Without Consent**: Express or implied.
5. **Moving**: The actual displacement of the property.

## Section 379: Punishment for Theft
Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to **three years**, or with fine, or with both."""
    },

    # CIVIL (6 documents)
    {
        "category": "civil",
        "slug": "transfer-of-property-act-1882-sale",
        "title": "Transfer of Property Act, 1882: Section 54 (Sale of Immovable Property)",
        "year": 1882,
        "act_number": "Act IV of 1882",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-07-20",
        "tags": ["civil-law", "property-transfer", "sale-deed", "ownership"],
        "content": """# Section 54: Sale Defined

"Sale" is a transfer of ownership in exchange for a price paid or promised or part-paid and part-promised.

## Sale how Made
* Such transfer, in the case of tangible immovable property of the value of **BDT 100 and upwards**, or in the case of a reversion or other intangible thing, can be made only by a **registered instrument**.
* In the case of tangible immovable property of a value less than BDT 100, transfer may be made either by a registered instrument or by delivery of the property.

## Contract for Sale
A contract for the sale of immovable property is a contract that a sale of such property shall take place on terms settled between the parties. It does not, of itself, create any interest in or charge on such property."""
    },
    {
        "category": "civil",
        "slug": "cpc-1908-res-judicata",
        "title": "Code of Civil Procedure, 1908: Section 11 (Res Judicata)",
        "year": 1908,
        "act_number": "Act V of 1908",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-04-10",
        "tags": ["civil-procedure", "res-judicata", "lawsuit", "judgement"],
        "content": """# Section 11: Res Judicata

No Court shall try any suit or issue in which the matter directly and substantially in issue has been directly and substantially in issue in a former suit between the same parties, or between parties under whom they or any of them claim, litigating under the same title, in a Court competent to try such subsequent suit or the suit in which such issue has been subsequently raised, and has been heard and finally decided by such Court.

## Purpose of Res Judicata
* **Interest Reipublicae Ut Sit Finis Litium**: It is in the interest of the State that there should be an end to litigation.
* **Nemo Debet Bis Vexari Pro Una Et Eadem Causa**: No man ought to be twice vexed for one and the same cause.

## Constructive Res Judicata (Explanation IV)
Any matter which might and ought to have been made a ground of defense or attack in such former suit shall be deemed to have been a matter directly and substantially in issue in such suit."""
    },
    {
        "category": "civil",
        "slug": "cpc-1908-temporary-injunction",
        "title": "Code of Civil Procedure, 1908: Order 39 (Temporary Injunctions)",
        "year": 1908,
        "act_number": "Act V of 1908",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-04-10",
        "tags": ["civil-procedure", "injunction", "stay-order", "interlocutory-relief"],
        "content": """# Order XXXIX: Temporary Injunctions and Interlocutory Orders

Temporary injunctions are designed to preserve the status quo of a disputed property pending the final disposal of a civil suit.

## Rule 1: Cases in which temporary injunction may be granted
Where in any suit it is proved by affidavit or otherwise:
* (a) That any property in dispute in a suit is in danger of being wasted, damaged or alienated by any party, or wrongfully sold in execution of a decree, or
* (b) That the defendant threatens, or intends, to remove or dispose of his property with intent to defraud his creditors.

## Three Pillars for Granting Injunction
The plaintiff must satisfy the court of three conditions:
1. **Prima Facie Case**: A strong arguable case in favor of the plaintiff.
2. **Irreparable Loss**: Injury that cannot be adequately compensated by money.
3. **Balance of Inconvenience**: Greater hardship will be caused to the plaintiff if the injunction is refused than to the defendant if granted."""
    },
    {
        "category": "civil",
        "slug": "muslim-family-laws-ordinance-1961",
        "title": "Muslim Family Laws Ordinance, 1961: Section 6 (Polygamy)",
        "year": 1961,
        "act_number": "Ordinance VIII of 1961",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-06-12",
        "tags": ["family-law", "marriage", "polygamy", "divorce"],
        "content": """# Section 6: Polygamy

No man, during the subsistence of an existing marriage, shall, except with the previous permission in writing of the Arbitration Council, contract another marriage.

## Application Process
* An application for permission must be submitted to the Chairman of the Union Parishad or Pourashava.
* The application must state the reasons for the proposed marriage and whether the consent of the existing wife/wives has been obtained.
* The Arbitration Council will evaluate if the proposed marriage is "necessary and just" (e.g., sterility of existing wife, physical unfitness for conjugal relations, or willful avoidance of conjugal rights).

## Consequences of Violation
If a man contracts a polygamous marriage without permission:
1. He must immediately pay the entire amount of the **dower (Mohr)**, whether prompt or deferred, due to the existing wife/wives.
2. He is liable to conviction and punishment of simple imprisonment up to **one year** or a fine up to BDT 10,000 (amended in some contexts), or both.
3. The marriage itself remains valid but the offence is prosecutable."""
    },
    {
        "category": "civil",
        "slug": "family-courts-ordinance-1985",
        "title": "Family Courts Ordinance, 1985: Section 5 (Jurisdiction)",
        "year": 1985,
        "act_number": "Ordinance XVIII of 1985",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-03-25",
        "tags": ["family-law", "jurisdiction", "dower", "maintenance", "custody"],
        "content": """# Section 5: Jurisdiction of Family Courts

Subject to the provisions of this Ordinance, a Family Court shall have exclusive jurisdiction to entertain, try and dispose of suits relating to, or arising out of, all or any of the following matters:

1. **Dissolution of Marriage (Talaq/Divorce)**
2. **Restitution of Conjugal Rights**
3. **Dower (Mohr)**
4. **Maintenance (Nafaqah)**
5. **Guardianship and Custody of Children**

## Key Rules
* The Court of Assistant Judge acts as the Family Court.
* The Civil Procedure Code (CPC) and Evidence Act do **not** apply strictly to Family Court proceedings, allowing faster, non-formal resolutions.
* Alternative Dispute Resolution (ADR) via pre-trial compromise hearings is mandatory under Section 10."""
    },
    {
        "category": "civil",
        "slug": "hindu-marriage-registration-act-2012",
        "title": "Hindu Marriage Registration Act, 2012",
        "year": 2012,
        "act_number": "Act No. 40 of 2012",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2022-11-10",
        "tags": ["family-law", "hindu-marriage", "registration", "marriage-certificate"],
        "content": """# Hindu Marriage Registration Act, 2012

This Act was enacted to provide legal security to Hindu women and facilitate proof of Hindu marriages in Bangladesh.

## Voluntary Registration
Unlike Muslim marriage registration, registration of a Hindu marriage is **voluntary** and not compulsory.
* Non-registration does not affect the validity of a marriage conducted under Hindu religious rites.
* However, a registered certificate serves as conclusive proof of marriage for legal purposes (e.g., passports, visas, property inheritance disputes).

## Registrar Appointment
The government appoints Hindu Marriage Registrars for local areas who maintain registers and issue official marriage certificates."""
    },

    # TAX (6 documents)
    {
        "category": "tax",
        "slug": "income-tax-act-2023-overview",
        "title": "Income Tax Act, 2023: Overview of Heads of Income",
        "year": 2023,
        "act_number": "Act No. 12 of 2023",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-06-25",
        "tags": ["tax-law", "income-tax", "revenue", "heads-of-income"],
        "content": """# Heads of Income under the Income Tax Act, 2023

The new Income Tax Act, 2023 consolidates income into specific categories (heads) for tax assessment.

## Nine Heads of Income
1. **Employment Income**: Salaries, wages, pensions.
2. **Rent Income**: Income from renting house property or land.
3. **Agricultural Income**: Income from farming, livestock, etc.
4. **Income from Business**: Profits and gains of business operations.
5. **Capital Gains**: Profits from selling capital assets (e.g., shares, land).
6. **Income from Financial Assets**: Interest on bank deposits, treasury bonds, dividends.
7. **Income from Other Sources**: Any income not falling under other categories.
8. **Share of Income from Partner in Firm**
9. **Income of Associated Undertakings**

## Key Changes in 2023 Act
* Simplification of tax return forms.
* Introduction of digital filing platforms.
* Stricter penalties for non-submission of returns by taxable individuals."""
    },
    {
        "category": "tax",
        "slug": "vat-act-2012-registration",
        "title": "Value Added Tax & Supplementary Duty Act, 2012: Registration Thresholds",
        "year": 2012,
        "act_number": "Act No. 47 of 2012",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-06-05",
        "tags": ["tax-law", "vat", "business-registration", "threshold"],
        "content": """# VAT Registration and Turnover Tax

Under the VAT & Supplementary Duty Act, 2012, businesses must register for VAT or pay Turnover Tax depending on their annual sales volume.

## Thresholds (as updated in Finance Acts)
* **VAT Registration Threshold**: Annual turnover of **BDT 3 crore (30 million)** and above. Must obtain a Business Identification Number (BIN).
* **Turnover Tax Threshold**: Annual turnover between **BDT 50 lakhs (5 million)** and **BDT 3 crore**. Turnover tax rate is **4%**.
* **Exempted Threshold**: Annual turnover below **BDT 50 lakhs**.

## Mandatory VAT Registration (Regardless of Turnover)
Certain sectors must register for VAT regardless of their turnover, including:
* Importers and Exporters.
* Manufacturers of luxury items.
* Specific services (hotels, restaurants, consulting firms)."""
    },
    {
        "category": "tax",
        "slug": "customs-act-1969-smuggling",
        "title": "The Customs Act, 1969: Section 156 (Penalties for Smuggling)",
        "year": 1969,
        "act_number": "Act IV of 1969",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-09-01",
        "tags": ["tax-law", "customs", "smuggling", "import-duty"],
        "content": """# Section 156: Punishment for Offences under the Customs Act

This section contains a table outlining penalties for smuggling, misdeclaration of goods, and evasion of customs duties.

## Smuggling Offences
* If any goods are smuggled into or out of Bangladesh:
  * The goods are confiscated.
  * The person concerned is liable to imprisonment for a term which may extend to **14 years** and shall not be less than **2 years**.
  * Fines may be imposed up to **ten times** the value of the smuggled goods.

## Misdeclaration of Value/Description
* Importers declaring lower values to evade duties are penalized with fines up to **200%** of the duty evaded, and the goods may be detained."""
    },
    {
        "category": "tax",
        "slug": "finance-act-2024-individual-tax-slabs",
        "title": "Finance Act, 2024: Individual Income Tax Slabs",
        "year": 2024,
        "act_number": "Act No. 15 of 2024",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2024-06-30",
        "tags": ["tax-law", "finance-act", "tax-slabs", "budget"],
        "content": """# Individual Income Tax Slabs (Assessment Year 2024-2025)

The Finance Act, 2024 prescribes the rates of income tax for individual taxpayers.

## General Taxpayers (Male)
* **First BDT 3,50,000**: Nil (0%)
* **Next BDT 1,00,000**: 5%
* **Next BDT 3,00,000**: 10%
* **Next BDT 4,00,000**: 15%
* **Next BDT 5,00,000**: 20%
* **On balance income**: 25%

## Tax-Exempt Limit for Special Categories
* **Female Taxpayers & Seniors (65+ years)**: BDT 4,00,000
* **Physically Challenged Individuals**: BDT 4,75,000
* **Gazetted War-Wounded Freedom Fighters**: BDT 5,00,000"""
    },
    {
        "category": "tax",
        "slug": "income-tax-act-2023-tds",
        "title": "Income Tax Act, 2023: Tax Deducted at Source (TDS)",
        "year": 2023,
        "act_number": "Act No. 12 of 2023",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-06-25",
        "tags": ["tax-law", "tds", "withholding-tax", "compliance"],
        "content": """# Tax Deducted at Source (TDS) / Withholding Tax

TDS is an advance tax collection mechanism where the payer deducts tax before making payments.

## Common TDS Rates
* **Salary (Section 125)**: Average rate based on estimated annual income.
* **Contractor Payments (Section 89)**: 2% to 7% depending on the contract value.
* **House Rent (Section 114)**: 5% of monthly rent if exceeding threshold.
* **Bank Interest (Section 102)**:
  * 10% for taxpayers who have submitted proof of tax return filing (PSR).
  * 15% for non-filers of tax returns.
  * 20% for corporate entities.

## Consequences of Non-Compliance
Failure of a withholding authority to deduct or deposit TDS results in:
* Disallowance of the expense in the employer's tax assessment.
* Penalty interest of **2% per month** on the unpaid TDS amount."""
    },
    {
        "category": "tax",
        "slug": "customs-act-1969-appeals",
        "title": "The Customs Act, 1969: Appeal & ADR Processes",
        "year": 1969,
        "act_number": "Act IV of 1969",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Official Gazette",
        "updated_at": "2023-09-01",
        "tags": ["tax-law", "customs", "appeals", "adr", "dispute"],
        "content": """# Customs Appeals and Alternative Dispute Resolution

When disputes arise regarding valuation or classification of imported goods, the importer has legal remedies.

## Appeal to Commissioner (Appeals)
* Must be filed within **60 days** of the assessment/order.
* Importer must deposit **50%** of the disputed duty before filing the appeal.

## Appeal to Appellate Tribunal
* Appeal against the Commissioner (Appeals) order.
* Must be filed within **60 days** of receiving the order.

## Alternative Dispute Resolution (ADR)
* Importers can apply for ADR to resolve disputes quickly.
* **Benefits**: No need to pay the 50% deposit; resolution usually reached in 30 days through negotiation with facilitators appointed by the National Board of Revenue (NBR)."""
    },

    # JUDGEMENTS (11 documents)
    {
        "category": "judgements",
        "slug": "anwar-hossain-v-bangladesh-8th-amendment",
        "title": "Anwar Hossain Chowdhury v. Bangladesh (8th Amendment Case)",
        "year": 1989,
        "act_number": "1989 BLD (Spl) 1",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (Appellate Division)",
        "updated_at": "1989-09-02",
        "tags": ["judgement", "constitution", "judicial-review", "basic-structure"],
        "content": """# Anwar Hossain Chowdhury v. Bangladesh

**Court**: Supreme Court of Bangladesh (Appellate Division)  
**Citation**: 1989 BLD (Spl) 1; 41 DLR (AD) 165  
**Bench**: B.H. Chowdhury, Shahabuddin Ahmed, M.H. Rahman, A.T.M. Afzal JJ.  

## Facts of the Case
By the Constitution (Eighth Amendment) Act, 1988, Article 100 of the Constitution was amended, establishing six permanent benches of the High Court Division outside Dhaka (in Chittagong, Sylhet, Comilla, Barisal, Jessore, and Rangpur).

The amendment was challenged by two advocates on the ground that it destroyed the unitary character of the judiciary, which is a basic structure of the Constitution.

## Key Issues
1. Can the Parliament amend any part of the Constitution under Article 142?
2. Does the Constitution of Bangladesh contain a "Basic Structure" that is beyond the power of amendment?
3. Did the creation of permanent benches outside Dhaka violate the basic structure?

## Decision & Legal Principles
By a 3:1 majority, the Appellate Division struck down the amendment to Article 100.

* **Basic Structure Doctrine**: The Court ruled that the Constitution has certain "basic structures" or fundamental features (e.g., unitary state, rule of law, independence of the judiciary, judicial review) which cannot be altered or destroyed by amendment under Article 142.
* **Judicial Unity**: The High Court Division is a single, indivisible court. Setting up permanent sovereign benches destroyed its unified jurisdiction and was therefore unconstitutional."""
    },
    {
        "category": "judgements",
        "slug": "masdar-hossain-v-bangladesh-judicial-separation",
        "title": "Secretary, Ministry of Finance v. Masdar Hossain (Separation of Judiciary)",
        "year": 1999,
        "act_number": "52 DLR (AD) 82",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (Appellate Division)",
        "updated_at": "1999-12-02",
        "tags": ["judgement", "judiciary", "separation-of-powers", "constitution"],
        "content": """# Secretary, Ministry of Finance v. Masdar Hossain

**Court**: Supreme Court of Bangladesh (Appellate Division)  
**Citation**: 52 DLR (AD) 82  
**Date of Judgement**: December 2, 1999  

## Background
Article 22 of the Constitution of Bangladesh mandates the separation of the judiciary from the executive organs of the State. However, for decades, judicial officers of the lower courts (magistrates and judges) remained under the administrative control of the executive (Ministry of Public Administration and Ministry of Law).

Masdar Hossain, along with 441 other civil judges, filed a writ petition seeking directions for the implementation of Article 22.

## Key Issues
* Whether the lower judiciary is part of the "civil service of the republic" under the executive branch.
* How to implement the constitutional mandate of separating the lower judiciary from the executive.

## Landmark 12-Point Directions
The Appellate Division issued 12 binding directions to the government, including:
1. **Separate Judicial Service**: Judicial officers must belong to a separate service distinct from the executive civil service.
2. **Judicial Service Commission (JSC)**: Creation of an independent body (JSC) to select and recommend judicial officers.
3. **Separate Pay Commission**: Separation of pay scales for judges.
4. **Amendment of Service Rules**: Striking down rules that placed lower court judges under executive administrative control.

## Impact
This case led to the formal separation of the judiciary on November 1, 2007, and the creation of the Bangladesh Judicial Service Commission (BJSC)."""
    },
    {
        "category": "judgements",
        "slug": "blast-v-bangladesh-guidelines-arrest",
        "title": "Bangladesh Legal Aid and Services Trust (BLAST) v. Bangladesh (Section 54 Guidelines)",
        "year": 2003,
        "act_number": "55 DLR (HCD) 363",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (High Court Division)",
        "updated_at": "2016-05-24",
        "tags": ["judgement", "arrest", "police-abuse", "human-rights"],
        "content": """# BLAST v. Bangladesh (Section 54 Guidelines)

**Court**: Supreme Court of Bangladesh (High Court Division / Appellate Division appeal decided in 2016)  
**Citation**: 55 DLR (HCD) 363; 2016 (4) SC (AD) 1  

## Background
The case was initiated in the public interest following the tragic death of Shamim Reza Rubel, a university student, in police custody after being arrested under Section 54 of the CrPC. 

Section 54 permits arrest without a warrant on mere suspicion, and Section 167 allows police remand (custody for interrogation). These powers were frequently abused to torture detainees.

## Court Findings
The court observed that the power of arrest under Section 54 and remand under Section 167 were inconsistent with the fundamental rights to life, liberty, and protection against torture guaranteed by Articles 31, 32, 33, and 35 of the Constitution.

## Binding Guidelines for Police
The court issued strict guidelines, later upheld with modifications by the Appellate Division in 2016:
* **No Arbitrary Arrest**: Police cannot arrest a person under Section 54 without recording the grounds of suspicion in writing.
* **Information of Arrest**: Police must inform the arrestee's family within 3 hours of the arrest.
* **No Torture**: Remand interrogation must take place in a room with glass walls where the arrestee's lawyer and family can see them.
* **Medical Exam**: The arrestee must be medically examined before and after the remand period."""
    },
    {
        "category": "judgements",
        "slug": "caretaker-government-13th-amendment",
        "title": "Abdul Mannan Khan v. Bangladesh (Caretaker Government Case)",
        "year": 2011,
        "act_number": "64 DLR (AD) 1",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (Appellate Division)",
        "updated_at": "2011-05-10",
        "tags": ["judgement", "constitution", "caretaker-government", "democracy"],
        "content": """# Abdul Mannan Khan v. Bangladesh (13th Amendment)

**Court**: Supreme Court of Bangladesh (Appellate Division)  
**Citation**: 64 DLR (AD) 1  
**Date of Judgement**: May 10, 2011  

## Facts
The Constitution (Thirteenth Amendment) Act, 1996 introduced a non-party Caretaker Government system. Under this system, after the dissolution of Parliament, an interim government headed by a retired Chief Justice would run the state for 90 days and hold national elections.

The amendment was challenged on the grounds that it violated the basic structure of the Constitution, specifically democracy and the independence of the judiciary (by involving judges in executive politics).

## Decision
By a 4:3 majority, the Appellate Division declared the Thirteenth Amendment unconstitutional.

* **Core Rationale**: Democracy is a basic structure of the Constitution. An unelected body running the government violates the democratic principles of representation.
* **Judicial Neutrality**: Involving retired Chief Justices in elections compromises the neutrality and dignity of the judiciary.
* **Doctrine of Necessity**: The court allowed the system to remain for the next two general elections only, in the interest of state stability, though the Parliament subsequently abolished it immediately via the 15th Amendment."""
    },
    {
        "category": "judgements",
        "slug": "blast-v-bangladesh-acid-violence",
        "title": "BLAST & Others v. Bangladesh (Acid Violence Prevention)",
        "year": 2005,
        "act_number": "Writ Petition No. 1290 of 2001",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (High Court Division)",
        "updated_at": "2005-03-15",
        "tags": ["judgement", "acid-violence", "women", "public-interest-litigation"],
        "content": """# BLAST v. Bangladesh (Acid Violence Case)

**Court**: Supreme Court of Bangladesh (High Court Division)  
**Citation**: 25 BLD (HCD) 321  

## Background
Acid attacks against women were rising rapidly in Bangladesh in the late 1990s. Legal Aid groups filed a PIL asserting that the state's failure to regulate the open sale of acid and to prosecute perpetrators violated women's right to life under Article 32.

## Decision
The High Court directed the government to take immediate legislative and administrative actions to curb acid violence.

## Impact
This case directly resulted in the enactment of two major laws:
1. **Acid Crime Prevention Act, 2002**: Introducing death penalty for severe attacks and fast-track tribunals.
2. **Acid Control Act, 2002**: Licensing and regulating the import, storage, and sale of acid."""
    },
    {
        "category": "judgements",
        "slug": "state-v-oishi-rahman-juvenile",
        "title": "State v. Oishi Rahman (Juvenile Delinquency and Sentence Mitigation)",
        "year": 2017,
        "act_number": "Death Reference 107/2015",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (High Court Division)",
        "updated_at": "2017-06-05",
        "tags": ["judgement", "criminal-law", "mitigation", "juvenile", "mental-health"],
        "content": """# State v. Oishi Rahman

**Court**: Supreme Court of Bangladesh (High Court Division)  
**Citation**: 2017 (2) ALR (HCD) 124  

## Facts
Oishi Rahman, a young girl, was convicted of murdering her parents. The Trial Court sentenced her to death. An appeal was filed in the High Court Division to commute the sentence.

## Key Issues
Whether the mental health status, age, and lack of criminal history of the accused could act as mitigating factors to commute a death sentence under Section 302 of the Penal Code.

## Decision & Principles
The High Court commuted her death sentence to life imprisonment.

* **Mitigating Factors**: The court held that while the crime was heinous, the death penalty is reserved for the "rarest of rare" cases.
* The court laid down factors for sentencing mitigation:
  1. Age of the offender at the time of crime.
  2. Mental health evaluation (Oishi suffered from clinical depression and drug addiction).
  3. Lack of prior criminal record.
  4. Behavior during trial and custody."""
    },
    {
        "category": "judgements",
        "slug": "kazi-mukhlesur-rahman-v-bangladesh-berubari",
        "title": "Kazi Mukhlesur Rahman v. Bangladesh (Berubari Agreement)",
        "year": 1974,
        "act_number": "26 DLR (SC) 44",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (Appellate Division)",
        "updated_at": "1974-09-03",
        "tags": ["judgement", "standing", "locus-standi", "sovereignty"],
        "content": """# Kazi Mukhlesur Rahman v. Bangladesh

**Court**: Supreme Court of Bangladesh (Appellate Division)  
**Citation**: 26 DLR (SC) 44  
**Date of Judgement**: September 3, 1974  

## Facts
The petitioner challenged the Delhi Agreement (1974) signed between the Prime Ministers of Bangladesh and India regarding the border demarcation (involving the exchange of the Berubari enclave), claiming it involved secession of territory without parliamentary approval.

The government argued the petitioner had no *locus standi* (standing) to sue, as he was not personally affected.

## Decision & Standing Doctrine
The Appellate Division ruled in favor of standing, opening the doors for Public Interest Litigation (PIL) in Bangladesh.

* **Locus Standi**: The Court held that when a constitutional issue of grave public importance affecting the entire nation (like sovereignty/territory) is raised, any citizen has the standing to bring it before the Court.
* **Sovereignty**: Territory cannot be ceded without a constitutional amendment."""
    },
    {
        "category": "judgements",
        "slug": "arpita-property-case-ministry-land",
        "title": "Ministry of Land v. Subrata Kundu (Arpita Property Case)",
        "year": 2020,
        "act_number": "72 DLR (AD) 203",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (Appellate Division)",
        "updated_at": "2020-06-15",
        "tags": ["judgement", "property-law", "vested-property", "minority-rights"],
        "content": """# Ministry of Land v. Subrata Kundu (Vested/Arpita Property)

**Court**: Supreme Court of Bangladesh (Appellate Division)  
**Citation**: 72 DLR (AD) 203  

## Background
The Vested Property Act (previously Enemy Property Act) was historically used to seize land belonging to the Hindu minority who migrated during the 1965 and 1971 wars. In 2001, the government passed the Vested Property Return Act to return these lands to their rightful owners or heirs. However, administrative delays and disputes persisted.

## Decision
The Supreme Court ruled that lands which are not in the official list of vested properties or where ownership claims have been validated by special tribunals must be returned to the citizens immediately.

* State officers cannot arbitrarily hold or lease out private lands under the guise of vested property.
* Once a tribunal rules in favor of a citizen, the district administration must execute the handover within the statutory period of 30 days."""
    },
    {
        "category": "judgements",
        "slug": "brac-v-tax-commissioner-charity-tax",
        "title": "BRAC v. Commissioner of Taxes (Charity Tax Exemption)",
        "year": 2016,
        "act_number": "68 DLR (AD) 312",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (Appellate Division)",
        "updated_at": "2016-08-01",
        "tags": ["judgement", "tax-law", "ngo", "exemption", "charity"],
        "content": """# BRAC v. Commissioner of Taxes

**Court**: Supreme Court of Bangladesh (Appellate Division)  
**Citation**: 68 DLR (AD) 312  

## Facts
BRAC, the world's largest NGO, operated several commercial enterprises (like Aarong, dairy plants) to fund its charitable activities. The National Board of Revenue (NBR) assessed tax on these commercial incomes, arguing they were business operations and not tax-exempt charity.

BRAC argued that since all profits were directly channeled to charitable programs, the income should remain tax-exempt under the Income Tax Ordinance.

## Decision
The Supreme Court ruled in favor of the NBR, establishing a distinction between charitable activities and commercial enterprises run by a charity.

* **Commercial Income Taxable**: If an NGO conducts commercial business in competition with private entities, those business profits are taxable even if the profits are subsequently spent on charity.
* **Exemption Scope**: Exemption only applies to direct donations and income derived from core charitable activities."""
    },
    {
        "category": "judgements",
        "slug": "bangladesh-shipbreakers-v-belayet-hussain",
        "title": "Bangladesh Ship Breakers Association v. Belayet Hussain (Environmental Compliance)",
        "year": 2010,
        "act_number": "62 DLR (AD) 322",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (Appellate Division)",
        "updated_at": "2010-12-14",
        "tags": ["judgement", "environmental-law", "shipbreaking", "safety"],
        "content": """# Ship Breakers Association v. Belayet Hussain

**Court**: Supreme Court of Bangladesh (Appellate Division)  
**Citation**: 62 DLR (AD) 322  

## Background
The shipbreaking yards in Sitakunda, Chittagong, were operating without basic environmental clearances, causing massive marine pollution and high worker mortality rates due to lack of safety protocols. Environmental groups filed a writ seeking closures of non-compliant yards.

## Decision & Principles
The Supreme Court directed that no ship could be imported for breaking without an "Environmental Clearance Certificate" from the Department of Environment (DoE).

* **Precautionary Principle**: The court ruled that economic development cannot override environmental protection and worker safety.
* **Liability**: Yard owners were held strictly liable for hazardous waste cleanups and were ordered to pay mandatory compensation to families of deceased workers."""
    },
    {
        "category": "judgements",
        "slug": "prof-nurul-islam-v-bangladesh-tobacco-ads",
        "title": "Professor Nurul Islam v. Bangladesh (Ban on Tobacco Advertising)",
        "year": 2000,
        "act_number": "52 DLR (HCD) 413",
        "language": "English",
        "status": "Active",
        "jurisdiction": "Bangladesh",
        "source": "Supreme Court (High Court Division)",
        "updated_at": "2000-02-15",
        "tags": ["judgement", "public-health", "tobacco", "advertising", "right-to-life"],
        "content": """# Professor Nurul Islam v. Bangladesh

**Court**: Supreme Court of Bangladesh (High Court Division)  
**Citation**: 52 DLR (HCD) 413  

## Facts
A public interest litigation was filed by a medical professor challenging the promotional campaigns and advertisements of multinational tobacco companies in Bangladesh (specifically British American Tobacco's "Voyage of Discovery" yacht cruise promotion).

The petitioner argued that promoting lethal products violates the Right to Life under Article 32 by actively promoting a health hazard.

## Decision & Landmark Directive
The High Court held that the Right to Life includes the right to health and clean environment, and that state agencies have a duty to protect citizens from hazardous habits.

* **Advertising Ban**: The Court ordered a complete ban on tobacco advertising in electronic and print media.
* **Statutory Warnings**: Ordered the enforcement of large, visible health warnings on cigarette packets, which paved the way for the Smoking and Tobacco Products Usage (Control) Act, 2005."""
    }
]

# Generate more mock documents if we need around 40 documents (currently we have 5 + 6 + 6 + 6 + 6 + 6 + 11 = 46 documents, which is perfect!)
# Let's double check counts:
# constitution: 5
# acts: 6
# labour: 6
# criminal: 6
# civil: 6
# tax: 6
# judgements: 11
# Total = 46 documents. This is a very good number and fully matches the categories and requested content.

def create_mock_documents():
    os.makedirs(BASE_DIR, exist_ok=True)
    for cat in CATEGORIES.keys():
        os.makedirs(os.path.join(BASE_DIR, cat), exist_ok=True)

    print(f"Generating {len(documents)} documents under {BASE_DIR}...")
    for doc in documents:
        cat_dir = os.path.join(BASE_DIR, doc["category"])
        file_path = os.path.join(cat_dir, f"{doc['slug']}.md")
        
        tags_str = "\n".join([f"  - {tag}" for tag in doc["tags"]])
        
        yaml_front_matter = f"""---
title: "{doc['title']}"
year: {doc['year']}
category: "{CATEGORIES[doc['category']]}"
act_number: "{doc['act_number']}"
language: "{doc['language']}"
status: "{doc['status']}"
jurisdiction: "{doc['jurisdiction']}"
source: "{doc['source']}"
updated_at: "{doc['updated_at']}"
tags:
{tags_str}
---
"""
        full_content = yaml_front_matter + "\n" + doc["content"].strip() + "\n"
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(full_content)
        print(f"Created {doc['category']}/{doc['slug']}.md")

if __name__ == "__main__":
    create_mock_documents()
