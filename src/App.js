import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar, Settings, Bell, User, Home, Target, Shield, Zap, ChevronRight, Menu, X, ArrowRight, CornerDownLeft, MessageCircle, DollarSign as DollarSignIcon, BarChart, TrendingUp as TrendingUpIcon, Landmark, TrendingDown as TrendingDownIcon, Umbrella, CreditCard } from 'lucide-react';

// Main App component that handles routing between pages
export default function App() {
  // State to manage the current page. 'home' is the default.
  const [currentPage, setCurrentPage] = useState('home');

  // Function to navigate to the dashboard page
  const goToDashboard = () => {
    setCurrentPage('dashboard');
  };

  // Function to navigate to the financial coach page
  const goToCoach = () => {
    setCurrentPage('coach');
  };

  // Function to navigate back to the home page
  const goToHome = () => {
    setCurrentPage('home');
  };

  // Renders the correct component based on the current page state
  switch (currentPage) {
    case 'dashboard':
      return <PortfolioDashboard goToHome={goToHome} />;
    case 'coach':
      return <FinancialCoach goToHome={goToHome} />;
    case 'home':
    default:
      return <FinancialPortfolioLanding goToDashboard={goToDashboard} goToCoach={goToCoach} />;
  }
}

// Financial Coach Component - Converted from the provided HTML/JS
function FinancialCoach({ goToHome }) {
  // State to store chat messages. Each message is an object with 'sender' and 'text'.
  const [messages, setMessages] = useState([]);
  // State to store the user's input.
  const [userInput, setUserInput] = useState('');
  // State to handle the loading indicator when the AI is thinking.
  const [isLoading, setIsLoading] = useState(false);
  // State to store the currently selected language.
  const [currentLanguage, setCurrentLanguage] = useState('hi');

  // LLM responses for pre-defined topics in different languages
  const responses = {
    hi: {
      initial: `नमस्ते! मैं धन मित्र हूँ। मैं आपको पैसे के बारे में आसान भाषा में समझाऊंगा। 💰<br/><br/><strong>जैसे:</strong> "बचत करना चावल को बरसात के दिन के लिए रखने जैसा है।"<br/><br/>आप क्या सीखना चाहेंगे? नीचे दिए गए topics पर क्लिक करें या अपना सवाल टाइप करें!`,
      savings: `<strong>बचत के बारे में जानें! 💰</strong><br/><br/>🏺 <strong>कहानी से समझें:</strong> पुराने समय में लोग अनाज के बड़े घड़ों में चावल रखते थे। जब बारिश नहीं आती या फसल खराब होती, तो वह चावल काम आता था।<br/><br/>बचत भी वैसी ही है - आज का पैसा कल के लिए रखना! 🌾<br/><br/><strong>आसान नियम:</strong><br/>• हर महीने कमाई का 20% बचत करें<br/>• पहले बचत, फिर खर्च<br/>• बचत को अलग खाते में रखें<br/><br/><strong>उदाहरण:</strong> अगर आप ₹15,000 कमाते हैं, तो ₹3,000 बचत करें।`,
      budget: `<strong>बजट बनाना सीखें! 📊</strong><br/><br/>🍽️ <strong>कहानी से समझें:</strong> जैसे आप महीने भर के लिए राशन की लिस्ट बनाते हैं - कितना चावल, दाल, तेल चाहिए। वैसे ही पैसे के लिए भी योजना बनानी चाहिए।<br/><br/><strong>50-30-20 का नियम:</strong><br/>🏠 <strong>50%</strong> - ज़रूरी चीज़ें (किराया, खाना, बिजली)<br/>🎯 <strong>30%</strong> - मनोरंजन और शौक<br/>💰 <strong>20%</strong> - बचत और निवेश<br/><br/><strong>गिग वर्कर के लिए टिप:</strong> अच्छे महीने में ज्यादा बचत करें!`,
      investment: `<strong>निवेश = पैसे को बढ़ाना 🌱</strong><br/><br/>🌾 <strong>कहानी से समझें:</strong> किसान बीज बोता है आज, फसल काटता है कल। वैसे ही निवेश में आज पैसा लगाते हैं, भविष्य में ज्यादा मिलता है।<br/><br/><strong>शुरुआती निवेश:</strong><br/>• SIP (हर महीने ₹500 से शुरू करें)<br/>• PPF (15 साल का लॉक-इन)<br/>• ELSS (टैक्स बचत + रिटर्न)<br/><br/>⚠️ <strong>याद रखें:</strong> केवल Emergency Fund के बाद निवेश करें!`,
      debt: `<strong>कर्ज = उधार पैसा ⚖️</strong><br/><br/>🏠 <strong>अच्छा कर्ज:</strong> घर लोन, शिक्षा लोन (ये आपकी संपत्ति बढ़ाते हैं)<br/>❌ <strong>बुरा कर्ज:</strong> क्रेडिट कार्ड, पर्सनल लोन (ये सिर्फ खर्च बढ़ाते हैं)<br/><br/><strong>कर्ज से बचने के तरीके:</strong><br/>• Emergency Fund रखें<br/>• क्रेडिट कार्ड का बिल पूरा भरें<br/>• जरूरत और चाहत में फर्क समझें`,
      emergency: `<strong>Emergency Fund = मुसीबत के समय का पैसा 🚨</strong><br/><br/>🏥 <strong>कहानी से समझें:</strong> अचानक बीमारी, नौकरी जाना, गाड़ी खराब होना - ये सब अचानक आते हैं। Emergency Fund इन सब के लिए तैयार रहने का तरीका है।<br/><br/><strong>कितना रखें?</strong><br/>• गिग वर्कर: 6-12 महीने का खर्च<br/>• नियमित नौकरी: 3-6 महीने का खर्च<br/><br/><strong>कहाँ रखें?</strong> Savings Account या Liquid Fund में (जल्दी निकाल सकें)`,
      insurance: `<strong>बीमा = सुरक्षा कवच 🛡️</strong><br/><br/>🏠 <strong>कहानी से समझें:</strong> जैसे छतरी बारिश से बचाती है, वैसे ही बीमा बड़े खर्चों से बचाता है।<br/><br/><strong>जरूरी बीमा:</strong><br/>• Health Insurance (₹5 लाख से शुरू करें)<br/>• Term Life Insurance (सैलरी का 10-15 गुना)<br/>• Bike/Car Insurance (कानूनी जरूरत)<br/><br/><strong>टिप:</strong> कम उम्र में लें, प्रीमियम कम होगा!`,
      fallback: `मैं समझ गया! 😊 आप इन विषयों के बारे में पूछ सकते हैं:<br/><br/>💰 बचत (Savings) • 📊 बजट (Budget) • 🌱 निवेश (Investment)<br/><br/>⚖️ कर्ज (Debt) • 🚨 Emergency Fund • 🛡️ बीमा (Insurance)<br/><br/>या कोई और पैसे से जुड़ा सवाल पूछें!`
    },
    en: {
      initial: `Hello! I'm Dhan Mitra. I'll explain money matters in simple language. 💰<br/><br/><strong>For example:</strong> "Saving money is like storing rice for rainy days."<br/><br/>What would you like to learn? Click on topics below or type your question!`,
      savings: `<strong>Learn about Savings! 💰</strong><br/><br/>🏺 <strong>Understand with a Story:</strong> In ancient times, people stored rice in large pots. When there was no rain or the crop failed, that rice would come in handy.<br/><br/>Saving is similar - setting aside today's money for tomorrow! 🌾<br/><br/><strong>Simple Rules:</strong><br/>• Save 20% of your earnings every month<br/>• Save first, then spend<br/>• Keep your savings in a separate account<br/><br/><strong>Example:</strong> If you earn ₹15,000, save ₹3,000.`,
      budget: `<strong>Learn to Budget! 📊</strong><br/><br/>🍽️ <strong>Understand with a Story:</strong> Just like you make a grocery list for the month—how much rice, lentils, and oil you need—you should also plan for your money.<br/><br/><strong>The 50-30-20 Rule:</strong><br/>🏠 <strong>50%</strong> - Needs (rent, food, electricity)<br/>🎯 <strong>30%</strong> - Wants and Hobbies<br/>💰 <strong>20%</strong> - Savings and Investments<br/><br/><strong>Gig Worker Tip:</strong> Save more in good months!`,
      investment: `<strong>Investment = Making Money Grow 🌱</strong><br/><br/>🌾 <strong>Understand with a Story:</strong> A farmer plants a seed today to harvest a crop tomorrow. Similarly, with investment, you put money in today to get more in the future.<br/><br/><strong>Beginner Investments:</strong><br/>• SIP (Start with ₹500 per month)<br/>• PPF (15-year lock-in)<br/>• ELSS (Tax savings + returns)<br/><br/>⚠️ <strong>Remember:</strong> Only invest after you have an Emergency Fund!`,
      debt: `<strong>Debt = Borrowed Money ⚖️</strong><br/><br/>🏠 <strong>Good Debt:</strong> Home loan, education loan (these increase your assets)<br/>❌ <strong>Bad Debt:</strong> Credit card, personal loan (these only increase expenses)<br/><br/><strong>How to Avoid Bad Debt:</strong><br/>• Maintain an Emergency Fund<br/>• Pay your credit card bill in full<br/>• Understand the difference between needs and wants`,
      emergency: `<strong>Emergency Fund = Money for Tough Times 🚨</strong><br/><br/>🏥 <strong>Understand with a Story:</strong> Unexpected illness, losing a job, or a car breaking down—these things happen suddenly. An Emergency Fund is a way to be prepared for them.<br/><br/><strong>How Much to Keep?</strong><br/>• Gig Worker: 6-12 months of expenses<br/>• Regular Job: 3-6 months of expenses<br/><br/><strong>Where to Keep It?</strong> In a Savings Account or Liquid Fund (so you can withdraw it quickly)`,
      insurance: `<strong>Insurance = Safety Shield 🛡️</strong><br/><br/>🏠 <strong>Understand with a Story:</strong> Just like an umbrella protects you from rain, insurance protects you from big expenses.<br/><br/><strong>Essential Insurance:</strong><br/>• Health Insurance (start with ₹5 Lakhs)<br/>• Term Life Insurance (10-15x your salary)<br/>• Bike/Car Insurance (a legal requirement)<br/><br/><strong>Tip:</strong> Buy insurance early, the premium will be lower!`
    }
  };

  // Add a new message to the chat display
  const addMessage = (text, sender, isHtml = false) => {
    setMessages(prevMessages => [...prevMessages, { text, sender, isHtml }]);
  };

  // Function to handle the user sending a message
  const sendMessage = async () => {
    const message = userInput.trim();
    if (!message) return;

    // Display user message
    addMessage(message, 'user');
    setUserInput('');
    setIsLoading(true);

    try {
      const prompt = `Act as a financial coach named Dhan Mitra. Provide a brief, simple, and jargon-free explanation for the user's question, using a relatable real-world analogy. The user's question is: "${message}". Respond in the user's selected language, which is currently ${currentLanguage}. If you cannot answer, provide a helpful fallback response.`;
      
      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      };
      
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      const botResponse = result.candidates[0].content.parts[0].text;
      
      addMessage(botResponse, 'bot');
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      addMessage("I'm sorry, I couldn't connect to the coach right now. Please try again later!", 'bot');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handles quick topic clicks from the sidebar
  const handleTopicClick = (topic) => {
    const topicData = responses[currentLanguage]?.[topic] || responses.hi[topic];
    if (topicData) {
      addMessage(topicData, 'bot', true);
    }
  };

  // Sets the chat language and updates the initial message
  const setLanguage = (lang) => {
    setCurrentLanguage(lang);
    setMessages([]); // Clear previous messages
    const initialMessage = responses[lang]?.initial || responses.hi.initial;
    addMessage(initialMessage, 'bot', true);
  };
  
  // Effect to add the initial message when the component loads
  useEffect(() => {
    setLanguage('hi');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="back-nav bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <button onClick={goToHome} className="inline-flex items-center gap-2 text-purple-600 font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-purple-50">
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2">
            Meet Your <span className="text-purple-600">Financial Coach</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized financial advice and education. No jargon, just simple wisdom.
          </p>
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => setLanguage('hi')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentLanguage === 'hi' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
            हिंदी
          </button>
          <button onClick={() => setLanguage('en')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentLanguage === 'en' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
            English
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chat Interface */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl flex flex-col h-[70vh]">
            <div className="chat-messages flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                      <MessageCircle size={20} />
                    </div>
                  )}
                  <div className={`p-4 rounded-xl ${msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.isHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    ) : (
                        <p>{msg.text}</p>
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
                      <User size={20} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                      <MessageCircle size={20} />
                  </div>
                  <div className="p-4 rounded-xl bg-gray-100 text-gray-800">
                    <p>Thinking...</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-purple-600 text-white p-3 rounded-full transition-colors hover:bg-purple-700 disabled:bg-purple-300"
                  disabled={isLoading}
                >
                  <CornerDownLeft size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Topics Sidebar */}
          <div className="w-full lg:w-96 bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Popular Topics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
              <button onClick={() => handleTopicClick('savings')} className="group p-4 bg-gray-100 rounded-lg transition-colors hover:bg-purple-50">
                <div className="text-3xl mb-2 flex justify-center text-purple-600 group-hover:text-purple-700">
                  <DollarSignIcon />
                </div>
                <div className="font-medium text-gray-800 text-center">Savings</div>
              </button>
              <button onClick={() => handleTopicClick('budget')} className="group p-4 bg-gray-100 rounded-lg transition-colors hover:bg-purple-50">
                <div className="text-3xl mb-2 flex justify-center text-purple-600 group-hover:text-purple-700">
                  <BarChart />
                </div>
                <div className="font-medium text-gray-800 text-center">Budget</div>
              </button>
              <button onClick={() => handleTopicClick('investment')} className="group p-4 bg-gray-100 rounded-lg transition-colors hover:bg-purple-50">
                <div className="text-3xl mb-2 flex justify-center text-purple-600 group-hover:text-purple-700">
                  <TrendingUpIcon />
                </div>
                <div className="font-medium text-gray-800 text-center">Investment</div>
              </button>
              <button onClick={() => handleTopicClick('debt')} className="group p-4 bg-gray-100 rounded-lg transition-colors hover:bg-purple-50">
                <div className="text-3xl mb-2 flex justify-center text-purple-600 group-hover:text-purple-700">
                  <CreditCard />
                </div>
                <div className="font-medium text-gray-800 text-center">Debt</div>
              </button>
              <button onClick={() => handleTopicClick('emergency')} className="group p-4 bg-gray-100 rounded-lg transition-colors hover:bg-purple-50">
                <div className="text-3xl mb-2 flex justify-center text-purple-600 group-hover:text-purple-700">
                  <Umbrella />
                </div>
                <div className="font-medium text-gray-800 text-center">Emergency Fund</div>
              </button>
              <button onClick={() => handleTopicClick('insurance')} className="group p-4 bg-gray-100 rounded-lg transition-colors hover:bg-purple-50">
                <div className="text-3xl mb-2 flex justify-center text-purple-600 group-hover:text-purple-700">
                  <Shield />
                </div>
                <div className="font-medium text-gray-800 text-center">Insurance</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// The following components are retained from your previous code to keep the application complete.
// Your original landing page component, updated to include a button for the financial coach.
function FinancialPortfolioLanding({ goToDashboard, goToCoach }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-purple-600">DhanSetu</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How It Works</a>
              <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">About</a>
              <button
                onClick={goToDashboard}
                className="text-gray-600 hover:text-purple-600 transition-colors px-4 py-2 rounded-lg"
              >
                Dashboard
              </button>
              <button className="w-full mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Login/Signup
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-purple-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-purple-600">How It Works</a>
              <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-purple-600">About</a>
              <button
                onClick={goToDashboard}
                className="w-full mt-2 text-gray-600 hover:text-purple-600 transition-colors px-4 py-2 rounded-lg"
              >
                Dashboard
              </button>
              <button className="w-full mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Login/Signup
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Smart Financial Planning for 
                <span className="text-purple-600"> Gig Workers</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Build a personalized investment portfolio tailored to your irregular income. 
                Start investing with as little as ₹100 and grow your wealth steadily.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Updated 'Start Free Assessment' button to route to the coach page */}
                <button
                  onClick={goToCoach}
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                >
                  Start Free Assessment
                  <ArrowRight className="ml-2" size={20} />
                </button>
                <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
            
            {/* Portfolio Customization Demo */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Customize Your Portfolio</h3>
                <p className="text-gray-600">Tailor your investment strategy with just a few details</p>
              </div>

              {/* Tabs */}
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'personal' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveTab('investment')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'investment' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Investment Details
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input type="number" placeholder="25" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income Range</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>₹15,000 - ₹25,000</option>
                      <option>₹25,000 - ₹50,000</option>
                      <option>₹50,000 - ₹75,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Freelancer</option>
                      <option>Delivery Partner</option>
                      <option>Ride Share Driver</option>
                      <option>Part-time Worker</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'investment' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yearly ROI Target (%) <span className="text-purple-600 font-semibold">12%</span>
                    </label>
                    <input type="range" min="8" max="20" defaultValue="12" className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Conservative (8%)</span>
                      <span>Aggressive (20%)</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Investment</label>
                    <input type="number" placeholder="₹2,000" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Low Risk</option>
                      <option>Moderate Risk</option>
                      <option>High Risk</option>
                    </select>
                  </div>
                </div>
              )}

              <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Generate Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DhanSetu?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed specifically for the unique financial needs of gig workers and low-income earners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Strategies</h3>
              <p className="text-gray-600">
                AI-powered recommendations based on your income patterns, risk tolerance, and financial goals.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Low Minimum Investment</h3>
              <p className="text-gray-600">
                Start building wealth with as little as ₹100. No large capital requirements or hidden fees.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Contributions</h3>
              <p className="text-gray-600">
                Adjust your investments based on your monthly earnings. Perfect for irregular income streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Complete Assessment",
                description: "Answer a few questions about your income, goals, and risk tolerance."
              },
              {
                step: "02",
                title: "Get Recommendations",
                description: "Receive a personalized investment portfolio tailored to your profile."
              },
              {
                step: "03",
                title: "Start Investing",
                description: "Begin with any amount and adjust contributions as your income changes."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl font-bold text-purple-600 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="text-purple-600" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Financial Future?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of gig workers who are already building wealth with smart, personalized investing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
              Start Free Assessment
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-purple-400 mb-4">DhanSetu</h3>
              <p className="text-gray-400">
                Empowering gig workers with smart financial planning and personalized investment strategies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">Portfolio Builder</button></li>
                <li><button className="hover:text-white transition-colors text-left">Risk Assessment</button></li>
                <li><button className="hover:text-white transition-colors text-left">Goal Planning</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">Help Center</button></li>
                <li><button className="hover:text-white transition-colors text-left">Contact Us</button></li>
                <li><button className="hover:text-white transition-colors text-left">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">About</button></li>
                <li><button className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors text-left">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DhanSetu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Your dashboard page component, now with a prop to handle navigation
function PortfolioDashboard({ goToHome }) {
  const [selectedRisk, setSelectedRisk] = useState('moderate');
  const [investmentAmount, setInvestmentAmount] = useState(25000);

  const riskProfiles = {
    conservative: {
      name: 'Conservative',
      color: 'bg-blue-500',
      allocation: [
        { name: 'Fixed Deposits', percentage: 40, color: '#3B82F6' },
        { name: 'Government Bonds', percentage: 30, color: '#60A5FA' },
        { name: 'Corporate Bonds', percentage: 20, color: '#93C5FD' },
        { name: 'Liquid Funds', percentage: 10, color: '#DBEAFE' }
      ],
      expectedReturn: '8-10%',
      riskLevel: 'Low',
      timeHorizon: '1-3 years'
    },
    moderate: {
      name: 'Moderate',
      color: 'bg-purple-500',
      allocation: [
        { name: 'Equity Mutual Funds', percentage: 35, color: '#8B5CF6' },
        { name: 'Debt Funds', percentage: 25, color: '#A78BFA' },
        { name: 'Hybrid Funds', percentage: 25, color: '#C4B5FD' },
        { name: 'Gold ETF', percentage: 15, color: '#E9D5FF' }
      ],
      expectedReturn: '12-15%',
      riskLevel: 'Medium',
      timeHorizon: '3-5 years'
    },
    aggressive: {
      name: 'Aggressive',
      color: 'bg-green-500',
      allocation: [
        { name: 'Large Cap Equity', percentage: 30, color: '#10B981' },
        { name: 'Mid Cap Equity', percentage: 25, color: '#34D399' },
        { name: 'Small Cap Equity', percentage: 20, color: '#6EE7B7' },
        { name: 'International Funds', percentage: 15, color: '#A7F3D0' },
        { name: 'Sector Funds', percentage: 10, color: '#D1FAE5' }
      ],
      expectedReturn: '15-20%',
      riskLevel: 'High',
      timeHorizon: '5+ years'
    }
  };

  const currentProfile = riskProfiles[selectedRisk];
  
  // Calculate projected returns
  const projectedReturns = {
    1: Math.round(investmentAmount * 1.12),
    3: Math.round(investmentAmount * Math.pow(1.12, 3)),
    5: Math.round(investmentAmount * Math.pow(1.12, 5)),
    10: Math.round(investmentAmount * Math.pow(1.12, 10))
  };

  const DonutChart = ({ data, size = 200 }) => {
    let cumulativePercentage = 0;
    
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 20}
            fill="transparent"
            stroke="#f3f4f6"
            strokeWidth="40"
          />
          {data.map((item, index) => {
            const radius = size / 2 - 20;
            const circumference = 2 * Math.PI * radius;
            const strokeLength = (item.percentage / 100) * circumference;
            const strokeOffset = circumference - cumulativePercentage * circumference / 100;
            
            cumulativePercentage += item.percentage;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth="40"
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={-strokeOffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">₹{(investmentAmount / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-600">Total Investment</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Back button with onClick handler */}
              <button
                onClick={goToHome}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Portfolio Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <User size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="text-purple-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">₹{(projectedReturns[1] / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-600">Expected Portfolio Value</div>
            <div className="text-xs text-green-600 mt-1">+12% from investment</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="text-blue-600" size={24} />
              </div>
              <span className="text-sm text-gray-500">YTD</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{currentProfile.expectedReturn}</div>
            <div className="text-sm text-gray-600">Expected Returns</div>
            <div className="text-xs text-blue-600 mt-1">{currentProfile.riskLevel} Risk</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <span className="text-sm text-green-500">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">₹{((projectedReturns[1] - investmentAmount) / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-600">Projected Gains</div>
            <div className="text-xs text-gray-500 mt-1">1 Year Period</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="text-orange-600" size={24} />
              </div>
              <span className="text-sm text-gray-500">Risk Score</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {selectedRisk === 'conservative' ? '3/10' : selectedRisk === 'moderate' ? '5/10' : '7/10'}
            </div>
            <div className="text-sm text-gray-600">{currentProfile.riskLevel} Risk</div>
            <div className="text-xs text-gray-500 mt-1">{currentProfile.timeHorizon}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Profile Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Select Risk Profile</h3>
              
              <div className="space-y-4 mb-6">
                {Object.entries(riskProfiles).map(([key, profile]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRisk(key)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      selectedRisk === key 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${profile.color}`}></div>
                        <div className="text-left">
                          <div className="font-medium text-gray-800">{profile.name}</div>
                          <div className="text-sm text-gray-600">{profile.riskLevel} Risk</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">{profile.expectedReturn}</div>
                        <div className="text-sm text-gray-600">{profile.timeHorizon}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Investment Amount Input */}
              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (₹)
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="1000"
                  step="1000"
                />
                <div className="text-xs text-gray-500 mt-1">Minimum: ₹1,000</div>
              </div>
            </div>
          </div>

          {/* Risk Wise Allocation Chart */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Risk Wise Allocation</h3>
              
              <div className="flex justify-center mb-6">
                <DonutChart data={currentProfile.allocation} size={220} />
              </div>

              <div className="space-y-3">
                {currentProfile.allocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-800">{item.percentage}%</span>
                      <span className="text-xs text-gray-500">
                        ₹{((investmentAmount * item.percentage / 100) / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projected Returns */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Projected Returns</h3>
              
              <div className="space-y-6">
                {[
                  { period: '1 Year', value: projectedReturns[1], growth: '+12%' },
                  { period: '3 Years', value: projectedReturns[3], growth: '+40%' },
                  { period: '5 Years', value: projectedReturns[5], growth: '+76%' },
                  { period: '10 Years', value: projectedReturns[10], growth: '+211%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.period}</div>
                      <div className="text-xs text-gray-600">Estimated Value</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">
                        ₹{(item.value / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-green-600">{item.growth}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="text-blue-600" size={16} />
                  <span className="text-sm font-medium text-blue-800">Smart Tip</span>
                </div>
                <p className="text-xs text-blue-700">
                  Starting early with small amounts can lead to significant wealth creation through compound interest. 
                  Even ₹2,000/month can grow to substantial amounts over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex-1 bg-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
            <DollarSign size={20} />
            <span>Start Investing</span>
          </button>
          <button className="flex-1 border-2 border-purple-600 text-purple-600 py-4 px-6 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2">
            <PieChart size={20} />
            <span>Customize Portfolio</span>
          </button>
          <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <Calendar size={20} />
            <span>Schedule SIP</span>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Shield className="text-yellow-600 mt-0.5" size={16} />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Important Disclaimer</h4>
              <p className="text-xs text-yellow-700 mt-1">
                All projections are estimates based on historical data and assumptions. Actual returns may vary. 
                Past performance does not guarantee future results. Please consult with a financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
