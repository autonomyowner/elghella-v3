interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    return (
      isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center">
          <div className="bg-gradient-to-r from-green-900 to-blue-900 bg-opacity-50 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">يرجى تسجيل الدخول</h2>
            <p className="mb-10 text-white-600">
              . لكي تتمكن من الشراء أو
               الإستشارة, يرجى التسجيل 
            </p>
            <div className="flex justify-between">
              <a
                href="/Login"
                className="px-8 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
               صفحة تسجيل الدخول
                              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )
    );
  };
  
  export default ContactModal;