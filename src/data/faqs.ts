export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export const faqs: FAQ[] = [
  // NATIONAL LEVEL
  { id: "1", question: "What is the Lok Sabha?", answer: "The Lok Sabha is the lower house of India's bicameral Parliament, consisting of 543 Members of Parliament (MPs) directly elected by the public.", category: "National", keywords: ["lok", "sabha", "parliament", "mp", "national"] },
  { id: "2", question: "How many members are in the Lok Sabha?", answer: "There are 543 constituencies, and thus 543 Members of Parliament (MPs) in the Lok Sabha.", category: "National", keywords: ["how", "many", "members", "lok", "sabha", "543"] },
  { id: "3", question: "What is the term length for the Lok Sabha?", answer: "The Lok Sabha has a 5-year cycle, after which general elections are held.", category: "National", keywords: ["term", "length", "lok", "sabha", "years"] },
  { id: "4", question: "When is the next Lok Sabha election scheduled?", answer: "The next scheduled National (Lok Sabha) election is in 2029.", category: "National", keywords: ["next", "lok", "sabha", "election", "scheduled", "2029"] },
  { id: "5", question: "What issues does the national government handle?", answer: "The national government handles national law, budget, defense, currency, and interstate commerce.", category: "National", keywords: ["issues", "national", "government", "handle", "defense", "budget"] },
  { id: "6", question: "How is an MP elected?", answer: "An MP is elected through a constituency-based direct vote by eligible citizens in that constituency.", category: "National", keywords: ["how", "mp", "elected", "vote", "constituency"] },
  { id: "7", question: "What are the phases of the national election process?", answer: "The phases are: (1) Announcement, (2) Nominations, (3) Campaign, (4) Polling, (5) Counting, and (6) Results.", category: "National", keywords: ["phases", "national", "election", "process", "steps"] },
  
  // STATE LEVEL
  { id: "8", question: "What is a Vidhan Sabha?", answer: "A Vidhan Sabha is the state legislature, consisting of Members of Legislative Assembly (MLAs) elected by voters of that state.", category: "State", keywords: ["vidhan", "sabha", "state", "legislature", "mla"] },
  { id: "9", question: "How many seats are in a state legislature?", answer: "It varies by state, typically ranging from 140 to 294 seats. For example, Karnataka has 224 seats.", category: "State", keywords: ["how", "many", "seats", "state", "legislature"] },
  { id: "10", question: "What does the state government govern?", answer: "The state government is responsible for education, healthcare, police, transport, electricity, and agriculture.", category: "State", keywords: ["what", "state", "government", "govern", "handle", "police"] },
  { id: "11", question: "What is the term length for state elections?", answer: "State elections operate on a 5-year cycle, but they are staggered across different states.", category: "State", keywords: ["term", "length", "state", "elections", "years"] },
  { id: "12", question: "How are MLAs elected?", answer: "MLAs are elected through a constituency-based direct vote within the state.", category: "State", keywords: ["how", "mla", "elected", "vote"] },
  { id: "13", question: "When are the next state elections?", answer: "State elections are scheduled differently for each state, with various elections expected between 2025 and 2027.", category: "State", keywords: ["when", "next", "state", "elections", "scheduled"] },
  
  // LOCAL LEVEL
  { id: "14", question: "What are local elections for?", answer: "Local elections are for electing representatives to Panchayats (villages) or Municipal Corporations (cities).", category: "Local", keywords: ["what", "local", "elections", "panchayat", "municipal"] },
  { id: "15", question: "What is a ward?", answer: "A ward is a micro-constituency used in local elections to elect a direct representative, such as a councilor.", category: "Local", keywords: ["what", "ward", "micro", "constituency"] },
  { id: "16", question: "What issues do local governments handle?", answer: "Local governments manage infrastructure, water, waste management, local roads, and basic local services.", category: "Local", keywords: ["what", "issues", "local", "governments", "handle", "water", "waste"] },
  { id: "17", question: "How often do local elections happen?", answer: "They generally follow a 5-year cycle, though the schedule varies heavily depending on the state.", category: "Local", keywords: ["how", "often", "local", "elections", "happen", "cycle"] },

  // VOTING MECHANISM
  { id: "18", question: "What is an EVM?", answer: "EVM stands for Electronic Voting Machine, which is used to record votes electronically instead of using paper ballots.", category: "Mechanism", keywords: ["what", "evm", "electronic", "voting", "machine"] },
  { id: "19", question: "What is a VVPAT?", answer: "VVPAT stands for Voter Verifiable Paper Audit Trail. It prints a paper slip that allows voters to verify that their vote was cast correctly.", category: "Mechanism", keywords: ["what", "vvpat", "paper", "audit", "trail", "verify"] },
  { id: "20", question: "Can I vote by mail or post?", answer: "A postal ballot option is available for specific groups such as traveling officials, the elderly, and persons with disabilities.", category: "Mechanism", keywords: ["can", "vote", "mail", "post", "postal", "ballot"] },
  { id: "21", question: "What does NOTA mean?", answer: "NOTA stands for 'None Of The Above', allowing voters to reject all candidates. These votes are counted separately.", category: "Mechanism", keywords: ["what", "nota", "mean", "none", "reject"] },
  { id: "22", question: "How secure are EVMs?", answer: "EVMs are secured through multiple layers, including sealed machines, paper audit trails (VVPAT), and the presence of independent observers.", category: "Mechanism", keywords: ["how", "secure", "evms", "security", "hack"] },
  { id: "23", question: "How are votes counted?", answer: "Votes are tabulated through centralized counting on a single designated day.", category: "Mechanism", keywords: ["how", "votes", "counted", "tabulation"] },
  
  // ELIGIBILITY
  { id: "24", question: "What is the minimum age to vote in India?", answer: "You must be at least 18 years old to vote in Indian elections.", category: "Eligibility", keywords: ["minimum", "age", "vote", "india", "18", "years"] },
  { id: "25", question: "Can non-citizens vote in India?", answer: "No, you must be an Indian citizen to vote.", category: "Eligibility", keywords: ["can", "non-citizens", "foreigner", "vote", "india"] },
  { id: "26", question: "How long do I need to live in a place to vote there?", answer: "You must be a resident of the constituency for at least 6 months.", category: "Eligibility", keywords: ["how", "long", "live", "residence", "vote", "months"] },
  { id: "27", question: "Can criminals vote?", answer: "Individuals with certain criminal convictions may be disqualified from voting, depending on the nature of the conviction and current legal status.", category: "Eligibility", keywords: ["can", "criminals", "convicted", "vote", "disqualified"] },
  { id: "28", question: "Do I need to register to vote?", answer: "Yes, you must appear in the electoral roll of your constituency to cast a vote.", category: "Eligibility", keywords: ["do", "need", "register", "vote", "electoral", "roll"] },

  // PROCESS/MISC (to round out 50 pairs with variations)
  { id: "29", question: "What happens if there's a tie in an election?", answer: "If there's an exact tie, the winner is usually decided by drawing lots by the returning officer, as per electoral rules.", category: "Mechanism", keywords: ["what", "happens", "tie", "election", "draw"] },
  { id: "30", question: "Who conducts the elections in India?", answer: "The Election Commission of India (ECI) conducts national and state elections. State Election Commissions conduct local elections.", category: "National", keywords: ["who", "conducts", "elections", "india", "eci", "commission"] },
  { id: "31", question: "What is the Model Code of Conduct?", answer: "The Model Code of Conduct is a set of guidelines issued by the ECI regulating political parties and candidates prior to elections to ensure free and fair polling.", category: "Process", keywords: ["what", "model", "code", "conduct", "mcc", "guidelines"] },
  { id: "32", question: "Can I vote if I don't have a Voter ID card?", answer: "Yes, if your name is on the electoral roll, you can vote using alternate approved photo ID documents like an Aadhaar card, passport, or driving license.", category: "Eligibility", keywords: ["can", "vote", "no", "voter", "id", "card", "alternate"] },
  { id: "33", question: "How do I check if my name is on the voter list?", answer: "You can verify your name on the electoral roll through the official Election Commission portal online or via their voter helpline app.", category: "Eligibility", keywords: ["how", "check", "name", "voter", "list", "roll"] },
  { id: "34", question: "What is a constituency?", answer: "A constituency is a specific geographic area that elects one representative to a legislative body.", category: "Process", keywords: ["what", "constituency", "area", "representative"] },
  { id: "35", question: "How much time is given for election campaigning?", answer: "Typically, there is a campaign period of about 14 to 30 days before polling, which officially stops 48 hours before voting begins.", category: "Process", keywords: ["how", "much", "time", "campaigning", "days", "48"] },
  { id: "36", question: "What is a polling booth?", answer: "A polling booth is a designated location where voters go to cast their vote on election day.", category: "Process", keywords: ["what", "polling", "booth", "station"] },
  { id: "37", question: "Who ensures security at the polling station?", answer: "Police and Central Armed Police Forces (CAPF) are deployed to ensure security at polling stations.", category: "Process", keywords: ["who", "ensures", "security", "polling", "station", "police"] },
  { id: "38", question: "What is a general election?", answer: "A general election is a national election held to constitute a new Lok Sabha after its 5-year term expires.", category: "National", keywords: ["what", "general", "election", "lok", "sabha"] },
  { id: "39", question: "Can an NRI vote in Indian elections?", answer: "Yes, Non-Resident Indians (NRIs) can register and vote, but they must be physically present at their registered polling booth in India to cast their vote.", category: "Eligibility", keywords: ["can", "nri", "abroad", "vote", "indian"] },
  { id: "40", question: "What is the role of an election observer?", answer: "Election observers are officers appointed by the ECI to oversee the polling and counting process to ensure fairness and neutrality.", category: "Process", keywords: ["what", "role", "election", "observer", "oversee"] },
  { id: "41", question: "Is voting mandatory in India?", answer: "No, voting is a constitutional right in India, but it is not legally mandatory.", category: "Eligibility", keywords: ["is", "voting", "mandatory", "compulsory", "india"] },
  { id: "42", question: "How is the Prime Minister elected?", answer: "The Prime Minister is not directly elected by voters. The leader of the political party or coalition that wins a majority of seats in the Lok Sabha is appointed Prime Minister by the President.", category: "National", keywords: ["how", "prime", "minister", "pm", "elected"] },
  { id: "43", question: "How is the Chief Minister elected?", answer: "Similar to the PM, the Chief Minister is the leader of the party or coalition holding a majority in the State Vidhan Sabha.", category: "State", keywords: ["how", "chief", "minister", "cm", "elected"] },
  { id: "44", question: "What is a by-election?", answer: "A by-election is held to fill a political office that has become vacant between general elections (e.g., due to resignation or death of the incumbent).", category: "Process", keywords: ["what", "by-election", "vacant", "fill"] },
  { id: "45", question: "Can a person contest from multiple constituencies?", answer: "Yes, under current rules, a candidate can contest an election from up to two constituencies simultaneously.", category: "Process", keywords: ["can", "person", "contest", "multiple", "constituencies", "two"] },
  { id: "46", question: "What is an Exit Poll?", answer: "An exit poll is a survey taken from voters leaving polling stations to predict the election outcome. They can only be published after all phases of voting are complete.", category: "Process", keywords: ["what", "exit", "poll", "survey", "predict"] },
  { id: "47", question: "Are political parties funded by the government?", answer: "No, political parties rely on private donations, electoral bonds, and party memberships for funding, not direct state funding.", category: "Process", keywords: ["are", "political", "parties", "funded", "government", "donations"] },
  { id: "48", question: "What is a manifesto?", answer: "A manifesto is a published declaration of the intentions, motives, or views of a political party before an election.", category: "Process", keywords: ["what", "manifesto", "promises", "party"] },
  { id: "49", question: "What happens on counting day?", answer: "EVMs are unsealed under tight security and the votes recorded in them are tabulated centrally. Results are announced constituency by constituency.", category: "Process", keywords: ["what", "happens", "counting", "day", "results"] },
  { id: "50", question: "Who has the power to disqualify a candidate?", answer: "The Election Commission can disqualify candidates for violating election laws or the Model Code of Conduct.", category: "Process", keywords: ["who", "power", "disqualify", "candidate", "eci"] }
];
