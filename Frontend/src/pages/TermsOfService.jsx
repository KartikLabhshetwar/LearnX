import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Terms of Service</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing and using LearnX, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
        <p className="mb-4">You agree to use LearnX only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p className="mb-4">To access certain features of LearnX, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
        <p className="mb-4">The content on LearnX, including text, graphics, logos, and software, is the property of LearnX or its content suppliers and is protected by copyright laws.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p className="mb-4">LearnX shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues.</p>
      </section>

      <p className="text-sm text-gray-600 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
    </motion.div>
  );
};

export default TermsOfService;